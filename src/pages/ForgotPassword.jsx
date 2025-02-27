import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await resetPassword(values.email);
      message.success('Password reset email sent! Please check your inbox.');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5',
      margin: 0,
      padding: 0
    }}>
      <Card 
        title="Reset Password" 
        style={{ 
          width: '100%',
          maxWidth: '400px',
          margin: '20px'
        }}
        bordered={false}
        className="login-card"
      >
        <Form
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Send Reset Link
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Remember your password? <Link to="/login">Log in</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
} 