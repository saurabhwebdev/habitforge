import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error('Passwords do not match!');
    }

    try {
      setLoading(true);
      await signup(values.email, values.password);
      message.success('Account created successfully!');
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
        title="Sign Up" 
        style={{ 
          width: '100%',
          maxWidth: '400px',
          margin: '20px'
        }}
        bordered={false}
        className="login-card"
      >
        <Form
          name="signup"
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
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Sign Up
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
} 