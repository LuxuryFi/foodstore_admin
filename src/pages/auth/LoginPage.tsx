import { Button, Form, Input, Modal } from "antd"
import ButtonPrimary from '../../components/common/Button'
import authAPI from "../../api/auth"
import { Navigate } from "react-router-dom"

export const LoginPage = () => {
  const [form] = Form.useForm() // Get the form instance

  const onFinish = async (values) => {
    const result = await authAPI.login(values);
    console.log('result', result);

    window.localStorage.setItem('accessToken', result.accessToken);
    <Navigate to='/' replace/>
  }

  return (
    <>
     <div className="grid grid-cols-6 h-screen">
      <div className="bg-green-900 col-span-2">Left Div</div>
      <div className="bg-white-900 col-span-4 p-4">
      <div className="flex justify-center items-center">
      <img src="https://www.shutterstock.com/image-vector/logo-design-organic-food-fresh-260nw-1437334229.jpg" alt="Organic Food Logo" />
    </div>
    <div className="w-1/2 m-auto">
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
              // onFinishFailed={onFinishFailed}
              autoComplete='off'
              initialValues={{ remember: true }}
            >
              <Form.Item name='email' label='Email' required={true}>
                <Input required={true}/>
              </Form.Item>

              <Form.Item name='password' label='Password'  required={true}>
                <Input required={true}/>
              </Form.Item>
              <Form.Item>
                <div className='flex justify-center'>
                  <div className='grid grid-cols-2 items-center gap-4'>
                    <ButtonPrimary type='primary' htmlType='submit'>
                      Submit
                    </ButtonPrimary>
                    <Button color='danger' variant='solid'>
                      Clear
                    </Button>
                    <Modal
                      title="Submission Complete"
                      // open={isModalVisible}
                      // onOk={handleOk}
                    >
                      <p>Your form has been successfully submitted!</p>

                    </Modal>
                  </div>
                </div>
              </Form.Item>
            </Form>
    </div>
  </div>
</div>

    </>
  )
}
