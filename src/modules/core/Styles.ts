import styled from 'styled-components';

export const colors = {
  background1: '#333333',
  background2: '#f7f7f7',
  shadow: '#8c8c8c',
};

export const Regular = styled.div`
  font-size: 16px;
  color: ${colors.background2};
`;

export const H1 = styled.div<{ transform?: 'none' | 'uppercase' | 'lowercase' }>`
  font-size: 18px;
  color: ${colors.background2};
  font-weight: bold;
  text-transform: ${p => p.transform || 'none'};
`;
