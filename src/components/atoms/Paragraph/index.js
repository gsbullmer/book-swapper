import styled from 'styled-components';

import { colors, fonts } from '../../globals';

const Paragraph = styled.p`
  font-family: ${fonts.primary};
  color: ${props => props.color || colors.grayscale[0]};
  font-size: 1rem;
  line-height: 1.3;
  margin: 1rem 0 0;
`;

export default Paragraph;
