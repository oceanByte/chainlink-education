import {QuestionType} from "../../../course.types";

export const questions: QuestionType[] = [
  {
    question: 'How does Ethereum limit the number of computational steps?',
    answers: [
      'Programs can only run for a limited time',
      'Each computational step costs gas',
      'Ethereum prevents infinite loops with an algorithm'
    ],
    responses: ['Each computational step costs gas'],
  }
]
