import { motion } from 'framer-motion'
import { Order } from '../../interfaces/order.interfaces'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { Modal, Table } from 'antd'
import { Link } from 'react-router-dom'
import orderAPI from '../../api/order'

interface OrderTableProps {
  order: Order[]
}

export const OrderTable = ({ order }: OrderTableProps) => {
  const deleteOrder = async (id: string) => {
    await orderAPI.deleteOrder(id);
    window.location.reload();
  }

  console.log('order', order)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: true,
      render: function (user_id) {
        const url = `/userUpdate/${user_id}`;
        return <Link to={url}>{user_id}</Link>
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        status ? 'DONE' : 'CANCELLED'
      }
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: 'created_at'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (data: Order) => (
        <span className='flex items-center'>
          <Link key={data.id} to={`/orderUpdate/${data.id}`}>
            <Pencil className='text-green-800' />
          </Link>
          <Trash2 className='text-red-600 ml-2'  onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              content: 'Are you confirm to delete this?',
              onOk: () => {
                deleteOrder(data.id.toString()); // Handle the delete logic
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
          <h2 className='text-lg font-medium mb-4 text-green-800'>Order List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search orders...'
              className='bg-white-700 text-green-800 placeholder-green-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Search className='absolute left-3 top-2.5 text-green-800' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table
            className='text-white'
            dataSource={order}
            columns={columns}
            // onChange={onChangeHandler} // Add onChange if needed
          />
        </div>
      </motion.div>
    </div>
  )
}
