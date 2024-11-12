import { motion } from 'framer-motion'
import { Category } from '../../interfaces/category.interfaces'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { Modal, Table } from 'antd'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import categoryAPI from '../../api/category'

interface CategoryTableProps {
  category: Category[]
}

export const CategoryTable = ({ category }: CategoryTableProps) => {
  console.log('category', category)

  const [searchCategory, setSearchCategory] = useState<Category[]>([]) // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    // Update searchCategory whenever category changes
    setSearchCategory(category)
  }, [category])

  console.log('searchCategory', searchCategory)

  const deleteCategory = async (id: string) => {
    await categoryAPI.deleteCategory(id);
    window.location.reload();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    // Filter with fallback for category
    const result = (category || []).filter((item) => item.category_name.toLowerCase().includes(term))
    console.log('Filtered result:', result) // Log the filtered result
    setSearchCategory(result) // Update searchCategory
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'category_name',
      key: 'category_name',
      sorter: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (data: Category) => (
        <span className='flex items-center'>
          <Link key={data.id} to={`/categoryUpdate/${data.id}`}>
            <Pencil className='text-green-800' />
          </Link>
          <Trash2 className='text-red-600 ml-2'  onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              content: 'Are you confirm to delete this?',
              onOk: () => {
                deleteCategory(data.id.toString()); // Handle the delete logic
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
          <h2 className='text-lg font-medium mb-4 text-green-800'>Category List</h2>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search categorys...'
              onChange={handleSearch}
              className='bg-white-700 text-green-800 placeholder-green-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Search className='absolute left-3 top-2.5 text-green-800' size={18} />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table className='text-white' dataSource={searchCategory} columns={columns} />
        </div>
      </motion.div>
    </div>
  )
}
