import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import Logo from '../src/components/QuizLogo';
import QuizInput from '../src/components/Input'
import Button from '../src/components/Button'
import QuizBackground from '../src/components/BackgroundImage';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [ name, setName ] = useState('')


  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Logo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' }
          }}
          initial='hidden'
          animate='show'
        >
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial='hidden'
          animate='show'
        >
          <Widget.Header>
            <h1>Quizes da Galera!</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((link) => {
                const [projectName, user] = link
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={link}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${user}`}  
                    >

                      {`${user}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.8, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '100%' }
          }}
          initial='hidden'
          animate='show'
        />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
