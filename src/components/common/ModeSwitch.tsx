import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Typography } from 'antd';
import { ToolOutlined, EyeOutlined } from '@ant-design/icons';
import type { RootState, AppDispatch } from '../../store';
import { toggleMode } from '../../store/slices/modeSlice';

const ModeSwitch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <EyeOutlined />
      <Switch
        checked={mode === 'builder'}
        onChange={() => dispatch(toggleMode())}
        checkedChildren={<ToolOutlined />}
        unCheckedChildren={<EyeOutlined />}
      />
      <ToolOutlined />
      <Typography.Text style={{ color: 'white' }}>
        {mode === 'builder' ? 'Builder' : 'Runtime'}
      </Typography.Text>
    </div>
  );
};

export default ModeSwitch;
