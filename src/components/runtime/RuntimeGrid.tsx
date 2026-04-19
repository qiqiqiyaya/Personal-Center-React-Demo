import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import type { GridConfig } from '../../types/template';
import RuntimeWidget from './RuntimeWidget';

interface RuntimeGridProps {
  grid: GridConfig;
  width?: number;
}

const RuntimeGrid: React.FC<RuntimeGridProps> = ({ grid, width = 1200 }) => {
  const layout = grid.items.map((item) => ({ ...item.layout }));

  return (
    <GridLayout
      className="layout"
      layout={layout}
      gridConfig={{
        cols: grid.cols ?? 12,
        rowHeight: grid.rowHeight ?? 60,
        margin: [8, 8],
      }}
      dragConfig={{ enabled: false }}
      resizeConfig={{ enabled: false }}
      width={width}
    >
      {grid.items.map((widget) => (
        <div key={widget.id}>
          <RuntimeWidget widget={widget} />
        </div>
      ))}
    </GridLayout>
  );
};

export default RuntimeGrid;
