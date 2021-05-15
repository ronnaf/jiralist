import styled from 'styled-components';

export const SizedBox = styled.div<{ height?: number; width?: number }>`
  height: ${p => p.height}px;
  width: ${p => p.width}px;
`;
