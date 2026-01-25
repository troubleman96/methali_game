// Domain Layer - Question Repository Interface
// This defines the contract for data access without implementation details

import { Question, QuestionType } from '../entities/Question';

export interface IQuestionRepository {
  getAllQuestions(): Promise<Question[]>;
  getRandomQuestions(count: number, type?: QuestionType): Promise<Question[]>;
}
