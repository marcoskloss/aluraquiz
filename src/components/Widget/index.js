import styled from 'styled-components';

const Widget = styled.div`
margin-top: 15px;
margin-bottom: 20px;
border: 1px solid ${({ theme }) => theme.colors.primary};
background-color: ${({ theme }) => theme.colors.mainBg};
border-radius: ${({ theme }) => theme.borderRadius};
overflow: hidden;

h1, h2, h3 {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0;
}
p {
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
}
`;

Widget.Content = styled.div`
display: flex;
flex-direction: column;
padding: 20px 32px 32px 32px;
& > *:first-child {
  margin-top: 0;
}
& > *:first-child {
  margin-bottom: 0;
}
ul {
  list-style: none;
  padding: 0;
}
`;

Widget.Header = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
padding: 18px 32px;
background-color: ${({ theme }) => theme.colors.primary};

* {
  margin: 0;
}
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background: ${({ theme }) => theme.colors.primary};
  padding: 5px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: .3s;
  display: block;

  &:hover, &focus {
    opacity: 0.6;
  }
`;
export default Widget;
