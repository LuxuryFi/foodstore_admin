import { useEffect, useState } from 'react'
import categoryAPI from '../../api/category'
import { Category, CategoryPayload } from '../../interfaces/category.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, Form, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { notification } from 'antd';

export const AddCategoryPages = () => {
  const [category, setCategory] = useState<Category>({})
  const [form] = Form.useForm() // Get the form instance
  const [isModalVisible, setModalVisible] = useState(false);
  const onFinish = (values: CategoryPayload) => {
    console.log('Form data submitted:', category)
    clearForm()
    setCategory({
      ...values,
    })
  }

  const clearForm = () => {
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Form submission failed:', errorInfo)
  }

  const handleOk = () => {
    console.log('is', isModalVisible)
    setModalVisible(false);
  }

  useEffect(() => {
    if (Object.keys(category).length > 0) {
      categoryAPI.addCategory(category) // Add category API call
      clearForm() // Clear form after submitting

      setTimeout(() => {
        notification.success({
          message: 'Submission Complete',
          description: 'Your form has been successfully submitted!',
          placement: 'topRight', // Position of the notification
          duration: 3, // Auto-close duration in seconds
        });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Add Category' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        <motion.div
          className='grid grid-cols-1 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Form
            labelCol={{
              span: 44
            }}
            wrapperCol={{
              span: 136
            }}
            layout='vertical'
            style={{
              maxWidth: 2200
            }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            initialValues={{ remember: true }}
          >
            <Form.Item name='category_name' label='Name' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='description' label='Description' required={true}>
              <TextArea rows={4} required={true}/>
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
