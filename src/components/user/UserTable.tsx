import { motion } from 'framer-motion'
import { User } from '../../interfaces/user.interfaces'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { Modal, Table } from 'antd'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import userAPI from '../../api/user'

interface UserTableProps {
  user: User[]
}

export const UserTable = ({ user }: UserTableProps) => {
  console.log('user', user)

  const [searchUser, setSearchUser] = useState<User[]>([]) // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    // Update searchUser whenever user changes
    setSearchUser(user)
  }, [user])

  console.log('searchUser', searchUser)

  const deleteUser = async (id: string) => {
    await userAPI.deleteUser(id);
    window.location.reload();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    // Filter with fallback for user
    const result = (user || []).filter((item) => item.name.toLowerCase().includes(term))
    console.log('Filtered result:', result) // Log the filtered result
    setSearchUser(result) // Update searchUser
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
          alt='User Image'
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
      render: (data: User) => (
        <span className='flex items-center'>
          <Link key={data.id} to={`/userUpdate/${data.id}`}>
            <Pencil className='text-green-800' />
          </Link>
          <Trash2 className='text-red-600 ml-2'  onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              content: 'Are you confirm to delete this?',
              onOk: () => {
                deleteUser(data.id.toString()); // Handle the delete logic
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
          <h2 className='text-lg font-medium mb-4 text-green-800'>User List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search users...'
              onChange={handleSearch}
              className='bg-white-700 text-green-800 placeholder-green-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Search className='absolute left-3 top-2.5 text-green-800' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table className='text-white' dataSource={searchUser} columns={columns} />
        </div>
      </motion.div>
    </div>
  )
}
