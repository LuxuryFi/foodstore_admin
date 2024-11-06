import { motion } from 'framer-motion'
import { Product } from '../../interfaces/product.interfaces'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface ProductTableProps {
  product: Product[]
}

export const ProductTable = ({ product }: ProductTableProps) => {
  console.log('product', product)

  const [searchProduct, setSearchProduct] = useState<Product[]>([]) // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    // Update searchProduct whenever product changes
    setSearchProduct(product)
  }, [product])

  console.log('searchProduct', searchProduct)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    // Filter with fallback for product
    const result = (product || []).filter((item) => item.product_name.toLowerCase().includes(term))
    console.log('Filtered result:', result) // Log the filtered result
    setSearchProduct(result) // Update searchProduct
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: true
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} width='100px' alt='Product Image' />
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (data: Product) => (
        <span className='flex items-center'>
          <Link key={data.id} to={`/productUpdate/${data.id}`}>
            <Pencil className='text-green-800' />
          </Link>
          <Link key={data.id} to={`/productDelete/${data.id}`}>
            <Trash2 className='text-red-600 ml-2' />
          </Link>
        </span>
      )
    }
  ]

  return (
    <div>
      <motion.div
        className='bg-white-800 bg-opacity-80 backdrop-blur-md shadow-lg shadow-green-700 rounded-xl p-6 border border-green-700'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-medium mb-4 text-green-800'>Product List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search products...'
              onChange={handleSearch}
              className='bg-white-700 text-green-800 placeholder-green-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Search className='absolute left-3 top-2.5 text-green-800' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table className='text-white' dataSource={searchProduct} columns={columns} />
        </div>
      </motion.div>
    </div>
  )
}
