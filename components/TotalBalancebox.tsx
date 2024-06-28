import { formatAmount } from '@/lib/utils'
import React from 'react'
import CountUp from 'react-countup'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChat from './DoughnutChat'
const TotalBalancebox = ({
    accounts = [],totalBanks,totalCurrentBalance
}: TotlaBalanceBoxProps) => {
    return (
    <section className='total-balance'>
     <div className='total-balance-chart'>
        <DoughnutChat accounts={accounts}/>
     </div>

     <div className='flex flex-col gap-6'>
        <h2 className='header-2'>
        Bank Accounts: {totalBanks} 
        </h2>
        <div className='flex flex-col gap-2'>
        <p className='total-balance-label'>
            Total Current Balance
        </p>
        
        <div className='total-balance-amount flex-center gap-2'>
            <AnimatedCounter amount = {totalCurrentBalance}/>
        </div>
        </div>     
     </div>
    </section>
  )
}

export default TotalBalancebox