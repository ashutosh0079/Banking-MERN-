'use client'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { authFormSchema} from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import Link from 'next/link'
import Image from 'next/image'
import Custominput from './Custominput'
import { Form } from './ui/form'
import { Button } from './ui/button'

const AuthForm = ({type}:{type:string}) => {
    const[user,setUser] = useState(null);
    const[isLoading,setIsLoading] = useState(false);
    const formSchema = authFormSchema(type);
    const router  = useRouter()
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try{
      if(type === 'sign-up'){
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password
        }

        const newUser = await signUp(userData);

        setUser(newUser);
      }
      
      if( type === 'sign-in'){
        const response = await signIn({
          email: data.email,
          password : data.password,
        })
        if(response) 
          router.push('/')
      }
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <section className='auth-form'>
        <header className="flex flex-col gap-5 md:gap-8">
        <Link href='/' className='flex cursor-pointer items-center gap-1'>
            <Image src="/icons/logo.svg" width={34} height={34} alt='Horizon logo' className='size-[24px] max-xl:size-14' />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className="text-24 lg:text-36 font-semiboldtext-gray-900">
                {user
                    ?'Link Account':type ==='sign-in'
                    ?'Sign In' : 'Sign Up'
                }
                <p className='text-16 font-normal text-grey-600'>
                    {user 
                        ? 'Link your to get started'
                        : 'Please enter your details'
                    }
                </p>
            </h1>
        </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">

            </div>
        ):(
            <>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <Custominput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <Custominput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                  </div>
                  <Custominput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                  <Custominput control={form.control} name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <Custominput control={form.control} name='state' label="State" placeholder='Example: NY' />
                    <Custominput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <Custominput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <Custominput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                </>
              )}
        
        <Custominput
        control ={form.control} name='email' label='Email' placeholder="Enter your username" />

<Custominput
        control ={form.control} name='password' label='Password' placeholder="Enter your password" />
        <div className='flex flex-col gap-4 '>
        <Button className='form-btn' type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
            <Loader2 size={20} className='animate-spin'/> &nbsp;
            Loading...
            </>
          ):type === 'sign-in' ? 'Sign In':'Sign Up'}
          </Button>
          </div>

      </form>
    </Form>
    <footer className='flex justify-center gap-1'>
      <p>
        {type ==='sign-in' ? "Don't have an account?":
        "Already have an account?" }
      </p>
      <Link href={type === 'sign-in' ? '/sign-up':'sign-in'} className='form-link'>
      {type === 'sign-in' ? 'Sign Up':'Sign in'}
      </Link>
    </footer>
            </>
        )
        }
    </section>
  )
}

export default AuthForm