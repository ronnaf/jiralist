import styled from 'styled-components';
import { colorLuminance } from '../../util/Neumorphism.util';

export const JRawInsetDiv = styled.div<{ background: string }>`
  background: ${p => p.background};
  box-shadow: ${p =>
    `inset 6px 6px 13px ${colorLuminance(p.background)}, inset -6px -6px 13px ${colorLuminance(p.background, -1)};`};
`;
