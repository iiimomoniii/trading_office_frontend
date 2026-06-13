import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

interface LoginForm {
  username: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [form] = Form.useForm<LoginForm>()

  const onFinish = async (values: LoginForm) => {
    // TODO: implement auth in Phase auth story
    console.log('login', values)
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>TradingOffice — Sign In</title>
      </Head>
    <div className="min-h-screen flex items-center justify-center bg-bg-dark">
      <Card
        style={{
          width: 400,
          background: '#0f1629',
          border: '1px solid #1e293b',
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold">
            🏢 Trading<span className="text-blue-400">Office</span>
          </h1>
          <p className="text-text-secondary text-sm mt-2">AI Dashboard</p>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter username' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </>
  )
}
