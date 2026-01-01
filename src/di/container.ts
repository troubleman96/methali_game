// Dependency Injection Container
// Wires up all dependencies following Clean Architecture principles

import { StartGameUseCase } from '@application/useCases/StartGameUseCase';
import { AnswerQuestionUseCase } from '@application/useCases/AnswerQuestionUseCase';
import { UseHintUseCase } from '@application/useCases/UseHintUseCase';
import { SaveScoreUseCase } from '@application/useCases/SaveScoreUseCase';
import { GetLeaderboardUseCase } from '@application/useCases/GetLeaderboardUseCase';
import { InMemoryQuestionRepository } from '@infrastructure/repositories/InMemoryQuestionRepository';
import { LocalStorageScoreRepository } from '@infrastructure/repositories/LocalStorageScoreRepository';

// Infrastructure Layer - Repositories
const questionRepository = new InMemoryQuestionRepository();
const scoreRepository = new LocalStorageScoreRepository();

// Application Layer - Use Cases
export const startGameUseCase = new StartGameUseCase(questionRepository);
export const answerQuestionUseCase = new AnswerQuestionUseCase();
export const useHintUseCase = new UseHintUseCase();
export const saveScoreUseCase = new SaveScoreUseCase(scoreRepository);
export const getLeaderboardUseCase = new GetLeaderboardUseCase(scoreRepository);
