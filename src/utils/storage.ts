import { Record, RankingItem, RankingType } from '../types/game';

const STORAGE_KEYS = {
  RECORD: 'king_of_memory_record',
  RANKING_DAILY: 'king_of_memory_ranking_daily',
  RANKING_WEEKLY: 'king_of_memory_ranking_weekly',
  RANKING_MONTHLY: 'king_of_memory_ranking_monthly',
  USER_NICKNAME: 'king_of_memory_nickname',
  USER_COUNTRY: 'king_of_memory_country',
} as const;

/**
 * 기록 저장/로드
 */
export function saveRecord(record: Record): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RECORD, JSON.stringify(record));
  } catch (error) {
    console.error('Failed to save record:', error);
  }
}

export function loadRecord(): Record {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECORD);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load record:', error);
  }
  return { today: 0, weekly: 0, allTime: 0 };
}

/**
 * 기록 업데이트
 */
export function updateRecord(score: number): Record {
  const record = loadRecord();

  // 오늘 최고 기록
  const todayRecord = loadTodayRecord();
  if (score > todayRecord) {
    record.today = score;
    saveTodayRecord(score);
  }

  // 주간 최고 기록
  if (score > record.weekly) {
    record.weekly = score;
  }

  // 전체 최고 기록
  if (score > record.allTime) {
    record.allTime = score;
  }

  saveRecord(record);
  return record;
}

/**
 * 오늘 기록 저장/로드
 */
function saveTodayRecord(score: number): void {
  try {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    localStorage.setItem(`${STORAGE_KEYS.RECORD}_today_${todayKey}`, String(score));
  } catch (error) {
    console.error('Failed to save today record:', error);
  }
}

function loadTodayRecord(): number {
  try {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const data = localStorage.getItem(`${STORAGE_KEYS.RECORD}_today_${todayKey}`);
    return data ? parseInt(data, 10) : 0;
  } catch (error) {
    console.error('Failed to load today record:', error);
    return 0;
  }
}

/**
 * 랭킹 저장/로드
 */
export function saveRanking(type: RankingType, items: RankingItem[]): void {
  try {
    const key = STORAGE_KEYS[`RANKING_${type.toUpperCase()}` as keyof typeof STORAGE_KEYS];
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Failed to save ${type} ranking:`, error);
  }
}

export function loadRanking(type: RankingType): RankingItem[] {
  try {
    const key = STORAGE_KEYS[`RANKING_${type.toUpperCase()}` as keyof typeof STORAGE_KEYS];
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Failed to load ${type} ranking:`, error);
  }
  return [];
}

/**
 * 랭킹에 점수 추가
 */
export function addToRanking(
  type: RankingType,
  item: RankingItem
): RankingItem[] {
  const ranking = loadRanking(type);
  ranking.push(item);

  // 정렬: 점수 높은 순, 동점이면 시간 짧은 순
  ranking.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.time - b.time;
  });

  // 상위 100개만 유지
  const top100 = ranking.slice(0, 100);
  saveRanking(type, top100);
  return top100;
}

/**
 * 랭킹 필터링 (일간/주간/월간)
 */
export function getFilteredRanking(type: RankingType): RankingItem[] {
  const ranking = loadRanking(type);
  const now = Date.now();

  return ranking.filter((item) => {
    const itemDate = new Date(item.timestamp);
    const nowDate = new Date(now);

    switch (type) {
      case 'daily':
        return (
          itemDate.getFullYear() === nowDate.getFullYear() &&
          itemDate.getMonth() === nowDate.getMonth() &&
          itemDate.getDate() === nowDate.getDate()
        );
      case 'weekly':
        const weekStart = new Date(nowDate);
        weekStart.setDate(nowDate.getDate() - nowDate.getDay());
        weekStart.setHours(0, 0, 0, 0);
        return item.timestamp >= weekStart.getTime();
      case 'monthly':
        return (
          itemDate.getFullYear() === nowDate.getFullYear() &&
          itemDate.getMonth() === nowDate.getMonth()
        );
      default:
        return true;
    }
  });
}

/**
 * 사용자 정보 저장/로드
 */
export function saveUserInfo(nickname: string, countryCode: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_NICKNAME, nickname);
    localStorage.setItem(STORAGE_KEYS.USER_COUNTRY, countryCode);
    // playerName 키도 함께 저장 (호환성)
    localStorage.setItem('playerName', nickname);
  } catch (error) {
    console.error('Failed to save user info:', error);
  }
}

export function loadUserInfo(): { nickname: string; countryCode: string } {
  try {
    // playerName을 우선 확인, 없으면 기존 키 확인
    const playerName = localStorage.getItem('playerName');
    const oldNickname = localStorage.getItem(STORAGE_KEYS.USER_NICKNAME);
    const nickname = playerName || oldNickname || 'Player';
    const countryCode = localStorage.getItem(STORAGE_KEYS.USER_COUNTRY) || 'KR';
    return { nickname, countryCode };
  } catch (error) {
    console.error('Failed to load user info:', error);
    return { nickname: 'Player', countryCode: 'KR' };
  }
}

/**
 * 닉네임만 저장 (playerName 키 사용)
 */
export function savePlayerName(nickname: string): void {
  try {
    localStorage.setItem('playerName', nickname);
    // 기존 키와도 동기화
    localStorage.setItem(STORAGE_KEYS.USER_NICKNAME, nickname);
  } catch (error) {
    console.error('Failed to save player name:', error);
  }
}

/**
 * 닉네임만 로드 (playerName 키 우선)
 */
export function loadPlayerName(): string {
  try {
    const playerName = localStorage.getItem('playerName');
    const oldNickname = localStorage.getItem(STORAGE_KEYS.USER_NICKNAME);
    return playerName || oldNickname || 'Player';
  } catch (error) {
    console.error('Failed to load player name:', error);
    return 'Player';
  }
}

