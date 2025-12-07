import _React from 'react';
import { GameMode, PatternElement } from '../types/game';
import { NUMBERS, ALPHABETS, COLORS, Color } from '../constants/nato';
import './InputPanel.css';

interface InputPanelProps {
  mode: GameMode;
  onInput: (element: PatternElement) => void;
  disabled?: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ mode, onInput, disabled }) => {
  const handleNumberClick = (num: string) => {
    if (!disabled) {
      onInput(num);
    }
  };

  const handleAlphabetClick = (letter: string) => {
    if (!disabled) {
      onInput(letter);
    }
  };


  const handleColorClick = (color: Color) => {
    if (!disabled) {
      onInput(color);
    }
  };

  switch (mode) {
    case 1: // 숫자 + 알파벳
      return (
        <div className="input-panel mode-1-panel">
          <div className="input-section number-section">
            <h3>숫자</h3>
            <div className="number-grid-2rows">
              <div className="number-row">
                {NUMBERS.slice(0, 5).map((num) => (
                  <button
                    key={num}
                    className="num-btn"
                    onClick={() => handleNumberClick(num)}
                    disabled={disabled}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="number-row">
                {NUMBERS.slice(5, 10).map((num) => (
                  <button
                    key={num}
                    className="num-btn"
                    onClick={() => handleNumberClick(num)}
                    disabled={disabled}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="input-section alphabet-section">
            <h3>알파벳</h3>
            <div className="alphabet-grid-4rows">
              <div className="alphabet-row">
                {ALPHABETS.slice(0, 7).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="alphabet-row">
                {ALPHABETS.slice(7, 14).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="alphabet-row">
                {ALPHABETS.slice(14, 21).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="alphabet-row">
                {ALPHABETS.slice(21, 26).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 2: // 숫자 + 색상
      return (
        <div className="input-panel mode-2-panel">
          <div className="input-section number-section">
            <h3>숫자</h3>
            <div className="number-grid-2rows">
              <div className="number-row">
                {NUMBERS.slice(0, 5).map((num) => (
                  <button
                    key={num}
                    className="num-btn"
                    onClick={() => handleNumberClick(num)}
                    disabled={disabled}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="number-row">
                {NUMBERS.slice(5, 10).map((num) => (
                  <button
                    key={num}
                    className="num-btn"
                    onClick={() => handleNumberClick(num)}
                    disabled={disabled}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="input-section">
            <h3>색상</h3>
            <div className="color-grid">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`input-button color-button color-${color}`}
                  onClick={() => handleColorClick(color)}
                  disabled={disabled}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    case 3: // 숫자만
      return (
        <div className="input-panel mode-3-panel">
          <div className="input-section number-section">
            <h3>숫자</h3>
            <div className="number-grid-2rows">
              <div className="number-row">
                {NUMBERS.slice(0, 5).map((num) => (
                  <button
                    key={num}
                    className="num-btn"
                    onClick={() => handleNumberClick(num)}
                    disabled={disabled}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="number-row">
                {NUMBERS.slice(5, 10).map((num) => (
                  <button
                    key={num}
                    className="num-btn"
                    onClick={() => handleNumberClick(num)}
                    disabled={disabled}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 4: // 알파벳만
      return (
        <div className="input-panel mode-4-panel">
          <div className="input-section alphabet-section">
            <h3>알파벳</h3>
            <div className="alphabet-grid-4rows">
              <div className="alphabet-row">
                {ALPHABETS.slice(0, 7).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="alphabet-row">
                {ALPHABETS.slice(7, 14).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="alphabet-row">
                {ALPHABETS.slice(14, 21).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="alphabet-row">
                {ALPHABETS.slice(21, 26).map((letter) => (
                  <button
                    key={letter}
                    className="alpha-btn"
                    onClick={() => handleAlphabetClick(letter)}
                    disabled={disabled}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

