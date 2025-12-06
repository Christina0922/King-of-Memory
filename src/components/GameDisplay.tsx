import React from 'react';
import { Pattern, PatternElement } from '../types/game';
import { NATO_ALPHABET } from '../constants/nato';
import './GameDisplay.css';

interface GameDisplayProps {
  pattern: Pattern;
  showingIndex: number;
  result: 'correct' | 'wrong' | null;
  mode?: number;
  inputIndex?: number;
}

export const GameDisplay: React.FC<GameDisplayProps> = ({
  pattern,
  showingIndex,
  result,
  mode,
  inputIndex = 0,
}) => {
  const getDisplayText = (element: PatternElement): string => {
    return String(element);
  };

  const getNatoWord = (letter: string): string | null => {
    if (letter.length === 1 && /[A-Z]/.test(letter)) {
      return NATO_ALPHABET[letter] || null;
    }
    return null;
  };

  const getColorClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      빨강: 'color-red',
      노랑: 'color-yellow',
      파랑: 'color-blue',
      초록: 'color-green',
      보라: 'color-purple',
      흰색: 'color-white',
    };
    return colorMap[color] || '';
  };

  return (
    <div className="game-display">
      <div className="display-area">
        {showingIndex >= 0 && showingIndex < pattern.length ? (
          <div className="showing-element">
            {typeof pattern[showingIndex] === 'string' && 
             ['빨강', '노랑', '파랑', '초록', '보라', '흰색'].includes(pattern[showingIndex] as string) ? (
              <div className={`color-block ${getColorClass(pattern[showingIndex] as string)}`}>
                {getDisplayText(pattern[showingIndex])}
              </div>
            ) : (
              <>
                {mode === 1 ? (
                  // 모드 1: 각 요소를 개별적으로 표시 (한 번에 하나만)
                  typeof pattern[showingIndex] === 'string' && /^[0-9]$/.test(pattern[showingIndex] as string) ? (
                    // 숫자만 표시
                    <div className="element-main">{getDisplayText(pattern[showingIndex])}</div>
                  ) : typeof pattern[showingIndex] === 'string' && /^[A-Z]$/.test(pattern[showingIndex] as string) ? (
                    // 알파벳만 표시 (NATO 단어 포함)
                    <>
                      <div className="element-main">{getDisplayText(pattern[showingIndex])}</div>
                      {getNatoWord(String(pattern[showingIndex])) && (
                        <div className="element-nato">{getNatoWord(String(pattern[showingIndex]))}</div>
                      )}
                    </>
                  ) : (
                    <div className="element-main">{getDisplayText(pattern[showingIndex])}</div>
                  )
                ) : (
                  <>
                    <div className="element-main">
                      {getDisplayText(pattern[showingIndex])}
                    </div>
                    {mode === 4 && getNatoWord(String(pattern[showingIndex])) && (
                      <div className="element-nato">{getNatoWord(String(pattern[showingIndex]))}</div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="empty-display">
            {result === 'correct' && <div className="result-message correct">정답!</div>}
            {result === 'wrong' && <div className="result-message wrong">오답!</div>}
            {!result && showingIndex === -1 && pattern.length > 0 && (
              <div className="input-prompt">
                {inputIndex < pattern.length ? `입력하세요 (${inputIndex + 1}/${pattern.length})` : '입력하세요'}
              </div>
            )}
            {!result && showingIndex === -1 && pattern.length === 0 && (
              <div className="input-prompt">게임 시작 버튼을 눌러주세요</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
