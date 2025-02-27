import { Layout, Menu, Button, Typography } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px'
      }}>
        <div style={{ color: 'white' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>Dashboard</Title>
        </div>
        <div>
          <span style={{ color: 'white', marginRight: '16px' }}>
            {currentUser?.email}
          </span>
          <Button onClick={handleLogout} type="primary" danger>
            Logout
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Title level={2}>Welcome to your Dashboard!</Title>
        <p>You are now logged in with {currentUser?.email}</p>
        {/* Add your dashboard content here */}
      </Content>
    </Layout>
  );
} 