import React from 'react';
import { Statistic, Card } from 'antd';

interface StatCardProps {
  title?: string;
  value?: string | number;
  prefix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title = 'Stat', value = 0, prefix }) => (
  <Card size="small" style={{ height: '100%' }}>
    <Statistic title={title} value={value} prefix={prefix} />
  </Card>
);

export default StatCard;
