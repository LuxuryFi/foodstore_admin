import { useEffect, useState } from 'react'
import orderAPI from '../../api/order'
import { Order, OrderPayload } from '../../interfaces/order.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, DatePicker, Form, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { notification } from 'antd';

export const AddOrderPages = () => {
  const [order, setOrder] = useState<Order>({})
  const [form] = Form.useForm() // Get the form instance
  const [isModalVisible, setModalVisible] = useState(false);
  const onFinish = (values: OrderPayload) => {
    console.log('Form data submitted:', values)
    // clearForm()
    setOrder({ ...values })
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
    if (Object.keys(order).length > 0) {
      orderAPI.addOrder({ ...order, order_percentage: parseInt(order.order_percentage)}) // Add order API call
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
  }, [order])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Add Order' />

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
            <Form.Item name='order_name' label='Name' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='order_code' label='Code' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='order_percentage' label='Order Percentage' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='price' label='Price'>
              <Input/>
            </Form.Item>
            <Form.Item name='description' label='Description' required={true}>
              <TextArea rows={4} required={true}/>
            </Form.Item>
            <Form.Item name='start_date' label='Start Time'  required={true}>
              <DatePicker required={true}/>
            </Form.Item>
            <Form.Item name='end_date' label='End Time'  required={true}>
              <DatePicker required={true}/>
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
