// Domain Layer - Score Repository Interface

import { Score, LeaderboardEntry } from '../entities/Score';

export interface IScoreRepository {
  saveScore(score: Score): Promise<void>;
  getLeaderboard(limit: number): Promise<LeaderboardEntry[]>;
}
