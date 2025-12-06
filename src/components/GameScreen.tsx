import _React from 'react';
import { GameMode } from '../types/game';
import { useGame } from '../hooks/useGame';
import { GameDisplay } from './GameDisplay';
import { InputPanel } from './InputPanel';
import { ScoreDisplay } from './ScoreDisplay';
import './GameScreen.css';

interface GameScreenProps {
  mode: GameMode;
  onBack: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ mode, onBack }) => {
  const {
    pattern,
    isPlayingPattern,
    isAwaitingInput,
    inputIndex,
    currentScore,
    todayBest,
    weeklyBest,
    allTimeBest,
    showingIndex,
    result,
    newRecordMessage,
    startGame,
    handleInput,
    resetGame,
  } = useGame(mode);

  const getModeName = (mode: GameMode): string => {
    switch (mode) {
      case 1:
        return '숫자 → 문자';
      case 2:
        return '숫자 → 색깔';
      case 3:
        return '숫자만';
      case 4:
        return '알파벳만';
      default:
        return '';
    }
  };

  const isGameActive = isPlayingPattern || isAwaitingInput;

  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>
        <h1 className="game-title">{getModeName(mode)}</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="game-content">
        {/* 상단: 점수 영역 */}
        <div className="top-section">
          <ScoreDisplay
            currentScore={currentScore}
            todayBest={todayBest}
            weeklyBest={weeklyBest}
            allTimeBest={allTimeBest}
          />
        </div>

        {/* 중간: 게임 디스플레이 및 컨트롤 */}
        <div className="middle-section">
          <GameDisplay
            pattern={pattern}
            showingIndex={showingIndex}
            result={result}
            mode={mode}
            inputIndex={inputIndex}
          />

          {newRecordMessage && (
            <div className="new-record-message">{newRecordMessage}</div>
          )}

          <div className="game-controls">
            {!isGameActive && pattern.length === 0 && (
              <button className="start-button" onClick={startGame}>
                게임 시작
              </button>
            )}
            {isGameActive && (
              <button className="reset-button" onClick={resetGame} disabled={isPlayingPattern}>
                게임 리셋
              </button>
            )}
            {!isGameActive && pattern.length > 0 && (
              <button className="start-button" onClick={startGame}>
                다시 시작
              </button>
            )}
          </div>
        </div>

        {/* 하단: 입력 패널 (키패드) */}
        {isAwaitingInput && (
          <div className="bottom-section">
            <InputPanel
              mode={mode}
              onInput={handleInput}
              disabled={isPlayingPattern}
            />
          </div>
        )}
      </div>
    </div>
  );
};
