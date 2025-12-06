# 반응형 레이아웃 전체 리팩토링 패치

## 변경 요약
- 모든 정적 px 값을 vh/vw/% 기반으로 변경
- GameScreen을 상단(점수) / 중간(입력) / 하단(키패드) 구조로 재구성
- 100vh 안에 모든 요소가 스크롤 없이 들어오도록 flex 기반 레이아웃 구현
- 버튼 크기를 vw 기준으로 설정

## 변경 파일 목록
1. src/index.css
2. src/components/GameScreen.tsx
3. src/components/GameScreen.css
4. src/components/ScoreDisplay.css
5. src/components/InputPanel.css
6. src/components/GameDisplay.css
7. src/App.css


