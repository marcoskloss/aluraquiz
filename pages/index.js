import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import Logo from '../src/components/QuizLogo';
import QuizInput from '../src/components/Input'
import Button from '../src/components/Button'
import QuizBackground from '../src/components/BackgroundImage';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [ name, setName ] = useState('')


  return (
    <QuizBackground>
      <QuizContainer>
        <Logo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (evt) {
              evt.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <QuizInput placeholder="Diz ai seu nome pra jogar ;)"
                name="nomeDoUsuario"
                onChange={evt => setName(evt.target.value)}
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar: ${name}`}
              </Button>
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
    </QuizBackground>
  );
}
