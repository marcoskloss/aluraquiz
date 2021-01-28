import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import db from '../../../db.json';

const QuizInput = styled.input`
  padding: 10px 5px;
  border: 1px solid ${db.theme.colors.secondary};
  border-radius: 4px;
  width: 96%;
  background: ${db.theme.colors.mainBg};
  color: ${db.theme.colors.contrastText};
  outline: 0;
`;

export default function Input({ onChange, placeholder }) {
  return (
    <div>
      <QuizInput onChange={onChange} placeholder={placeholder}/> 
    </div>
  );
}

Input.defaultProps = {

}

Input.PropTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}