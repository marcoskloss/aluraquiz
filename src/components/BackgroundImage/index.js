import styled from 'styled-components';

const BackgroundImage = styled.div`
  background-image: url(${({ backgroundImage }) => backgroundImage});
  height: 100vh;
  background-size: cover;
  background-position: center;
`;

export default BackgroundImage;