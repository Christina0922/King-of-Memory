import React, { useState, useEffect } from 'react';
import { GameMode } from '../types/game';
import { NicknameModal } from './NicknameModal';
import { savePlayerName, loadPlayerName } from '../utils/storage';
import './ModeSelection.css';

interface ModeSelectionProps {
  onSelectMode: (mode: GameMode) => void;
  onShowRanking: () => void;
  onShowRecords: () => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({
  onSelectMode,
  onShowRanking,
  onShowRecords,
}) => {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [currentNickname, setCurrentNickname] = useState('Player');

  useEffect(() => {
    setCurrentNickname(loadPlayerName());
  }, []);

  const handleSaveNickname = (nickname: string) => {
    savePlayerName(nickname);
    setCurrentNickname(nickname);
  };
  const modes: Array<{ mode: GameMode; name: string; description: string }> = [
    {
      mode: 1,
      name: '숫자 → 문자',
      description: '숫자와 대문자 알파벳이 교대로 등장',
    },
    {
      mode: 2,
      name: '숫자 → 색깔',
      description: '숫자와 색상이 교대로 등장',
    },
    {
      mode: 3,
      name: '숫자만',
      description: '숫자만 연속 나열',
    },
    {
      mode: 4,
      name: '알파벳만',
      description: '대문자 알파벳만 연속 나열 (NATO 표준)',
    },
  ];

  return (
    <div className="mode-selection">
      <div className="mode-header">
        <div className="header-top">
          <h1 className="app-title">King of Memory</h1>
          <button
            className="nickname-setting-button"
            onClick={() => setIsNicknameModalOpen(true)}
            title="닉네임 설정"
          >
            ⚙️
          </button>
        </div>
        <p className="app-subtitle">기억력의 왕</p>
      </div>

      <div className="mode-grid">
        {modes.map(({ mode, name, description }) => (
          <button
            key={mode}
            className={`mode-card mode-card-${mode}`}
            onClick={() => onSelectMode(mode)}
          >
            <div className="mode-number">모드 {mode}</div>
            <div className="mode-name">{name}</div>
            <div className="mode-description">{description}</div>
          </button>
        ))}
      </div>

      <div className="menu-buttons">
        <button className="menu-button" onClick={onShowRecords}>
          기록 보기
        </button>
        <button className="menu-button" onClick={onShowRanking}>
          랭킹 보기
        </button>
      </div>

      <NicknameModal
        isOpen={isNicknameModalOpen}
        currentNickname={currentNickname}
        onClose={() => setIsNicknameModalOpen(false)}
        onSave={handleSaveNickname}
      />
    </div>
  );
};

