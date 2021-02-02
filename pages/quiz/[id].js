import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen
          externalQuestions={dbExterno.questions}
          externalBg={dbExterno.bg} 
        />
      </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, user] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${user}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Falhar ao carregar dados externos');
    })
    .then((response) => response)
    .catch(err => {
      console.error(err)
    });
  
  return {
    props: {
      dbExterno
    } 
  };
}