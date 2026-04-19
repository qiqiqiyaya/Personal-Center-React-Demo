import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllRegistryEntries } from '../../registry';
import { addWidget } from '../../store/slices/templateSlice';
import { setSelectedWidgetId } from '../../store/slices/editorSlice';
import type { RootState, AppDispatch } from '../../store';
import type { WidgetNode } from '../../types/template';

let idCounter = 1000;
function genId() {
  return `w-${Date.now()}-${idCounter++}`;
}

const WidgetPalette: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPageId } = useSelector((state: RootState) => state.editor);
  const page = useSelector((state: RootState) =>
    state.template.pages.find((p) => p.id === selectedPageId)
  );

  const entries = getAllRegistryEntries();

  const handleAdd = (type: string) => {
    const entry = entries.find((e) => e.type === type);
    if (!entry || !page) return;

    const existingCount = page.grid.items.length;
    const newId = genId();

    const widget: WidgetNode = {
      id: newId,
      type,
      props: { ...entry.defaultProps },
      layout: {
        i: newId,
        x: (existingCount * entry.builderMeta.defaultW) % (page.grid.cols ?? 12),
        y: Infinity,
        w: entry.builderMeta.defaultW,
        h: entry.builderMeta.defaultH,
        minW: entry.builderMeta.minW,
        minH: entry.builderMeta.minH,
      },
    };

    dispatch(addWidget({ pageId: selectedPageId, widget }));
    dispatch(setSelectedWidgetId(newId));
  };

  return (
    <div style={{ padding: 12 }}>
      <Typography.Text strong style={{ display: 'block', marginBottom: 12 }}>
        Widgets
      </Typography.Text>
      {entries.map((entry) => (
        <Card
          key={entry.type}
          size="small"
          style={{ marginBottom: 8, cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              {entry.builderMeta.icon} {entry.displayName}
            </span>
            <Button
              type="link"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => handleAdd(entry.type)}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WidgetPalette;
