import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import type { RootState, AppDispatch } from '../../store';
import { updateAllLayouts } from '../../store/slices/templateSlice';
import { setSelectedWidgetId } from '../../store/slices/editorSlice';
import { getRegistryEntry } from '../../registry';
import { evaluateVisibility } from '../../utils/visibilityEvaluator';
import type { WidgetNode, WidgetLayout } from '../../types/template';

const BuilderCanvas: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPageId, selectedWidgetId } = useSelector((state: RootState) => state.editor);
  const page = useSelector((state: RootState) =>
    state.template.pages.find((p) => p.id === selectedPageId)
  );
  const profile = useSelector((state: RootState) => state.mockUserProfile);

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  if (!page) return <div>No page selected</div>;

  const layout: Layout = page.grid.items.map((w) => ({ ...w.layout }));

  const handleLayoutChange = (newLayout: Layout) => {
    const layouts: WidgetLayout[] = Array.from(newLayout).map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      minW: item.minW,
      minH: item.minH,
      maxW: item.maxW,
      maxH: item.maxH,
    }));
    dispatch(updateAllLayouts({ pageId: selectedPageId, layouts }));
  };

  const renderWidget = (widget: WidgetNode) => {
    const entry = getRegistryEntry(widget.type);
    const isVisible = evaluateVisibility(widget.visible, profile);
    const isSelected = widget.id === selectedWidgetId;

    return (
      <div
        key={widget.id}
        style={{
          outline: isSelected ? '2px solid #1677ff' : '1px dashed #d9d9d9',
          borderRadius: 4,
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          background: '#fff',
          height: '100%',
          opacity: isVisible ? 1 : 0.4,
        }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedWidgetId(widget.id));
        }}
      >
        {!isVisible && (
          <div style={{
            position: 'absolute', top: 2, right: 4, fontSize: 10,
            color: '#ff4d4f', zIndex: 10, background: 'rgba(255,255,255,0.8)',
            padding: '0 4px', borderRadius: 2,
          }}>
            hidden
          </div>
        )}
        {entry ? (
          <entry.component {...(widget.props as Record<string, unknown>)} />
        ) : (
          <div style={{ padding: 8, color: 'red' }}>Unknown: {widget.type}</div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', background: '#f5f5f5', minHeight: 600 }}
      onClick={() => dispatch(setSelectedWidgetId(null))}
    >
      <GridLayout
        className="layout"
        layout={layout}
        gridConfig={{
          cols: page.grid.cols ?? 12,
          rowHeight: page.grid.rowHeight ?? 60,
          margin: [8, 8],
        }}
        width={width}
        onLayoutChange={handleLayoutChange}
      >
        {page.grid.items.map(renderWidget)}
      </GridLayout>
    </div>
  );
};

export default BuilderCanvas;
