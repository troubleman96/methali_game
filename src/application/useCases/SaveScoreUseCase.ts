// Application Layer - Save Score Use Case
// Handles saving and managing leaderboard scores

import { IScoreRepository } from '@domain/repositories/IScoreRepository';
import { Score, LeaderboardEntry } from '@domain/entities/Score';

export class SaveScoreUseCase {
  constructor(private scoreRepository: IScoreRepository) {}

  async execute(points: number): Promise<LeaderboardEntry[]> {
    const score: Score = {
      points,
      date: new Date().toLocaleDateString(),
    };
    
    await this.scoreRepository.saveScore(score);
    
    return this.scoreRepository.getLeaderboard(5);
  }
}
