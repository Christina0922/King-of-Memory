# 요구사항 체크리스트

## 문제 1: 숫자→알파벳 게임에서 두 개씩 생성되는 로직 오류 수정

### 요구사항:
1) generateNumber(), generateAlphabet()가 한 턴에 두 번 이상 호출되지 않도록 중복 호출 원인을 제거하고,
2) 문제 생성은 반드시 generateProblem() 같은 단일 함수에서만 제어하도록 구조를 정리하며,
3) currentType(또는 lastType) 상태가 비동기로 꼬이지 않도록 상태 업데이트를 한 번만 수행하게 만들고,
4) 버튼 클릭/정답 제출 시 generateProblem()만 호출되도록 이벤트 로직도 정리해줘.
5) JSX가 두 개의 문제를 동시에 렌더링하지 않도록 조건문도 점검해줘.

### 현재 상태 체크:

#### ❌ 1) generateProblem() 같은 단일 함수로 문제 생성 제어
- **현재**: `generateNewElement()`가 3곳에서 직접 호출됨:
  - `startGame()` (라인 109)
  - `handleInput()` 정답 처리 (라인 178)
  - `handleInput()` 오답 처리 (라인 201)
- **필요**: 단일 `generateProblem()` 함수로 통합

#### ❌ 2) 중복 호출 방지
- **현재**: 중복 호출 방지 로직 없음
- **필요**: 플래그나 상태로 중복 호출 방지

#### ❌ 3) 상태 업데이트 한 번만
- **현재**: 여러 `setState` 호출이 분산되어 있음
- **필요**: 배치 처리 또는 단일 상태 업데이트

#### ❌ 4) 버튼 클릭/정답 제출 시 generateProblem()만 호출
- **현재**: `handleInput()` 내부에서 직접 `generateNewElement()` 호출
- **필요**: `generateProblem()` 함수로 통합

#### ✅ 5) JSX가 두 개의 문제를 동시에 렌더링하지 않도록
- **완료**: GameDisplay.tsx에서 `showingIndex` 하나만 표시

---

## 문제 2: 기록보기 페이지 하단 카드 잘림 문제 해결

### 요구사항:
1) html, body의 height:100vh, overflow:hidden 같은 전역 고정 레이아웃 설정이 있다면 제거하고, min-height:100vh, overflow-y:auto로 변경
2) 기록 페이지의 루트 컨테이너(예: .record-page)가 화면 높이에 제한받지 않도록 height:auto로 설정하고, 내부 콘텐츠가 길면 자동으로 아래까지 스크롤되도록 overflow-y:auto를 적용
3) 필요하다면 기록 카드들을 감싸는 wrapper에도 margin/padding 문제를 조정해 화면 하단이 잘리지 않도록 전체 레이아웃을 정리

### 현재 상태 체크:

#### ✅ 1) html, body 전역 레이아웃
- **완료**: `src/index.css`에서 `height: auto`, `min-height: 100vh`, `overflow-y: auto` 설정됨

#### ✅ 2) 기록 페이지 스크롤
- **완료**: `src/components/RecordsScreen.css`에서:
  - `.records-content`에 `overflow-y: auto` 적용
  - `min-height: 0` 설정
  - `padding-bottom: 4rem` 추가

#### ✅ 3) 하단 여백 및 레이아웃
- **완료**: 
  - `.record-info`에 `margin-bottom: 2rem` 추가
  - `.records-header`에 `flex: 0 0 auto` 추가

---

## 요약

### 문제 1: ❌ 미완료 (5개 중 1개만 완료)
- 단일 함수 통합 필요
- 중복 호출 방지 필요
- 상태 업데이트 최적화 필요

### 문제 2: ✅ 완료 (3개 모두 완료)


