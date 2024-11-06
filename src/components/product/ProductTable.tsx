import { motion } from 'framer-motion'
import { Product } from '../../interfaces/product.interfaces'
import { Edit, Pencil, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
interface ProducTableProps {
  product: Product[]
}

export const ProductTable = ({ product }: ProducTableProps) => {
  console.log('prod', product)
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
            <Pencil />
          </Link>
          <Link key={data.id} to={`/productDelete/${data.id}`}>
            <Trash2 />
          </Link>
        </span>
      )
    }
  ]

  return (
    <div>
      <motion.div
        className='bg-gray-800 bg-opacity-800 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-medium mb-4 text-gray-100'>Product List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search products...'
              className='bg-gray-700 text-white placeholder-gray-400 rouded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table
            className='bg-gray-800'
            dataSource={product}
            columns={columns}
            // onChange={}
          />
        </div>
      </motion.div>
    </div>
  )
}
