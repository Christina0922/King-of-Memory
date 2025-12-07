import React from 'react';
import './ScoreDisplay.css';

interface ScoreDisplayProps {
  currentScore: number;
  todayBest: number;
  weeklyBest: number;
  allTimeBest: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  currentScore,
  todayBest,
  weeklyBest,
  allTimeBest,
}) => {
  return (
    <div className="score-display">
      <div className="score-section">
        <div className="score-label">현재 점수</div>
        <div className="score-value">{currentScore}</div>
      </div>
    </div>
  );
};
