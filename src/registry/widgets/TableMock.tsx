import React from 'react';
import { Card, Table } from 'antd';

const mockData = [
  { key: '1', orderId: '#1001', item: 'Product A', status: 'Delivered', date: '2026-04-10' },
  { key: '2', orderId: '#1002', item: 'Product B', status: 'Pending', date: '2026-04-12' },
  { key: '3', orderId: '#1003', item: 'Product C', status: 'Shipped', date: '2026-04-15' },
];

const columns = [
  { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
  { title: 'Item', dataIndex: 'item', key: 'item' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
];

interface TableMockProps {
  title?: string;
}

const TableMock: React.FC<TableMockProps> = ({ title = 'Table' }) => (
  <Card size="small" title={title} style={{ height: '100%' }}>
    <Table dataSource={mockData} columns={columns} size="small" pagination={false} />
  </Card>
);

export default TableMock;
