import { motion } from 'framer-motion'
import { Banner } from '../../interfaces/banner.interfaces'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
interface BannerTableProps {
  banner: Banner[]
}

export const BannerTable = ({ banner }: BannerTableProps) => {
  console.log('prod', banner)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'banner_name',
      key: 'banner_name',
      sorter: true
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} width='100px' alt='Banner Image' />
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
      render: (data: Banner) => (
        <span className='flex items-center'>
          <Link key={data.id} to={`/bannerUpdate/${data.id}`}>
            <Pencil />
          </Link>
          <Link key={data.id} to={`/bannerDelete/${data.id}`}>
            <Trash2 />
          </Link>
        </span>
      )
    }
  ]

  return (
    <div>
      <motion.div
        className='bg-white-800 bg-opacity-800 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white-700'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-medium mb-4 text-green-800'>Banner List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search banners...'
              className='bg-white-700 text-green-800 placeholder-white-400 rouded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <Search className='absolute left-3 top-2.5 text-green-800-400' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table
            className='bg-white-800'
            dataSource={banner}
            columns={columns}
            // onChange={}
          />
        </div>
      </motion.div>
    </div>
  )
}
