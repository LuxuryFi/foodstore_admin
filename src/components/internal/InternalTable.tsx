import { motion } from 'framer-motion'
import { Internal } from '../../interfaces/internal.interfaces'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { Modal, Table } from 'antd'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import internalAPI from '../../api/internal'

interface InternalTableProps {
  internal: Internal[]
}

export const InternalTable = ({ internal }: InternalTableProps) => {
  console.log('internal', internal)

  const [searchInternal, setSearchInternal] = useState<Internal[]>([]) // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    // Update searchInternal whenever internal changes
    setSearchInternal(internal)
  }, [internal])

  console.log('searchInternal', searchInternal)

  const deleteInternal = async (id: string) => {
    await internalAPI.deleteInternal(id);
    window.location.reload();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    // Filter with fallback for internal
    const result = (internal || []).filter((item) => item.internal_name.toLowerCase().includes(term))
    console.log('Filtered result:', result) // Log the filtered result
    setSearchInternal(result) // Update searchInternal
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true
    },
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'url',
      render: (url: string) => (
        <img
          crossOrigin='anonymous'
          src={`http://localhost:4000/public/uploads/${url}`}
          width='100px'
          alt='Internal Image'
        />
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'description'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: true
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: boolean) => (
        gender ? 'Male' : 'Female'
      )
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (data: Internal) => (
        <span className='flex items-center'>
          <Link key={data.id} to={`/internalUpdate/${data.id}`}>
            <Pencil className='text-green-800' />
          </Link>
          <Trash2 className='text-red-600 ml-2'  onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              content: 'Are you confirm to delete this?',
              onOk: () => {
                deleteInternal(data.id.toString()); // Handle the delete logic
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
          <h2 className='text-lg font-medium mb-4 text-green-800'>Internal List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search internals...'
              onChange={handleSearch}
              className='bg-white-700 text-green-800 placeholder-green-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Search className='absolute left-3 top-2.5 text-green-800' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table className='text-white' dataSource={searchInternal} columns={columns} />
        </div>
      </motion.div>
    </div>
  )
}
