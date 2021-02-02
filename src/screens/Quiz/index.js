import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Widget from '../../components/Widget';
import Logo from '../../components/QuizLogo';
import Button from '../../components/Button'
import GitHubCorner from '../../components/GitHubCorner';
import QuizBackground from '../../components/BackgroundImage';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativeForm';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>
      <Widget.Content>
        <p>Vocẽ acertou
          {' '}
          {results.reduce((somatorio, result) => {
            const isRight = result === true;
            if (isRight) somatorio++;
            return somatorio;
          }, 0)}
          {' '}
          pergunta(s)
        </p>
        <ul>
          {results.map((result, index) => {
            return (
              <li key={`result__${index}`}>
              #0{index + 1} Resultado: {' '}
              {result === true
              ? 'Acertou!'
              : 'Errou!'}
            </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );  
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        Desafio do Loading
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
    question,
    totalQuestions,
    questionIndex,
    onSubmit,
    addResult
  }) {
  
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0.4, duration: 0.5 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial='hidden'
      animate='show'
    >
          <Widget.Header>
            <BackLinkArrow href="/" />
            <h3>Pergunta {questionIndex + 1} de {`${totalQuestions}`}</h3>
          </Widget.Header>

          <img 
            alt="descricao"
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover'
            }}
            src={question.image}
          />
          
          <Widget.Content>
            <h2>
              {question.title}
            </h2>
            <p>
              {question.description}
            </p>

            
        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 1.5 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>
          </Widget.Content>
        </Widget>
  );
}
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESTULT'
}

export default function QuizPage({ externalQuestions, externalBg }) {

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;

  console.log('QUESTOES\n', externalQuestions)
  console.log('BACKGROUND\n', bg)

  function addResult(result) {
    setResults([
      ...results,
      result
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg} >
      <QuizContainer>
        <Logo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
         )}

         {screenState === screenStates.LOADING && <LoadingWidget />}
         {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  )
}
