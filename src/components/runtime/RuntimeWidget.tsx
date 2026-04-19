import React from 'react';
import { useSelector } from 'react-redux';
import type { WidgetNode } from '../../types/template';
import { getRegistryEntry } from '../../registry';
import { evaluateVisibility } from '../../utils/visibilityEvaluator';
import type { RootState } from '../../store';

interface RuntimeWidgetProps {
  widget: WidgetNode;
}

const RuntimeWidget: React.FC<RuntimeWidgetProps> = ({ widget }) => {
  const profile = useSelector((state: RootState) => state.mockUserProfile);
  const isVisible = evaluateVisibility(widget.visible, profile);

  if (!isVisible) return null;

  const entry = getRegistryEntry(widget.type);
  if (!entry) {
    return <div style={{ color: 'red', padding: 8 }}>Unknown widget type: {widget.type}</div>;
  }

  const { component: Component } = entry;
  return <Component {...(widget.props as Record<string, unknown>)} />;
};

export default RuntimeWidget;
