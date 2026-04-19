import React from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import type { RootState } from './store';
import AppShell from './components/common/AppShell';

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.template.theme);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.primaryColor ?? '#1677ff',
          borderRadius: theme.borderRadius ?? 6,
          fontSize: theme.fontSize ?? 14,
        },
      }}
    >
      <AppShell />
    </ConfigProvider>
  );
};

export default App;
