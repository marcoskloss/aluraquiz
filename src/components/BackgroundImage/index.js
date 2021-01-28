import styled from 'styled-components';
import db from '../../../db.json';

const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  height: 100vh;
  background-size: cover;
  background-position: center;
`;

export default BackgroundImage;