import React from "react";
import styled from "styled-components";
import { AnswerObject } from "../../App";
import { COLORS } from "../../constants";
import { MyText, MyTextSecondary } from "../text";

const AnswerProposition = styled.div<{
  disabled?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
}>`
  background-color: ${(props) =>
    props.isCorrect ? COLORS.SUCCESS : props.isWrong ? COLORS.DANGER : ""};
  border: solid 2px ${COLORS.PRIMARY};
  border-radius: 4px;
  color: ${COLORS.SECONDARY};
  padding: 20px 50px;
  text-align: center;
  margin: 10px 0;
  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.2);
  }
  ${(props) => (props.disabled ? `pointer-events: none;` : "")}
`;
interface QuestionProps {
  question: string;
  answers: string[];
  callback: (answer: string) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}
const QuestionCard: React.FC<QuestionProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}) => (
  <div>
    <MyText>
      Question: {questionNumber}/{totalQuestions}
    </MyText>
    <MyText>{atob(question)}</MyText>
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <AnswerProposition
            isCorrect={answer === userAnswer?.correctAnswer}
            isWrong={userAnswer?.userAnswer === answer && !userAnswer?.correct}
            disabled={!!userAnswer}
            onClick={() => callback(answer)}>
            <MyTextSecondary>{atob(answer)}</MyTextSecondary>
          </AnswerProposition>
        </div>
      ))}
    </div>
  </div>
);
export default QuestionCard;
