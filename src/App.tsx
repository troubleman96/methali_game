// Main App Component - Orchestrates the game flow

import { useGameViewModel } from '@presentation/viewModels/useGameViewModel';
import { StartScreen } from '@presentation/components/StartScreen';
import { GameScreen } from '@presentation/components/GameScreen';
import { FinishScreen } from '@presentation/components/FinishScreen';
import {
  startGameUseCase,
  answerQuestionUseCase,
  useHintUseCase,
  saveScoreUseCase,
  getLeaderboardUseCase,
} from './di/container';

const App = () => {
  const {
    gameState,
    currentQuestion,
    feedback,
    leaderboard,
    progress,
    startGame,
    handleAnswer,
    handleUseHint,
    resetToStart,
  } = useGameViewModel({
    startGameUseCase,
    answerQuestionUseCase,
    useHintUseCase,
    saveScoreUseCase,
    getLeaderboardUseCase,
  });

  if (gameState.status === 'START') {
    return <StartScreen onStart={startGame} leaderboard={leaderboard} />;
  }

  if (gameState.status === 'PLAYING') {
    return (
      <GameScreen
        gameState={gameState}
        currentQuestion={currentQuestion}
        feedback={feedback}
        progress={progress}
        onAnswer={handleAnswer}
        onUseHint={handleUseHint}
      />
    );
  }

  if (gameState.status === 'FINISHED') {
    return (
      <FinishScreen
        score={gameState.score}
        onRestart={startGame}
        onBackToStart={resetToStart}
      />
    );
  }

  return null;
};

export default App;
