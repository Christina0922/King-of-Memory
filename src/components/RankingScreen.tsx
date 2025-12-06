import React, { useState, useEffect } from 'react';
import { RankingType, RankingItem } from '../types/game';
import { getFilteredRanking } from '../utils/storage';
import './RankingScreen.css';

interface RankingScreenProps {
  onBack: () => void;
}

export const RankingScreen: React.FC<RankingScreenProps> = ({ onBack }) => {
  const [selectedType, setSelectedType] = useState<RankingType>('daily');
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  useEffect(() => {
    const filtered = getFilteredRanking(selectedType);
    setRanking(filtered);
  }, [selectedType]);

  const getTypeName = (type: RankingType): string => {
    switch (type) {
      case 'daily':
        return '일간';
      case 'weekly':
        return '주간';
      case 'monthly':
        return '월간';
      default:
        return '';
    }
  };

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}분 ${remainingSeconds}초`;
    }
    return `${remainingSeconds}초`;
  };

  const getCountryFlag = (countryCode: string): string => {
    // 간단한 이모지 플래그 (실제로는 더 정교한 구현 필요)
    const flagMap: Record<string, string> = {
      KR: '🇰🇷',
      US: '🇺🇸',
      JP: '🇯🇵',
      CN: '🇨🇳',
      GB: '🇬🇧',
      FR: '🇫🇷',
      DE: '🇩🇪',
      ES: '🇪🇸',
      IT: '🇮🇹',
      RU: '🇷🇺',
    };
    return flagMap[countryCode] || '🏳️';
  };

  return (
    <div className="ranking-screen">
      <div className="ranking-header">
        <button className="back-button" onClick={onBack}>
          ← 뒤로
        </button>
        <h1 className="ranking-title">랭킹</h1>
        <div className="header-spacer"></div>
      </div>

      <div className="ranking-content">
        <div className="type-selector">
          {(['daily', 'weekly', 'monthly'] as RankingType[]).map((type) => (
            <button
              key={type}
              className={`type-button ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {getTypeName(type)}
            </button>
          ))}
        </div>

        <div className="ranking-list">
          {ranking.length === 0 ? (
            <div className="empty-ranking">랭킹 데이터가 없습니다.</div>
          ) : (
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>국가</th>
                  <th>닉네임</th>
                  <th>점수</th>
                  <th>시간</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((item, index) => {
                  // 동점 처리: 같은 점수면 같은 순위
                  let rank = index + 1;
                  if (index > 0 && ranking[index - 1].score === item.score) {
                    rank = ranking.findIndex((r) => r.score === item.score) + 1;
                  }

                  return (
                    <tr key={index}>
                      <td className="rank-cell">{rank}</td>
                      <td className="flag-cell">{getCountryFlag(item.countryCode)}</td>
                      <td className="nickname-cell">{item.nickname}</td>
                      <td className="score-cell">{item.score}</td>
                      <td className="time-cell">{formatTime(item.time)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

