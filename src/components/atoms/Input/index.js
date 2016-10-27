import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'components/globals';

const styles = ({ invalid, type }) => css`
  font-family: ${fonts.primary};
  display: block;
  width: 100%;
  color: inherit;
  margin: 0;
  box-sizing: border-box;
  font-size: 1em;
  padding: .25em;
  border: 1px solid ${invalid ? colors.danger[2] : colors.grayscale[4]};
  border-radius: 2px;
  height: ${type === 'textarea' ? 'auto' : '2.5rem'};

  &[type=checkbox], &[type=radio] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.2rem 0 0;
  }
`;

const StyledTextarea = styled.textarea`${styles}`;
const StyledInput = styled.input`${styles}`;

const Input = ({ ...props, type }) => {
  if (type === 'textarea') {
    return <StyledTextarea {...props} />;
  }
  return <StyledInput {...props} />;
};

Input.propTypes = {
  invalid: PropTypes.bool,
  type: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
