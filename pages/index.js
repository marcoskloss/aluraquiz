import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import GitHubCorner from '../src/components/GitHubCorner'
import Footer from '../src/components/Footer'


const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  height: 100vh;
  background-size: cover;
  background-position: center;
`

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  return (
    <BackgroundImage>
      <QuizContainer>
        <Widget>
          <Widget.Header>
                <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Alguma descricao aqui</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera!</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Alguma descricao aqui</p>
          </Widget.Content>
        </Widget> 
        <Footer />
      </QuizContainer>
      <GitHubCorner />
    </BackgroundImage>
  )
}
