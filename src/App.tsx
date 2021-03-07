import React, { useState } from "react";
import { Difficulty, fetchQuizzQuestions, QuestionFormatted } from "./api";
import QuestionCard from "./components/questionCard.tsx";

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

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const userAnswer = e.currentTarget.value;
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
    <p>Loading Questions...</p>
  ) : (
    <div>
      <h1>Quizz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
        <button onClick={startQuizz}>start</button>
      )}
      {!gameOver && (
        <p>
          Score: {score}/{userAnswers.length}
        </p>
      )}
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

      {!gameOver && number + 1 < TOTAL_QUESTIONS && (
        <button onClick={nextQuestion}>Next Question</button>
      )}
    </div>
  );
};

export default App;
