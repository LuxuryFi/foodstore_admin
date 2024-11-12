import { useEffect, useState } from 'react'
import categoryAPI from '../../api/category'
import { Category } from '../../interfaces/category.interfaces'
import { motion } from 'framer-motion'
import { Users, StickyNote, ShoppingBag, DollarSignIcon } from 'lucide-react'
import { Header } from '../../components/common/Header'
import { StatCard } from '../../components/common/StatCard'
import CategoryDistributionChart from '../../components/category/CategoryDistributionChart'
import { CategoryTable } from '../../components/category/CategoryTable'
import { SaleTrendChart } from '../../components/category/SalesTrendChart'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const CategoryPages = () => {
  const [category, setCategory] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryAPI.getCategory()
        setCategory(categories) // Set the category state with fetched data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, []) // Empty dependency array to run the effect only once

  console.log('produict', category)

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Category' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        {/* STAT */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='New Category' icon={Users} value={13123} color='#6366F1'></StatCard>
          <StatCard name='Total categories' icon={StickyNote} value={13123} color='#6366F1'></StatCard>
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
          name='Add New Category'
          value='Add New Category'
        >
          <Link to='/addCategory'>Add New Category</Link>
        </Button>
        <CategoryTable category={category} />

        {/* CHARTs */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10'>
          <SaleTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  )
}
