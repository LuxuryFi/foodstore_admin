import { motion } from 'framer-motion'
import { Discount } from '../../interfaces/discount.interfaces'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { Modal, Table } from 'antd'
import { Link } from 'react-router-dom'
import discountAPI from '../../api/discount'

interface DiscountTableProps {
  discount: Discount[]
}

export const DiscountTable = ({ discount }: DiscountTableProps) => {
  const deleteDiscount = async (id: string) => {
    await discountAPI.deleteDiscount(id);
    window.location.reload();
  }

  console.log('discount', discount)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Code',
      dataIndex: 'discount_code',
      key: 'discount_code',
      sorter: true
    },
    {
      title: 'Name',
      dataIndex: 'discount_name',
      key: 'discount_name'
    },
    {
      title: 'Discount percentage',
      dataIndex: 'discount_percentage',
      key: 'discount_percentage',
      sorter: true
    },
    {
      title: 'Start',
      dataIndex: 'start_date',
      key: 'start_date'
    },
    {
      title: 'End',
      dataIndex: 'end_date',
      key: 'end_date'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (data: Discount) => (
        <span className='flex items-center'>
          <Link key={data.id} to={`/discountUpdate/${data.id}`}>
            <Pencil className='text-green-800' />
          </Link>
          <Trash2 className='text-red-600 ml-2'  onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              content: 'Are you confirm to delete this?',
              onOk: () => {
                deleteDiscount(data.id.toString()); // Handle the delete logic
              },
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn/>
                </>
              ),
            });
          }}/>
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
          <h2 className='text-lg font-medium mb-4 text-green-800'>Discount List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search discounts...'
              className='bg-white-700 text-green-800 placeholder-green-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Search className='absolute left-3 top-2.5 text-green-800' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table
            className='text-white'
            dataSource={discount}
            columns={columns}
            // onChange={onChangeHandler} // Add onChange if needed
          />
        </div>
      </motion.div>
    </div>
  )
}
