import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Typography } from 'antd';
import { ToolOutlined, EyeOutlined } from '@ant-design/icons';
import type { RootState, AppDispatch } from '../../store';
import { toggleMode } from '../../store/slices/modeSlice';

const ModeSwitch: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootState) => state.mode);
  const textStyle = dark ? { color: 'white' } : undefined;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: dark ? 'white' : undefined }}>
      <EyeOutlined />
      <Switch
        checked={mode === 'builder'}
        onChange={() => dispatch(toggleMode())}
        checkedChildren={<ToolOutlined />}
        unCheckedChildren={<EyeOutlined />}
      />
      <ToolOutlined />
      <Typography.Text style={textStyle}>
        {mode === 'builder' ? 'Builder' : 'Runtime'}
      </Typography.Text>
    </div>
  );
};

export default ModeSwitch;
