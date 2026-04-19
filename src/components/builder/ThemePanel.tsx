import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, ColorPicker, InputNumber, Slider, Typography, Divider } from 'antd';
import type { RootState, AppDispatch } from '../../store';
import { updateTheme } from '../../store/slices/templateSlice';

const ThemePanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.template.theme);

  return (
    <div style={{ padding: 12 }}>
      <Typography.Text strong style={{ display: 'block', marginBottom: 12 }}>
        Theme
      </Typography.Text>
      <Divider style={{ margin: '8px 0' }} />
      <Form layout="vertical" size="small">
        <Form.Item label="Primary Color">
          <ColorPicker
            value={theme.primaryColor ?? '#1677ff'}
            onChange={(_, hex) => dispatch(updateTheme({ primaryColor: hex }))}
          />
        </Form.Item>
        <Form.Item label="Border Radius">
          <Slider
            min={0}
            max={20}
            value={theme.borderRadius ?? 6}
            onChange={(v) => dispatch(updateTheme({ borderRadius: v }))}
          />
        </Form.Item>
        <Form.Item label="Font Size">
          <InputNumber
            min={10}
            max={24}
            value={theme.fontSize ?? 14}
            onChange={(v) => dispatch(updateTheme({ fontSize: v ?? 14 }))}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ThemePanel;
