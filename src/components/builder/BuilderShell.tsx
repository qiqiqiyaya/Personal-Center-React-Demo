import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button, Space, Tooltip, message, Upload } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import type { RootState, AppDispatch } from '../../store';
import { setTemplate } from '../../store/slices/templateSlice';
import { exportTemplate, parseTemplateJson } from '../../utils/templateIO';
import WidgetPalette from './WidgetPalette';
import BuilderCanvas from './BuilderCanvas';
import Inspector from './Inspector';
import ModeSwitch from '../common/ModeSwitch';

const { Header, Sider, Content } = Layout;

const BuilderShell: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const template = useSelector((state: RootState) => state.template);

  const handleExport = () => {
    exportTemplate(template);
    void message.success('Template exported!');
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const parsed = parseTemplateJson(json);
        dispatch(setTemplate(parsed));
        void message.success('Template imported!');
      } catch (err) {
        void message.error(`Import failed: ${(err as Error).message}`);
      }
    };
    reader.readAsText(file);
    return false; // prevent auto upload
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{
        background: '#001529', padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          Template Builder
        </span>
        <Space>
          <ModeSwitch dark />
          <Tooltip title="Export JSON">
            <Button icon={<DownloadOutlined />} onClick={handleExport} type="default" size="small">
              Export
            </Button>
          </Tooltip>
          <Upload beforeUpload={handleImport} accept=".json" showUploadList={false}>
            <Tooltip title="Import JSON">
              <Button icon={<UploadOutlined />} size="small">Import</Button>
            </Tooltip>
          </Upload>
        </Space>
      </Header>
      <Layout>
        <Sider width={200} theme="light" style={{ borderRight: '1px solid #f0f0f0', overflowY: 'auto' }}>
          <WidgetPalette />
        </Sider>
        <Content style={{ overflow: 'auto', background: '#f0f2f5' }}>
          <BuilderCanvas />
        </Content>
        <Sider width={260} theme="light" style={{ borderLeft: '1px solid #f0f0f0', overflowY: 'auto' }}>
          <Inspector />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default BuilderShell;
