import React from 'react';
import styled from 'styled-components';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Logo from '../src/components/QuizLogo';
import Button from '../src/components/Button'
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/BackgroundImage';
import QuizContainer from '../src/components/QuizContainer';

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
    onSubmit
  }) {
  const questionId = `question__${questionIndex}`;
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

            <form
              onSubmit={(evt) => {
                evt.preventDefault();
                onSubmit();
              }}
            >
              {question.alternatives.map((alternative, alternativeIndex) => {
                console.log(alternative);
                const alternativeId = `alterantive__${alternativeIndex}`;
                return (
                  <Widget.Topic htmlFor={alternativeId} as="label">
                    <input
                      id={alternativeId}
                      type='radio'
                      name={questionId}
                    />
                    {alternative} 
                  </Widget.Topic>
                );
              })}
              <Button type='submit'>
                Confirmar
              </Button>
            </form> 
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
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

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
          />
         )}

         {screenState === screenStates.LOADING && <LoadingWidget />}
         {screenState === screenStates.RESULT && <div>FIM</div>}
        </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  )
}
