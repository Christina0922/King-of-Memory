import { useState, useEffect } from 'react';
import './NicknameModal.css';

interface NicknameModalProps {
  isOpen: boolean;
  currentNickname: string;
  onClose: () => void;
  onSave: (nickname: string) => void;
}

export const NicknameModal: React.FC<NicknameModalProps> = ({
  isOpen,
  currentNickname,
  onClose,
  onSave,
}) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNickname(currentNickname);
      setError('');
    }
  }, [isOpen, currentNickname]);

  const handleSave = () => {
    const trimmed = nickname.trim();
    
    if (!trimmed) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (trimmed.length < 1 || trimmed.length > 15) {
      setError('닉네임은 1~15 글자만 가능합니다.');
      return;
    }

    onSave(trimmed);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="nickname-modal-overlay" onClick={onClose}>
      <div className="nickname-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nickname-modal-header">
          <h2>닉네임 설정</h2>
          <button className="nickname-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="nickname-modal-body">
          <input
            type="text"
            className="nickname-input"
            placeholder="새 닉네임 입력"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            maxLength={15}
            autoFocus
          />
          {error && <div className="nickname-error">{error}</div>}
          <div className="nickname-hint">1~15 글자만 입력 가능합니다.</div>
        </div>
        <div className="nickname-modal-footer">
          <button className="nickname-button cancel" onClick={onClose}>
            취소
          </button>
          <button className="nickname-button save" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

