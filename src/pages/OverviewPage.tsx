import { Header } from '../components/common/Header'
import { motion } from 'framer-motion'
import { StatCard } from '../components/common/StatCard'
import { DollarSignIcon, ShoppingBag, StickyNote, Users } from 'lucide-react'
import { SalesOverviewChart } from '../components/overview/SalesOverviewChart'
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart'
import SalesChannelChart from '../components/overview/SalesChannelChart'

export const OverviewPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Overview' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        {/* STAT */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='New Users' icon={Users} value={13123} color='#6366F1'></StatCard>
          <StatCard name='Total products' icon={StickyNote} value={13123} color='#6366F1'></StatCard>
          <StatCard name='Total payment' icon={ShoppingBag} value={13123} color='#F59E0B'></StatCard>
          <StatCard name='Total revenue' icon={DollarSignIcon} value={13123} color='#6366F1'></StatCard>
        </motion.div>

        {/* CHARTs */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <SalesOverviewChart />
          <CategoryDistributionChart />
        </div>
        <SalesChannelChart />
      </main>
    </div>
  )
}
