  import { useEffect, useState } from 'react'
  import userAPI from '../../api/user'
  import { User } from '../../interfaces/user.interfaces'
  import { motion } from 'framer-motion'
  import { Header } from '../../components/common/Header'
  import { Button, Form, Modal, Radio, Select } from 'antd'
  import Input from '../../components/common/Input'
  import ButtonPrimary from '../../components/common/Button'
  import { useParams } from 'react-router-dom'
  import dayjs from 'dayjs' // if you're using dayjs to handle dates

  export const UpdateUserPages = () => {
    // const [user, setUser] = useState<User | null>(null)
    const [form] = Form.useForm()
    const { id } = useParams<{ id: string }>()
    const [isModalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState<User>({
      url: '',
      internal_name: '',

    })

    const onFinish = (values: User) => {
      console.log('Form data submitted:', values)
      // Call the update API here with the new values
      userAPI.updateUser({ ...values, url: user.url}, id)
    }

    const handleOk = () => {
      console.log('is', isModalVisible)
      setModalVisible(false);
    }

    console.log(form.getFieldValue('gender'));
    const clearForm = () => {
      form.resetFields()
    }
    const onFinishFailed = (errorInfo: unknown) => {
      console.error('Form submission failed:', errorInfo)
    }

    // Fetch user data on mount
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const fetchedUser = await userAPI.getOneUser(id) // Fetch user by ID
          // setUser(fetchedUser)
          // Set initial values in the form
          form.setFieldsValue({
            ...fetchedUser,
            expired_date: fetchedUser?.expired_date ? dayjs(fetchedUser?.expired_date) : null // Handling expired_date formatting
          })
          setUser(fetchedUser);
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
      fetchUser()
    }, [id, form])

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
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select your role!' }]}
              >
                <Select>
                  <Select.Option value={1}>Admin</Select.Option>
                  <Select.Option value={0}>Seller</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name='email' label='Email' required={true}>
                <Input disabled/>
              </Form.Item>
              <Form.Item label='Radio' name='gender' >
                <Radio.Group value={form.getFieldValue('gender')}>
                  <Radio value={false}> Male </Radio>
                  <Radio value={true}> Female </Radio>
                </Radio.Group>
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
                      <p>Your form has been successfully updated!</p>

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
