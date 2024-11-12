import { useEffect, useState } from 'react'
import productAPI from '../../api/product'
import { Product } from '../../interfaces/product.interfaces'
import { motion } from 'framer-motion'
import { Header } from '../../components/common/Header'
import { Button, DatePicker, Form, Switch, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Input from '../../components/common/Input'
import ButtonPrimary from '../../components/common/Button'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs' // if you're using dayjs to handle dates

export const UpdateProductPages = () => {
  const [product, setProduct] = useState<Product>({})
  const [form] = Form.useForm()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const onFinish = async (values: Product) => {
    console.log('Form data submitted:', product)
    // Call the update API here with the new values
    await productAPI.updateProduct({...values, image: product.image }, id)
    clearForm();
    navigate('/product')
  }

  const clearForm = () => {
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Form submission failed:', errorInfo)
  }

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productAPI.getOneProduct(id) // Fetch product by ID
        // setProduct(fetchedProduct)
        // Set initial values in the form
        form.setFieldsValue({
          ...fetchedProduct,
          expired_date: fetchedProduct?.expired_date ? dayjs(fetchedProduct?.expired_date) : null // Handling expired_date formatting
        })

        setProduct(fetchedProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct()
  }, [id, form])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Update Product' />

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

            <Form.Item label='Status' valuePropName='checked' name='status'>
              <Switch />
            </Form.Item>

            {/* <Form.Item label='Upload' name='image' valuePropName='fileList' getValueFromEvent={normFile}>
              <Upload listType='picture-card' name='image' action='http://localhost:4000/products/upload' beforeUpload={() => false}>
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
