import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import Logo from '../src/components/QuizLogo';

const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  height: 100vh;
  background-size: cover;
  background-position: center;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto; 
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [ name, setName ] = useState('')


  return (
    <BackgroundImage>
      <QuizContainer>
        <Logo />
        <Widget>
          <Widget.Header>
            <h1>The legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (evt) {
              const name = 'Jao';
              evt.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <input placeholder="Diz ai seu nome pra jogar ;)"
                onChange={function (evt) {
                  setName(evt.target.value);
                }}
              />
              <button type="submit" disabled={name.length === 0}>
                Jogar como {name}
              </button>
            </form>
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
  );
}
