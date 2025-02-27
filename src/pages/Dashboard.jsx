import { Layout, Menu, Button, Typography, Avatar, Dropdown } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, Outlet } from 'react-router-dom';

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

  const userMenu = [
    {
      key: 'profile',
      label: <Link to="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 24px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0, marginRight: '48px' }}>
            HabitForge
          </Title>
          <Menu 
            mode="horizontal" 
            defaultSelectedKeys={['dashboard']}
            style={{ border: 'none', flex: 1 }}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            {/* Add more menu items here */}
          </Menu>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Dropdown 
            menu={{ items: userMenu }} 
            trigger={['click']}
            placement="bottomRight"
          >
            <Button type="text" style={{ height: '64px', padding: '0 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />} 
                  src={currentUser?.photoURL}
                />
                <span>{currentUser?.displayName || currentUser?.email}</span>
              </div>
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Outlet />
      </Content>
    </Layout>
  );
} 