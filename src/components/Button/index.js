import styled from 'styled-components';
import PropTypes from 'prop-types';
import db from '../../../db.json';

const Button = styled.button`
  margin-top: 15px;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 4px;
  background: ${db.theme.colors.primary};
  color: ${db.theme.colors.contrastText};
  cursor: pointer;
  text-transform: uppercase;
  outline: 0;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: #979797;
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired
}

export default Button;