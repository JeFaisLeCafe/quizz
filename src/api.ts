import { shuffleArray } from "./utills";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionFormatted = Question & { answers: string[] };
type ApiAnswer = {
  response_code: number;
  results: any;
};

export const fetchQuizzQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&encode=base64`;
  const data: ApiAnswer = await (await fetch(endpoint)).json();
  console.log("data", data);
  // const decodedResponse = JSON.parse(atob(JSON.stringify(data.results)));
  const formattedData = data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers
    ])
  }));
  console.log("formattedData", formattedData);
  return formattedData;
};
