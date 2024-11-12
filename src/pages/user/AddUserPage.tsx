import { useEffect, useState } from 'react'
import userAPI from '../../api/user'
import { User, UserPayload } from '../../interfaces/user.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, DatePicker, Form, Modal, Radio, Select, Switch, Upload } from 'antd'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { PlusIcon } from 'lucide-react'
import { notification } from 'antd';

export const AddUserPages = () => {
  const [user, setUser] = useState<User>({})
  const [fileList, setFileList] = useState<any[]>([]) // To track the uploaded file(s)
  const [form] = Form.useForm() // Get the form instance
  const [isModalVisible, setModalVisible] = useState(false);
  const onFinish = (values: UserPayload) => {
    console.log('values', values);
    const fileList = values.url
    if (fileList && fileList.length > 0) {
      const filename = fileList[0].response.file.filename // Assuming you want to take the name of the uploaded file
      console.log('image', filename);
      setUser({
        ...values,
        url: filename // Update user with the image filename
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
    if (Object.keys(user).length > 0) {
      userAPI.addUser(user) // Add user API call
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
  }, [user])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Add User' />

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
            <Form.Item name='name' label='Name' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='type' label='Type' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='address' label='Address' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='phone' label='Phone' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='password' label='Password' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item name='email' label='Email' required={true}>
              <Input required={true}/>
            </Form.Item>
            <Form.Item label='Radio' name='gender'>
              <Radio.Group>
                <Radio value={false}> Male </Radio>
                <Radio value={true}> Female </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='Upload' name='url' valuePropName='fileList' getValueFromEvent={normFile}>
              <Upload
                listType='picture-card'
                name='url'
                action='http://localhost:4000/users/upload'
                onChange={onChange} // Handle file upload change
              >
                <button
                  style={{
                    border: 0,
                    background: 'none'
                  }}
                  type='button'
                >
                  <PlusIcon />
                  <div
                    style={{
                      marginTop: 8
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
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
