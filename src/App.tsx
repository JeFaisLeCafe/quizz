import React, { useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { Difficulty, fetchQuizzQuestions, QuestionFormatted } from "./api";
import { MyButton } from "./components/myButton";
import QuestionCard from "./components/questionCard.tsx";
import { Title, MyText } from "./components/text";
import { COLORS } from "./constants";

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 100vh;
  align-items: center;
  background-color: ${COLORS.BACKGROUND};
  justify-content: center;
  display: flex;
`;
const Content = styled.div`
  width: 80vw;
  height: 80vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
const AnswerBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ScoreBarre = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  box-sizing: border-box;
`;

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  userAnswer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionFormatted[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuizz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizzQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (answer: string) => {
    if (!gameOver) {
      const userAnswer = answer;
      const answerIsCorrect = questions[number].correct_answer === userAnswer;

      if (answerIsCorrect) {
        setScore((prev) => prev + 1);
      }

      const answerObj = {
        question: questions[number].question,
        userAnswer,
        correct: answerIsCorrect,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return loading ? (
    <Container>
      <Content>
        <Loader type="Grid" color={COLORS.PRIMARY} height={250} width={250} />
      </Content>
    </Container>
  ) : (
    <Container>
      <Content>
        <Title>Quizz</Title>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
          <MyButton onClick={startQuizz}>
            <MyText>Start</MyText>
          </MyButton>
        )}
        {questions.length > 0 && (
          <ScoreBarre>
            <MyText>
              Score: {score}/{userAnswers.length}
            </MyText>
            <MyText>Timer: </MyText>
          </ScoreBarre>
        )}

        <AnswerBox>
          {questions.length > 0 && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
        </AnswerBox>

        {!gameOver && number + 1 < TOTAL_QUESTIONS && (
          <MyButton onClick={nextQuestion}>
            <MyText>Next Question</MyText>
          </MyButton>
        )}
      </Content>
    </Container>
  );
};

export default App;
