import { useState } from 'react';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      message.success('Successfully logged in!');
      navigate('/dashboard');
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
        title="Login" 
        style={{ 
          width: '100%',
          maxWidth: '400px',
          margin: '20px'
        }}
        bordered={false}
        className="login-card"
      >
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            extra={
              <div style={{ textAlign: 'right', marginTop: '4px' }}>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            }
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Log in
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
} 