import { useEffect, useState } from 'react'
import productAPI from '../../api/product'
import { Product } from '../../interfaces/product.interfaces'
import { motion } from 'framer-motion'
import { Users, StickyNote, ShoppingBag, DollarSignIcon } from 'lucide-react'
import { Header } from '../../components/common/Header'
import { StatCard } from '../../components/common/StatCard'
import CategoryDistributionChart from '../../components/product/CategoryDistributionChart'
import { ProductTable } from '../../components/product/ProductTable'
import { SaleTrendChart } from '../../components/product/SalesTrendChart'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export const ProductPages = () => {
  const [product, setProduct] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productAPI.getProduct()
        setProduct(products) // Set the product state with fetched data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, []) // Empty dependency array to run the effect only once

  console.log('produict', product)

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Product' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        {/* STAT */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name='New Product' icon={Users} value={13123} color='#6366F1'></StatCard>
          <StatCard name='Total products' icon={StickyNote} value={13123} color='#6366F1'></StatCard>
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
          name='Add New User'
          value='Add New User'
        >
          <Link to='/addProduct'>Add New User</Link>
        </Button>
        <ProductTable product={product} />

        {/* CHARTs */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10'>
          <SaleTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  )
}
