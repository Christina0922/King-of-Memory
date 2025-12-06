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
      <div className="record-section">
        <div className="record-item">
          <span className="record-label">오늘 최고</span>
          <span className="record-value">{todayBest}</span>
        </div>
        <div className="record-item">
          <span className="record-label">주간 최고</span>
          <span className="record-value">{weeklyBest}</span>
        </div>
        <div className="record-item">
          <span className="record-label">전체 최고</span>
          <span className="record-value">{allTimeBest}</span>
        </div>
      </div>
    </div>
  );
};
