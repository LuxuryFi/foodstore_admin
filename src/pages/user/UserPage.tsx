import { useEffect, useState } from 'react'
import userAPI from '../../api/user'
import { User } from '../../interfaces/user.interfaces'
import { motion } from 'framer-motion'
import { Users, StickyNote, ShoppingBag, DollarSignIcon } from 'lucide-react'
import { Header } from '../../components/common/Header'
import { StatCard } from '../../components/common/StatCard'
import CategoryDistributionChart from '../../components/user/CategoryDistributionChart'
import { UserTable } from '../../components/user/UserTable'
import { SaleTrendChart } from '../../components/user/SalesTrendChart'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const UserPages = () => {
  const [user, setUser] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userAPI.getUser()
        setUser(users) // Set the user state with fetched data
        console.log('Users fetched:', users) // Log after fetching data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, []) // Empty dependency array to run the effect only once

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='User' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        {/* STAT */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='New User' icon={Users} value={13123} color='#6366F1' />
          <StatCard name='Total users' icon={StickyNote} value={13123} color='#6366F1' />
          <StatCard name='Total payment' icon={ShoppingBag} value={13123} color='#F59E0B' />
          <StatCard name='Total revenue' icon={DollarSignIcon} value={13123} color='#6366F1' />
        </motion.div>

        <Button
          type='primary'
          style={{
            backgroundColor: '#166534',
            padding: '1.5rem',
            marginBottom: '1rem',
            fontWeight: 600,
          }}
        >
          <Link to='/addUser' style={{ color: 'white', textDecoration: 'none' }}>
            Add New User
          </Link>
        </Button>

        <UserTable user={user} />
      </main>
    </div>
  )
}
