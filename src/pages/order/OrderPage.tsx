import { useEffect, useState } from 'react'
import orderAPI from '../../api/order'
import { Order } from '../../interfaces/order.interfaces'
import { motion } from 'framer-motion'
import { Users, StickyNote, ShoppingBag, DollarSignIcon } from 'lucide-react'
import { Header } from '../../components/common/Header'
import { StatCard } from '../../components/common/StatCard'
import OrderDistributionChart from '../../components/order/CategoryDistributionChart'
import { OrderTable } from '../../components/order/OrderTable'
import { SaleTrendChart } from '../../components/order/SalesTrendChart'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const OrderPages = () => {
  const [order, setOrder] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await orderAPI.getOrder()
        setOrder(order) // Set the order state with fetched data
      } catch (error) {
        console.error('Error fetching order:', error)
      }
    }

    fetchOrder()
  }, []) // Empty dependency array to run the effect only once

  console.log('produict', order)

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Order' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        {/* STAT */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='New Order' icon={Users} value={13123} color='#6366F1'></StatCard>
          <StatCard name='Total order' icon={StickyNote} value={13123} color='#6366F1'></StatCard>
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
          name='Add New Order'
          value='Add New Order'
        >
          <Link to='/addOrder'>Add New Order</Link>
        </Button>
        <OrderTable order={order} />

        {/* CHARTs */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10'>
          <SaleTrendChart />
          <OrderDistributionChart />
        </div>
      </main>
    </div>
  )
}
