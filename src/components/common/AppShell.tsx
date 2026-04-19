import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Typography } from 'antd';
import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import type { RootState, AppDispatch } from '../../store';
import { setSelectedPageId } from '../../store/slices/editorSlice';
import RuntimePage from '../runtime/RuntimePage';
import BuilderShell from '../builder/BuilderShell';

const { Sider, Content, Header } = Layout;

const AppShell: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootState) => state.mode);
  const template = useSelector((state: RootState) => state.template);
  const { selectedPageId } = useSelector((state: RootState) => state.editor);

  const page = template.pages.find((p) => p.id === selectedPageId) ?? template.pages[0];

  const menuItems = template.pages.map((p) => ({
    key: p.id,
    icon: <DashboardOutlined />,
    label: p.title,
  }));

  if (mode === 'builder') {
    return <BuilderShell />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={220} collapsible>
        <div style={{ padding: '16px', color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          My App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedPageId]}
          items={menuItems}
          onClick={({ key }) => dispatch(setSelectedPageId(key))}
        />
        <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0 }}>
          <Menu
            theme="dark"
            mode="inline"
            items={[{ key: 'settings', icon: <SettingOutlined />, label: 'Settings' }]}
          />
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
          <Typography.Title level={4} style={{ margin: 0, lineHeight: '64px' }}>
            {page?.title}
          </Typography.Title>
        </Header>
        <Content style={{ padding: 24, background: '#f5f5f5', overflow: 'auto' }}>
          {page ? <RuntimePage page={page} /> : <div>Page not found</div>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppShell;
