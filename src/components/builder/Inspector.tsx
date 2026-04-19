import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography, Input, Select, Button, Divider, Form, Space, Alert, Tag
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { RootState, AppDispatch } from '../../store';
import {
  updateWidgetProps,
  updateWidgetVisibility,
  removeWidget,
} from '../../store/slices/templateSlice';
import { setSelectedWidgetId } from '../../store/slices/editorSlice';
import type { VisibilityRule, VisibilityOp } from '../../types/template';
import { getRegistryEntry } from '../../registry';
import ThemePanel from './ThemePanel';

const OPS: { label: string; value: VisibilityOp }[] = [
  { label: '==', value: '==' },
  { label: '!=', value: '!=' },
  { label: 'in (array)', value: 'in' },
  { label: 'notIn (array)', value: 'notIn' },
  { label: 'truthy', value: 'truthy' },
  { label: 'falsy', value: 'falsy' },
];

const Inspector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPageId, selectedWidgetId } = useSelector((state: RootState) => state.editor);
  const page = useSelector((state: RootState) =>
    state.template.pages.find((p) => p.id === selectedPageId)
  );
  const widget = page?.grid.items.find((w) => w.id === selectedWidgetId);

  const [propsJson, setPropsJson] = useState('{}');
  const [propsError, setPropsError] = useState<string | null>(null);

  const [visOp, setVisOp] = useState<VisibilityOp>('==');
  const [visPath, setVisPath] = useState('');
  const [visValue, setVisValue] = useState('');
  const [visEnabled, setVisEnabled] = useState(false);

  useEffect(() => {
    if (widget) {
      setPropsJson(JSON.stringify(widget.props, null, 2));
      setPropsError(null);
      if (widget.visible) {
        setVisEnabled(true);
        setVisOp(widget.visible.op);
        setVisPath(widget.visible.path);
        setVisValue(
          widget.visible.value !== undefined ? JSON.stringify(widget.visible.value) : ''
        );
      } else {
        setVisEnabled(false);
        setVisOp('==');
        setVisPath('');
        setVisValue('');
      }
    }
  }, [widget?.id, selectedWidgetId]);

  const handleSaveProps = () => {
    try {
      const parsed = JSON.parse(propsJson) as Record<string, unknown>;
      dispatch(updateWidgetProps({ pageId: selectedPageId, widgetId: selectedWidgetId!, props: parsed }));
      setPropsError(null);
    } catch {
      setPropsError('Invalid JSON');
    }
  };

  const handleSaveVisibility = () => {
    if (!visEnabled) {
      dispatch(updateWidgetVisibility({ pageId: selectedPageId, widgetId: selectedWidgetId!, visible: undefined }));
      return;
    }
    let parsedValue: unknown;
    if (visValue) {
      try {
        parsedValue = JSON.parse(visValue);
      } catch {
        parsedValue = visValue;
      }
    }
    const rule: VisibilityRule = { op: visOp, path: visPath, value: parsedValue };
    dispatch(updateWidgetVisibility({ pageId: selectedPageId, widgetId: selectedWidgetId!, visible: rule }));
  };

  const handleDelete = () => {
    if (!selectedWidgetId) return;
    dispatch(removeWidget({ pageId: selectedPageId, widgetId: selectedWidgetId }));
    dispatch(setSelectedWidgetId(null));
  };

  if (!widget) {
    return (
      <div style={{ padding: 12 }}>
        <ThemePanel />
        <Divider />
        <Typography.Text type="secondary">Select a widget to inspect</Typography.Text>
      </div>
    );
  }

  const entry = getRegistryEntry(widget.type);

  return (
    <div style={{ padding: 12, overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Typography.Text strong>
          {entry?.builderMeta.icon} {entry?.displayName ?? widget.type}
        </Typography.Text>
        <Tag>{widget.id}</Tag>
      </div>
      <Divider style={{ margin: '8px 0' }} />

      <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>Props (JSON)</Typography.Text>
      <Input.TextArea
        rows={6}
        value={propsJson}
        onChange={(e) => setPropsJson(e.target.value)}
        style={{ fontFamily: 'monospace', fontSize: 12 }}
      />
      {propsError && <Alert type="error" message={propsError} style={{ marginTop: 4 }} />}
      <Button type="primary" size="small" style={{ marginTop: 8 }} onClick={handleSaveProps}>
        Save Props
      </Button>

      <Divider style={{ margin: '12px 0' }} />
      <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
        Visibility Rule
      </Typography.Text>
      <Form layout="vertical" size="small">
        <Form.Item label="Enable">
          <Select
            value={visEnabled ? 'on' : 'off'}
            onChange={(v) => setVisEnabled(v === 'on')}
            options={[{ label: 'Always visible', value: 'off' }, { label: 'Conditional', value: 'on' }]}
          />
        </Form.Item>
        {visEnabled && (
          <>
            <Form.Item label="Profile path (e.g. features.showCharts)">
              <Input value={visPath} onChange={(e) => setVisPath(e.target.value)} />
            </Form.Item>
            <Form.Item label="Operator">
              <Select value={visOp} onChange={(v) => setVisOp(v)} options={OPS} />
            </Form.Item>
            <Form.Item label="Value (JSON, skip for truthy/falsy)">
              <Input value={visValue} onChange={(e) => setVisValue(e.target.value)} />
            </Form.Item>
          </>
        )}
      </Form>
      <Button type="default" size="small" onClick={handleSaveVisibility}>
        Save Visibility
      </Button>

      <Divider style={{ margin: '12px 0' }} />
      <Space>
        <Button danger icon={<DeleteOutlined />} size="small" onClick={handleDelete}>
          Delete Widget
        </Button>
      </Space>
    </div>
  );
};

export default Inspector;
