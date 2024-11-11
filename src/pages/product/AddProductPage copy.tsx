import { useEffect, useState } from 'react'
import productAPI from '../../api/product'
import { Product } from '../../interfaces/product.interfaces'
import { motion } from 'framer-motion'
import { Radio } from 'antd'
import { Header } from '../../components/common/Header'
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  InputNumber,
  Slider,
  Switch,
  TreeSelect
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { PlusIcon } from 'lucide-react'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Upload from '../../components/common/Upload'
import ButtonPrimary from '../../components/common/Button'

export const AddProductPages = () => {
  const [product, setProduct] = useState<Product[]>([])

  const onFinish = (values) => {
    console.log('Form data submitted:', values);
    // Add your submission logic here (e.g., API call)
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Form submission failed:', errorInfo);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productAPI.getProduct()
        setProduct(products) // Set the product state with fetched data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, []) // Empty dependency array to run the effect only once

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  console.log('produict', product)
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{ remember: true }}
          >
            <Form.Item label='Checkbox' name='disabled' valuePropName='checked'>
              <Checkbox>Checkbox</Checkbox>
            </Form.Item>
            <Form.Item label='Radio'>
              <Radio.Group>
                <Radio value='apple'> Apple </Radio>
                <Radio value='pear'> Pear </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='Input'>
              <Input />
            </Form.Item>
            <Form.Item label='Select'>
              <Select>
                <Select.Option value='demo'>Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='TreeSelect'>
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [
                      {
                        title: 'Bamboo',
                        value: 'bamboo'
                      }
                    ]
                  }
                ]}
              />
            </Form.Item>
            <Form.Item label='Cascader'>
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou'
                      }
                    ]
                  }
                ]}
              />
            </Form.Item>
            <Form.Item label='DatePicker'>
              <DatePicker />
            </Form.Item>
            <Form.Item label='InputNumber'>
              <InputNumber />
            </Form.Item>
            <Form.Item label='TextArea'>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label='Switch' valuePropName='checked'>
              <Switch />
            </Form.Item>
            <Form.Item label='Upload' valuePropName='fileList' getValueFromEvent={normFile}>
              <Upload action='/upload.do' listType='picture-card'>
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
            <Form.Item label='Button'>
              <Button>Button</Button>
            </Form.Item>
            <Form.Item label='Slider'>
              <Slider />
            </Form.Item>
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
                  <Button color='danger' variant='solid'>
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
