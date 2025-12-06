import React, { useEffect, useState } from 'react';
import { loadRecord } from '../utils/storage';
import { Record } from '../types/game';
import './RecordsScreen.css';

interface RecordsScreenProps {
  onBack: () => void;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({ onBack }) => {
  const [record, setRecord] = useState<Record>({ today: 0, weekly: 0, allTime: 0 });

  useEffect(() => {
    const loadedRecord = loadRecord();
    setRecord(loadedRecord);
  }, []);

  return (
    <div className="records-screen">
      <div className="records-header">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>
        <h1 className="records-title">기록</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="records-content">
        <div className="record-cards">
          <div className="record-card">
            <div className="record-icon">📅</div>
            <div className="record-label">오늘 최고 기록</div>
            <div className="record-value">{record.today}</div>
            <div className="record-unit">점</div>
          </div>

          <div className="record-card">
            <div className="record-icon">📆</div>
            <div className="record-label">주간 최고 기록</div>
            <div className="record-value">{record.weekly}</div>
            <div className="record-unit">점</div>
          </div>

          <div className="record-card">
            <div className="record-icon">🏆</div>
            <div className="record-label">전체 최고 기록</div>
            <div className="record-value">{record.allTime}</div>
            <div className="record-unit">점</div>
          </div>
        </div>

        <div className="record-info">
          <p>점수는 도달한 최대 패턴 길이입니다.</p>
          <p>정답 시 패턴 길이가 +1 증가하고, 오답 시 길이 1로 초기화됩니다.</p>
        </div>
      </div>
    </div>
  );
};

