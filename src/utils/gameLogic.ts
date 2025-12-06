import { GameMode, PatternElement } from '../types/game';
import { NUMBERS, ALPHABETS, COLORS, Color, NATO_ALPHABET } from '../constants/nato';

/**
 * 랜덤 숫자 생성 (0-9)
 */
function getRandomNumber(): string {
  return NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
}

/**
 * 랜덤 대문자 알파벳 생성 (A-Z)
 */
function getRandomAlphabet(): string {
  return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
}

/**
 * 랜덤 색상 생성
 */
function getRandomColor(): Color {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

/**
 * 모드별로 새 요소 하나를 생성하는 함수
 * @param mode 게임 모드
 * @param index 요소의 인덱스 (교차형 모드에서 사용)
 * @returns 생성된 요소
 */
export function generateNewElement(mode: GameMode, index: number): PatternElement {
  switch (mode) {
    case 1: // 숫자 → 알파벳 → 숫자 → 알파벳 (교차형)
      if (index % 2 === 0) {
        return getRandomNumber();
      } else {
        // 알파벳 한 글자만 반환 (NATO 단어는 표시 시에만 사용)
        return getRandomAlphabet();
      }

    case 2: // 숫자 → 색깔 → 숫자 → 색깔 (교차형)
      if (index % 2 === 0) {
        return getRandomNumber();
      } else {
        return getRandomColor();
      }

    case 3: // 숫자만 연속 나열
      return getRandomNumber();

    case 4: // 알파벳만 대문자로 연속 나열
      return getRandomAlphabet();

    default:
      throw new Error(`Unknown game mode: ${mode}`);
  }
}

/**
 * 패턴 요소를 표시용 문자열로 변환
 */
export function patternElementToString(element: PatternElement): string {
  return String(element);
}
