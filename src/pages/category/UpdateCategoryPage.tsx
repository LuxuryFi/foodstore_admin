import { useEffect, useState } from 'react'
import categoryAPI from '../../api/category'
import { Category } from '../../interfaces/category.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, Form, Modal, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateCategoryPages = () => {
  const [category, setCategory] = useState<Category>({})
  const [form] = Form.useForm()
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOk = () => {
    console.log('is', isModalVisible)
    setModalVisible(false);
  }


  const onFinish = async (values: Category) => {
    console.log('Form data submitted:', category)
    // Call the update API here with the new values
    await categoryAPI.updateCategory({...values }, id)
    navigate('/category')
  }

  const clearForm = () => {
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Form submission failed:', errorInfo)
  }

  // Fetch category data on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const fetchedCategory = await categoryAPI.getOneCategory(id) // Fetch category by ID
        // setCategory(fetchedCategory)
        // Set initial values in the form
        form.setFieldsValue({
          ...fetchedCategory,
        })

        setCategory(fetchedCategory)
      } catch (error) {
        console.error('Error fetching category:', error)
      }
    }
    fetchCategory()
  }, [id, form])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Update Category' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        <motion.div
          className='grid grid-cols-1 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            layout='vertical'
            style={{ maxWidth: 2200 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            initialValues={{ remember: true }} // Optional for setting initial form values
          >
            <Form.Item name='category_name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='description' label='Description'>
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label='Status' valuePropName='checked' name='status'>
              <Switch />
            </Form.Item>
            <Form.Item>
              <div className='flex justify-center'>
                <div className='grid grid-cols-2 items-center gap-4'>
                  <ButtonPrimary type='primary' htmlType='submit'>
                    Submit
                  </ButtonPrimary>
                  <Button color='danger' variant='solid' onClick={clearForm}>
                    Clear
                  </Button>
                  <Modal
                    title="Submission Complete"
                    open={isModalVisible}
                    onOk={handleOk}
                  >
                     <p>Your form has been successfully submitted!</p>

                  </Modal>
                </div>
              </div>
            </Form.Item>
          </Form>
        </motion.div>
      </main>
    </div>
  )
}
