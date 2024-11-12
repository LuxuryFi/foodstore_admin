import { useEffect, useState } from 'react'
import bannerAPI from '../../api/banner'
import { Banner } from '../../interfaces/banner.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, DatePicker, Form, Modal, Select, Switch, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs' // if you're using dayjs to handle dates

export const UpdateBannerPages = () => {
  const [banner, setBanner] = useState<Banner>({})
  const [form] = Form.useForm()
  const { id } = useParams<{ id: string }>()
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate()
  const handleOk = () => {
    console.log('is', isModalVisible)
    setModalVisible(false);
  }



  const onFinish = async (values: Banner) => {
    console.log('Form data submitted:', banner)
    // Call the update API here with the new values
    await bannerAPI.updateBanner({...values }, id)
    clearForm();
    navigate('/banner')
  }

  const clearForm = () => {
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Form submission failed:', errorInfo)
  }

  // Fetch banner data on mount
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const fetchedBanner = await bannerAPI.getOneBanner(id) // Fetch banner by ID
        // setBanner(fetchedBanner)
        // Set initial values in the form
        form.setFieldsValue({
          ...fetchedBanner,
          start_date: fetchedBanner?.start_date ? dayjs(fetchedBanner?.start_date) : null, // Handling expired_date formatting
          end_date: fetchedBanner?.end_date ? dayjs(fetchedBanner?.end_date) : null // Handling expired_date formatting
        })

        setBanner(fetchedBanner)
      } catch (error) {
        console.error('Error fetching banner:', error)
      }
    }
    fetchBanner()
  }, [id, form])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Update Banner' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        <motion.div
          className='grid grid-cols-1 gap-5 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Form
            labelCol={{ span: 44 }}
            wrapperCol={{ span: 136 }}
            layout='vertical'
            style={{ maxWidth: 2200 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item name='title' label='Title' required>
              <Input required />
            </Form.Item>
            <Form.Item name='display_order' label='Display Order' required>
              <Input required />
            </Form.Item>
            <Form.Item name='start_date' label='Start Time' required>
              <DatePicker />
            </Form.Item>
            <Form.Item name='end_date' label='End Time' required>
              <DatePicker />
            </Form.Item>
            <Form.Item name='description' label='Description' required>
              <TextArea rows={4} required />
            </Form.Item>
            <Form.Item
              label="Area ID"
              name="area_id"
              rules={[{ required: true, message: 'Please select your area_id!' }]}
            >
              <Select>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
              </Select>
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
                  <Modal title='Submission Complete' open={isModalVisible} onOk={handleOk}>
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
