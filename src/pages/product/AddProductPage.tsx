import { useEffect, useState } from 'react'
import productAPI from '../../api/product'
import { Product } from '../../interfaces/product.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, ColorPicker, DatePicker, Form, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import moment from 'moment'

export const AddProductPages = () => {
  const [product, setProduct] = useState<Product>({})
  const [form] = Form.useForm() // Get the form instance

  const onFinish = (values: Product) => {
    console.log('Form data submitted:', values)
    setProduct({
      ...values,
      image: 'test'
    })
  }
  const clearForm = () => {
    form.resetFields()
  }
  const onFinishFailed = (errorInfo) => {
    console.error('Form submission failed:', errorInfo)
  }

  useEffect(() => {
    if (Object.keys(product).length > 0) {
      productAPI.addProduct(product) // Add product API call
      clearForm() // Clear form after submitting
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Add Product' />

      <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8 xl:px-20'>
        {/* STAT */}
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
            <Form.Item name='product_name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
              <Input />
            </Form.Item>
            <Form.Item name='stock_quantity' label='Stock'>
              <Input />
            </Form.Item>
            <Form.Item name='expired_date' label='Expired Time'>
              <DatePicker />
            </Form.Item>
            <Form.Item name='description' label='Description'>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label='status' valuePropName='checked'>
              <Switch />
            </Form.Item>
            {/* <Form.Item label='Upload' valuePropName='fileList' getValueFromEvent={normFile}>
              <Upload
                listType='picture-card'
                name='image'
                action='http://localhost:4000/products/upload'
                withCredentials={true}
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
            </Form.Item> */}
            <Form.Item label='ColorPicker'>
              <ColorPicker />
            </Form.Item>
            {/* <Form.Item label='Rate'>
              <Rate />
            </Form.Item> */}
            <Form.Item>
              <div className='flex justify-center'>
                <div className='grid grid-cols-2 items-center gap-4'>
                  <ButtonPrimary type='primary' htmlType='submit'>
                    Submit
                  </ButtonPrimary>
                  <Button color='danger' variant='solid' onClick={clearForm}>
                    Clear
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </motion.div>
      </main>
    </div>
  )
}
