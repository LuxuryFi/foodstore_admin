import { useEffect, useState } from 'react'
import discountAPI from '../../api/discount'
import { Discount } from '../../interfaces/discount.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, DatePicker, Form, Modal, Switch, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs' // if you're using dayjs to handle dates

export const UpdateDiscountPages = () => {
  const [discount, setDiscount] = useState<Discount>({})
  const [form] = Form.useForm()
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOk = () => {
    console.log('is', isModalVisible)
    setModalVisible(false);
  }


  const onFinish = async (values: Discount) => {
    console.log('Form data submitted:', discount)
    // Call the update API here with the new values
    await discountAPI.updateDiscount({...values, discount_percentage: parseInt(values.discount_percentage)}, id)
    navigate('/discount')
  }

  const clearForm = () => {
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Form submission failed:', errorInfo)
  }

  // Fetch discount data on mount
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const fetchedDiscount = await discountAPI.getOneDiscount(id) // Fetch discount by ID
        form.setFieldsValue({
          ...fetchedDiscount,
          start_date: dayjs(fetchedDiscount.start_date),
          end_date: dayjs(fetchedDiscount.end_date),
        })

        console.log('fetchedDiscount', fetchedDiscount)

        setDiscount(fetchedDiscount)
      } catch (error) {
        console.error('Error fetching discount:', error)
      }
    }
    fetchDiscount()
  }, [id, form])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Update Discount' />

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
            <Form.Item name='discount_name' label='Name' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='discount_code' label='Code' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='discount_percentage' label='Discount Percentage'>
              <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
              <Input/>
            </Form.Item>
            <Form.Item name='description' label='Description' required={true}>
              <TextArea rows={4} required={true}/>
            </Form.Item>
            <Form.Item name='start_date' label='Start Time'  required={true}>
              <DatePicker />
            </Form.Item>
            <Form.Item name='end_date' label='End Time'  required={true}>
              <DatePicker />
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
