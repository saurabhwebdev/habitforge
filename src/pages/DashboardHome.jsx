import { Card, Typography, Row, Col, Statistic } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

export default function DashboardHome() {
  const { currentUser } = useAuth();

  return (
    <div>
      <Title level={2}>Welcome back, {currentUser?.displayName || 'User'}!</Title>
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Habits"
              value={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Today"
              value={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Streak"
              value={0}
              suffix="days"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Success Rate"
              value={0}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      
      {/* Add more dashboard content here */}
    </div>
  );
} 