import React from 'react';
import { Typography } from 'antd';

interface TextProps {
  content?: string;
}

const TextWidget: React.FC<TextProps> = ({ content = 'Text widget' }) => (
  <div style={{ padding: 8 }}>
    <Typography.Text>{content}</Typography.Text>
  </div>
);

export default TextWidget;
