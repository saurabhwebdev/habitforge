import { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Avatar, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Divider, 
  message,
  Upload,
  Row,
  Col
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined,
  EditOutlined,
  UploadOutlined,
  CameraOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Profile() {
  const { currentUser, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    bio: ''
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        bio: currentUser.bio || ''
      });
    }
  }, [currentUser]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateUserProfile({
        displayName: values.displayName,
        phone: values.phone,
        bio: values.bio
      });
      
      setUserData(prev => ({
        ...prev,
        displayName: values.displayName,
        phoneNumber: values.phone,
        bio: values.bio
      }));

      message.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card 
            bordered={false} 
            className="profile-card"
            style={{ textAlign: 'center' }}
          >
            <div className="profile-avatar-container" style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar 
                size={160} 
                icon={<UserOutlined />} 
                src={currentUser?.photoURL}
                style={{ 
                  marginBottom: '20px',
                  border: '4px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
              <Upload 
                showUploadList={false}
                beforeUpload={(file) => {
                  // TODO: Implement profile picture upload
                  return false;
                }}
              >
                <Button 
                  type="primary"
                  shape="circle"
                  icon={<CameraOutlined />}
                  size="large"
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                />
              </Upload>
            </div>
            <Title level={3} style={{ marginBottom: '4px', marginTop: '8px' }}>
              {userData.displayName || 'User'}
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              {userData.email}
            </Text>
            {!editing && (
              <Button 
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setEditing(true)}
                style={{ marginTop: '24px' }}
                block
              >
                Edit Profile
              </Button>
            )}
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card bordered={false} className="profile-card">
            <Title level={4} style={{ marginBottom: '24px' }}>
              {editing ? 'Edit Profile Information' : 'Profile Information'}
            </Title>

            {editing ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  displayName: userData.displayName,
                  email: userData.email,
                  phone: userData.phoneNumber,
                  bio: userData.bio
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="displayName"
                      label="Display Name"
                      rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                    >
                      <Input prefix={<MailOutlined />} disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="bio"
                  label="Bio"
                >
                  <Input.TextArea 
                    rows={4} 
                    placeholder="Tell us about yourself..." 
                    style={{ resize: 'none' }}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <Button onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Save Changes
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            ) : (
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <Text type="secondary">Display Name</Text>
                      <Paragraph strong style={{ fontSize: '16px', marginTop: '4px' }}>
                        {userData.displayName || 'Not set'}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <Text type="secondary">Email</Text>
                      <Paragraph strong style={{ fontSize: '16px', marginTop: '4px' }}>
                        {userData.email}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <Text type="secondary">Phone Number</Text>
                      <Paragraph strong style={{ fontSize: '16px', marginTop: '4px' }}>
                        {userData.phoneNumber || 'Not set'}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className="info-item">
                      <Text type="secondary">Bio</Text>
                      <Paragraph style={{ fontSize: '16px', marginTop: '4px' }}>
                        {userData.bio || 'No bio yet'}
                      </Paragraph>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Content>
  );
} 