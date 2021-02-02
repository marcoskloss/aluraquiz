import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/loading-animation.json'

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import Logo from '../../src/components/QuizLogo';
import Button from '../../src/components/Button'
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizBackground from '../../src/components/BackgroundImage';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativeForm';

function ResultWidget({ results }) {
  return (
    <Widget
      as={motion.div}
      transition={{ delay: 0.8, duration: 0.5 }}
      variants={{
        show: { opacity: 1, x: '0' },
        hidden: { opacity: 0, x: '-100%' }
      }}
      initial='hidden'
      animate='show'
    >
      <Widget.Header>
        Sua pontuação!
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        <Lottie 
          options={defaultOptions}
          height={250}
          width={250}
        />
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
    <Widget>
          <Widget.Header>
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

export default function QuizPage() {

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

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
    <QuizBackground backgroundImage={db.bg} >
      <QuizContainer>
        <Logo />

        {screenState === screenStates.QUIZ && (<QuestionWidget
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
