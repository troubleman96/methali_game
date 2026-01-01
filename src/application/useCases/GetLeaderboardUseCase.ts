// Application Layer - Get Leaderboard Use Case

import { IScoreRepository } from '@domain/repositories/IScoreRepository';
import { LeaderboardEntry } from '@domain/entities/Score';

export class GetLeaderboardUseCase {
  constructor(private scoreRepository: IScoreRepository) {}

  async execute(limit: number = 5): Promise<LeaderboardEntry[]> {
    return this.scoreRepository.getLeaderboard(limit);
  }
}
