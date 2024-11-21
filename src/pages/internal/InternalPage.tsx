import { useEffect, useState } from 'react'
import internalAPI from '../../api/internal'
import { Internal } from '../../interfaces/internal.interfaces'
import { motion } from 'framer-motion'
import { Users, StickyNote, ShoppingBag, DollarSignIcon } from 'lucide-react'
import { Header } from '../../components/common/Header'
import { StatCard } from '../../components/common/StatCard'
import CategoryDistributionChart from '../../components/internal/CategoryDistributionChart'
import { InternalTable } from '../../components/internal/InternalTable'
import { SaleTrendChart } from '../../components/internal/SalesTrendChart'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const InternalPages = () => {
  const [internal, setInternal] = useState<Internal[]>([])

  useEffect(() => {
    const fetchInternals = async () => {
      try {
        const internals = await internalAPI.getInternal()
        setInternal(internals) // Set the internal state with fetched data
      } catch (error) {
        console.error('Error fetching internals:', error)
      }
    }

    fetchInternals()
  }, []) // Empty dependency array to run the effect only once

  console.log('produict', internal)

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Internal' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        {/* STAT */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='New Internal' icon={Users} value={13123} color='#6366F1'></StatCard>
          <StatCard name='Total internals' icon={StickyNote} value={13123} color='#6366F1'></StatCard>
          <StatCard name='Total payment' icon={ShoppingBag} value={13123} color='#F59E0B'></StatCard>
          <StatCard name='Total revenue' icon={DollarSignIcon} value={13123} color='#6366F1'></StatCard>
        </motion.div>
        <Button
          type='primary'
          style={{
            backgroundColor: '#166534',
            padding: '1.5rem',
            marginBottom: '1rem',
            fontWeight: 600
          }}
          name='Add New Internal User'
          value='Add New User'
        >
          <Link to='/addInternal'>Add New Internal User</Link>
        </Button>
        <InternalTable internal={internal} />
      </main>
    </div>
  )
}
