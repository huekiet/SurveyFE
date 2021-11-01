export interface GetQuestionResponse {
  success: boolean;
  sendQuestion: Array<Question>;
}

export interface Question {
  _id: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}
