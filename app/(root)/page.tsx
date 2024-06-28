import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalancebox from '@/components/TotalBalancebox';
import React from 'react'

const Home = () => {
    const loggedIn = {firstName:'Ashutosh',lastName:'Gupta',email:'ashu07988@gmail.com'};
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                type="greeting"
                title="Welcome"
                user={loggedIn?.firstName || 'Guest'}
                subtext="Access and manage your account and transactions efficiently."
                />
            <TotalBalancebox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance ={1250}
            />
            </header>
            recent transaction
        </div>
        <RightSidebar
        user={loggedIn}
        transactions = {[]}
        banks={[{currentBalance:1356.90},{currentBalance:7000}]}
        />
    </section>
  )
}

export default Home