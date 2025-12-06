/**
 * NATO Phonetic Alphabet (공식 표준 - 절대 변형 금지)
 */
export const NATO_ALPHABET: Record<string, string> = {
  A: 'ALPHA',
  B: 'BRAVO',
  C: 'CHARLIE',
  D: 'DELTA',
  E: 'ECHO',
  F: 'FOXTROT',
  G: 'GOLF',
  H: 'HOTEL',
  I: 'INDIA',
  J: 'JULIETT', // 공식 표기: JULIETT (T 2개 필수)
  K: 'KILO',
  L: 'LIMA',
  M: 'MIKE',
  N: 'NOVEMBER',
  O: 'OSCAR',
  P: 'PAPA',
  Q: 'QUEBEC',
  R: 'ROMEO',
  S: 'SIERRA',
  T: 'TANGO',
  U: 'UNIFORM',
  V: 'VICTOR',
  W: 'WHISKEY',
  X: 'X-RAY',
  Y: 'YANKEE',
  Z: 'ZULU',
};

/**
 * 알파벳 A-Z 배열
 */
export const ALPHABETS = Object.keys(NATO_ALPHABET) as string[];

/**
 * 숫자 0-9 배열
 */
export const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * 모드 2에서 사용하는 색상 (6개만 사용)
 */
export const COLORS = ['빨강', '노랑', '파랑', '초록', '보라', '흰색'] as const;

export type Color = typeof COLORS[number];

