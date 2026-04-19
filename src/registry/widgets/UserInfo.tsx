import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Typography, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { RootState } from '../../store';

const { Text } = Typography;

const UserInfo: React.FC = () => {
  const profile = useSelector((state: RootState) => state.mockUserProfile);
  return (
    <Card size="small" style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Avatar size={48} icon={<UserOutlined />} />
        <div>
          <div><Text strong>{profile.name}</Text></div>
          <div><Tag color="blue">{profile.tier}</Tag><Tag>{profile.region}</Tag></div>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo;
