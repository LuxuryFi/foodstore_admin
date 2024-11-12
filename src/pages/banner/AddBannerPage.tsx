import { useEffect, useState } from 'react'
import bannerAPI from '../../api/banner'
import { Banner, BannerPayload } from '../../interfaces/banner.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, DatePicker, Form, Modal, Select, Switch, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { PlusIcon } from 'lucide-react'
import { notification } from 'antd';

export const AddBannerPages = () => {
  const [banner, setBanner] = useState<Banner>({})
  const [fileList, setFileList] = useState<any[]>([]) // To track the uploaded file(s)
  const [form] = Form.useForm() // Get the form instance
  const [isModalVisible, setModalVisible] = useState(false);
  const onFinish = (values: BannerPayload) => {
    console.log('Form data submitted:', values)

    const fileList = values.image
    console.log('field', fileList);
    if (fileList && fileList.length > 0) {
      console.log('inside', 1)
      const filename = fileList[0].response.file.filename // Assuming you want to take the name of the uploaded file
      console.log('a', {
        ...values,
        image_url: filename // Update banner with the image filename
      })
      setBanner({
        ...values,
        image_url: filename // Update banner with the image filename
      })
    }
  }

  const clearForm = () => {
    form.resetFields()
    setFileList([]) // Clear file list when form is cleared
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Form submission failed:', errorInfo)
  }

  const onChange = (info: any) => {
    if (info.file.status === 'done') {
      console.log('File uploaded successfully:', info.file.response)
      // When the file is uploaded, set the file info into fileList
      setFileList([
        ...fileList,
        {
          ...info.file,
          url: `http://localhost:4000/public/uploads/${info.file.response.filename}`
        }
      ])
    } else if (info.file.status === 'error') {
      console.error('File upload error:', info.file.error)
    }
  }

  const handleOk = () => {
    console.log('is', isModalVisible)
    setModalVisible(false);
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  useEffect(() => {
    if (Object.keys(banner).length > 0) {
      bannerAPI.addBanner(banner) // Add banner API call
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
  }, [banner])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Add Banner' />

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
  <Form.Item label='Upload' name='image_url' valuePropName='fileList' getValueFromEvent={normFile}>
    <Upload
      listType='picture-card'
      name='image_url'
      action='http://localhost:4000/banners/upload'
      onChange={onChange}
    >
      <button style={{ border: 0, background: 'none' }} type='button'>
        <PlusIcon />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    </Upload>
  </Form.Item>
  <Form.Item
              label="Area ID"
              name="area_id"
              rules={[{ required: true, message: 'Please select your area_id!' }]}
            >
              <Select>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={2}>3</Select.Option>
                <Select.Option value={2}>4</Select.Option>

              </Select>
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
