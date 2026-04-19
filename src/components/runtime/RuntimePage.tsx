import React, { useRef, useState, useEffect } from 'react';
import type { Page } from '../../types/template';
import RuntimeGrid from './RuntimeGrid';

interface RuntimePageProps {
  page: Page;
}

const RuntimePage: React.FC<RuntimePageProps> = ({ page }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <RuntimeGrid grid={page.grid} width={width} />
    </div>
  );
};

export default RuntimePage;
