import React from 'react';
import { Card } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

interface ChartMockProps {
  title?: string;
}

const ChartMock: React.FC<ChartMockProps> = ({ title = 'Chart' }) => (
  <Card size="small" title={title} style={{ height: '100%' }}>
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: 120, color: '#aaa', gap: 8
    }}>
      <BarChartOutlined style={{ fontSize: 48 }} />
      <span>Chart Placeholder</span>
    </div>
  </Card>
);

export default ChartMock;
