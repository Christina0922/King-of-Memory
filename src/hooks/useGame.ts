import { useState, useCallback, useRef, useEffect } from 'react';
import { GameMode, Pattern, PatternElement } from '../types/game';
import { generateNewElement } from '../utils/gameLogic';
import { updateRecord, loadRecord, addToRanking, loadUserInfo } from '../utils/storage';

interface UseGameReturn {
  pattern: Pattern;
  currentLength: number;
  isPlayingPattern: boolean;
  isAwaitingInput: boolean;
  inputIndex: number;
  currentScore: number;
  todayBest: number;
  weeklyBest: number;
  allTimeBest: number;
  showingIndex: number;
  result: 'correct' | 'wrong' | null;
  newRecordMessage: string | null;
  startGame: () => void;
  handleInput: (element: PatternElement) => void;
  resetGame: () => void;
}

const SHOW_DURATION = 800; // 각 요소 표시 시간 (밀리초)
const HIDE_DURATION = 300; // 요소 사라지는 시간 (밀리초)

export function useGame(mode: GameMode): UseGameReturn {
  const [pattern, setPattern] = useState<Pattern>([]);
  const [currentLength, setCurrentLength] = useState(1);
  const [isPlayingPattern, setIsPlayingPattern] = useState(false);
  const [isAwaitingInput, setIsAwaitingInput] = useState(false);
  const [inputIndex, setInputIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [todayBest, setTodayBest] = useState(0);
  const [weeklyBest, setWeeklyBest] = useState(0);
  const [allTimeBest, setAllTimeBest] = useState(0);
  const [showingIndex, setShowingIndex] = useState(-1);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [newRecordMessage, setNewRecordMessage] = useState<string | null>(null);
  const timeoutRefs = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const currentLengthRef = useRef<number>(1);
  const isGeneratingRef = useRef<boolean>(false); // 중복 호출 방지용

  // 기록 로드
  useEffect(() => {
    const record = loadRecord();
    setTodayBest(record.today);
    setWeeklyBest(record.weekly);
    setAllTimeBest(record.allTime);
  }, []);

  /**
   * 문제 생성 단일 함수 (요구사항 1, 2, 3)
   * - 중복 호출 방지 (isGeneratingRef)
   * - 상태 업데이트 한 번만 수행
   */
  const generateProblem = useCallback(
    (targetIndex: number, resetPattern: boolean = false) => {
      // 중복 호출 방지 (요구사항 2)
      if (isGeneratingRef.current) {
        return;
      }

      isGeneratingRef.current = true;

      // 새 요소 생성 및 패턴 업데이트 (상태 업데이트 한 번만 수행 - 요구사항 3)
      const newElement = generateNewElement(mode, targetIndex);

      if (resetPattern) {
        // 패턴을 완전히 새로 생성 (오답 시)
        setPattern([newElement]);
        setCurrentLength(1);
        currentLengthRef.current = 1;
      } else {
        // 패턴에 새 요소 추가 (정답 시)
        setPattern((prev) => [...prev, newElement]);
        const newLength = currentLengthRef.current + 1;
        setCurrentLength(newLength);
        currentLengthRef.current = newLength;
      }

      // 생성 완료 후 플래그 해제
      setTimeout(() => {
        isGeneratingRef.current = false;
      }, 0);
    },
    [mode]
  );

  /**
   * 패턴 재생 함수
   */
  const playPattern = useCallback(() => {
    // 기존 타이머 정리
    timeoutRefs.current.forEach((timer) => window.clearTimeout(timer));
    timeoutRefs.current = [];

    setIsPlayingPattern(true);
    setIsAwaitingInput(false);
    setShowingIndex(0);
    setResult(null);

    const length = currentLengthRef.current;
    let index = 0;
    const showNext = () => {
      if (index < length) {
        setShowingIndex(index);
        index++;

        const hideTimer = window.setTimeout(() => {
          setShowingIndex(-1); // 숨기기
          const nextTimer = window.setTimeout(() => {
            showNext();
          }, HIDE_DURATION);
          timeoutRefs.current.push(nextTimer);
        }, SHOW_DURATION);
        timeoutRefs.current.push(hideTimer);
      } else {
        // 모든 패턴 표시 완료
        setIsPlayingPattern(false);
        setIsAwaitingInput(true);
        setInputIndex(0);
      }
    };

    showNext();
  }, []);

  /**
   * 게임 시작 버튼 동작
   */
  const startGame = useCallback(() => {
    // 기존 타이머 정리
    timeoutRefs.current.forEach((timer) => window.clearTimeout(timer));
    timeoutRefs.current = [];

    setCurrentScore(0);
    setCurrentLength(1);
    currentLengthRef.current = 1;
    setInputIndex(0);
    setResult(null);
    setNewRecordMessage(null);
    startTimeRef.current = Date.now();

    // pattern이 비어있으면 새 요소 1개 생성 (요구사항 4: generateProblem() 사용)
    generateProblem(0, true);

    // 약간의 지연 후 패턴 재생 시작
    const timer = window.setTimeout(() => {
      playPattern();
    }, 500);
    timeoutRefs.current.push(timer);
  }, [mode, playPattern, generateProblem]);

  /**
   * 입력 처리 로직
   */
  const handleInput = useCallback(
    (element: PatternElement) => {
      // isAwaitingInput이 true일 때만 입력 처리
      if (!isAwaitingInput || isPlayingPattern) {
        return;
      }

      // 사용자가 누른 값과 pattern[inputIndex] 비교
      if (element === pattern[inputIndex]) {
        // 정답인 경우
        const nextInputIndex = inputIndex + 1;

        if (nextInputIndex === currentLength) {
          // 이번 라운드를 모두 맞힌 것
          const newScore = currentLength;
          setCurrentScore(newScore);

          // 개인 기록 비교 및 갱신
          const record = updateRecord(newScore);
          setTodayBest(record.today);
          setWeeklyBest(record.weekly);
          setAllTimeBest(record.allTime);

          // 기록 갱신 메시지 표시
          let message = null;
          if (newScore > record.today) {
            message = '오늘 최고 기록 갱신!';
          } else if (newScore > record.weekly) {
            message = '주간 최고 기록 갱신!';
          } else if (newScore > record.allTime) {
            message = '전체 최고 기록 갱신!';
          }
          if (message) {
            setNewRecordMessage(message);
            window.setTimeout(() => setNewRecordMessage(null), 3000);
          }

          // 랭킹에 추가
          const userInfo = loadUserInfo();
          const elapsedTime = Date.now() - startTimeRef.current;
          const rankingItem = {
            countryCode: userInfo.countryCode,
            nickname: userInfo.nickname,
            score: newScore,
            time: elapsedTime,
            timestamp: Date.now(),
          };
          addToRanking('daily', rankingItem);
          addToRanking('weekly', rankingItem);
          addToRanking('monthly', rankingItem);

          // currentLength++로 길이를 1 증가시키고, 새 요소 1개를 생성하여 pattern의 끝에 추가 (요구사항 4: generateProblem() 사용)
          generateProblem(currentLength, false);

          setResult('correct');
          setIsAwaitingInput(false);
          setIsPlayingPattern(true);

          // 약간의 지연 후 playPattern()을 다시 호출
          const timer = window.setTimeout(() => {
            playPattern();
          }, 1000);
          timeoutRefs.current.push(timer);
        } else {
          // 아직 입력 중
          setInputIndex(nextInputIndex);
        }
      } else {
        // 오답인 경우
        setResult('wrong');

        // currentLength = 1로 되돌리고, pattern을 새 요소 1개만 갖도록 재생성 (요구사항 4: generateProblem() 사용)
        generateProblem(0, true);
        setInputIndex(0);

        setIsAwaitingInput(false);
        setIsPlayingPattern(true);

        // 짧은 지연 후 playPattern()을 호출하여 길이 1짜리 새 패턴을 다시 보여줌
        const timer = window.setTimeout(() => {
          playPattern();
        }, 1500);
        timeoutRefs.current.push(timer);
      }
    },
    [isAwaitingInput, isPlayingPattern, inputIndex, pattern, currentLength, mode, currentScore, playPattern, generateProblem]
  );

  /**
   * 게임 리셋
   */
  const resetGame = useCallback(() => {
    // 기존 타이머 정리
    timeoutRefs.current.forEach((timer) => window.clearTimeout(timer));
    timeoutRefs.current = [];

    setPattern([]);
    setCurrentLength(1);
    currentLengthRef.current = 1;
    isGeneratingRef.current = false; // 리셋 시 생성 플래그도 초기화
    setIsPlayingPattern(false);
    setIsAwaitingInput(false);
    setInputIndex(0);
    setCurrentScore(0);
    setShowingIndex(-1);
    setResult(null);
    setNewRecordMessage(null);
  }, []);

  // playPattern이 변경될 때 currentLength를 의존성에 추가
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return {
    pattern,
    currentLength,
    isPlayingPattern,
    isAwaitingInput,
    inputIndex,
    currentScore,
    todayBest,
    weeklyBest,
    allTimeBest,
    showingIndex,
    result,
    newRecordMessage,
    startGame,
    handleInput,
    resetGame,
  };
}
