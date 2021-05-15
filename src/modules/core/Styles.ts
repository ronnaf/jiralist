import styled from 'styled-components';

export const colors = {
  background1: '#333333',
  background2: '#f7f7f7',
  shadow: '#8c8c8c',
};

export type JTextProps = {
  transform?: 'none' | 'uppercase' | 'lowercase';
  weight?: '400' | 'bold';
};

export const Regular = styled.div<JTextProps>`
  font-size: 16px;
  color: ${colors.background2};
`;

export const H1 = styled.div<JTextProps>`
  font-size: 18px;
  color: ${colors.background2};
  font-weight: bold;
  text-transform: ${p => p.transform || 'none'};
`;

export const ButtonText = styled.div<JTextProps>`
  font-size: 14px;
  color: ${colors.background2};
  font-weight: ${p => p.weight};
  text-transform: ${p => p.transform || 'none'};
  letter-spacing: 1.5px;
`;
