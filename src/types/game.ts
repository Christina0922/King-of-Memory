import { Color } from '../constants/nato';

/**
 * 게임 모드 타입
 */
export type GameMode = 1 | 2 | 3 | 4;

/**
 * 패턴 요소 타입
 */
export type PatternElement = string | Color;

/**
 * 게임 상태
 */
export type GameState = 'idle' | 'showing' | 'input' | 'result';

/**
 * 게임 결과
 */
export type GameResult = 'correct' | 'wrong';

/**
 * 모드별 패턴 타입
 */
export type Pattern = PatternElement[];

/**
 * 기록 정보
 */
export interface Record {
  today: number;
  weekly: number;
  allTime: number;
}

/**
 * 랭킹 항목
 */
export interface RankingItem {
  countryCode: string;
  nickname: string;
  score: number;
  time: number; // 도달 시간 (밀리초)
  timestamp: number; // 기록 생성 시간
}

/**
 * 랭킹 타입
 */
export type RankingType = 'daily' | 'weekly' | 'monthly';

