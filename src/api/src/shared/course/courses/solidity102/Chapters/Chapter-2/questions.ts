import {QuestionType} from "../../../course.types";

export const questions: QuestionType[] = [
  {
    question: 'Storage variables can only use specific data types',
    answers: [
      'Yes, they can only use complex data types',
      'Yes, they can only use simple data types',
      'No, they can use any data type'
    ],
    responses: ['No, they can use any data type'],
  },
  {
    question: 'Why would you use memory instead of storage?',
    answers: [
      'Performing operations on memory is always cheaper than storage',
      'Only use memory if you must store data for a long time',
    ],
    responses: ['Performing operations on memory is always cheaper than storage'],
  },
]
