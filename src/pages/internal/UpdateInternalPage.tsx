  import { useEffect, useState } from 'react'
  import internalAPI from '../../api/internal'
  import { Internal } from '../../interfaces/internal.interfaces'
  import { motion } from 'framer-motion'
  import { Header } from '../../components/common/Header'
  import { Button, Form, Modal, Radio, Select, Switch } from 'antd'
  import Input from '../../components/common/Input'
  import ButtonPrimary from '../../components/common/Button'
  import { useNavigate, useParams } from 'react-router-dom'
  import dayjs from 'dayjs' // if you're using dayjs to handle dates

  export const UpdateInternalPages = () => {
    // const [internal, setInternal] = useState<Internal | null>(null)
    const [form] = Form.useForm()
    const { id } = useParams<{ id: string }>()
    const [isModalVisible, setModalVisible] = useState(false);
    const [internal, setInternal] = useState<Internal>({})
    const navigate = useNavigate()

    const onFinish = async (values: Internal) => {
      console.log('Form data submitted:', values)
      // Call the update API here with the new values
      await internalAPI.updateInternal({ ...values, url: internal.url}, id)
      navigate('/internal')
    }

    const handleOk = () => {
      console.log('is', isModalVisible)
      setModalVisible(false);
    }

    const clearForm = () => {
      form.resetFields()
    }

    const onFinishFailed = (errorInfo: unknown) => {
      console.error('Form submission failed:', errorInfo)
    }

    // Fetch internal data on mount
    useEffect(() => {
      const fetchInternal = async () => {
        try {
          const fetchedInternal = await internalAPI.getOneInternal(id) // Fetch internal by ID
          // setInternal(fetchedInternal)
          // Set initial values in the form
          form.setFieldsValue({
            ...fetchedInternal,
            expired_date: fetchedInternal?.expired_date ? dayjs(fetchedInternal?.expired_date) : null // Handling expired_date formatting
          })
          setInternal(fetchedInternal);
        } catch (error) {
          console.error('Error fetching internal:', error)
        }
      }
      fetchInternal()
    }, [id, form])

    return (
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Add Internal' />

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
              <Form.Item label='Status' valuePropName='checked' name='status'>
              <Switch />
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
