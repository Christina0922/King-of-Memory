# Flex 기반 자동 비율 레이아웃 리팩토링 - 전체 Diff

## 개요
전체 레이아웃을 vh 기반 고정 비율에서 flex 기반 자동 비율로 재구성했습니다. 모든 페이지가 화면 크기에 따라 자동으로 조정되며, 콘텐츠가 길어지면 정상적으로 스크롤 가능합니다.

---

## 1. src/index.css

### 변경사항
- `html`, `body`: `height: 100%` + `overflow: hidden` → `height: auto` + `min-height: 100vh` + `overflow-y: auto`
- `#root`: `height: 100%` + `overflow: hidden` → `min-height: 100vh` (overflow 제거)

```diff
 html {
   margin: 0;
   padding: 0;
-  height: 100%;
-  overflow: hidden;
+  height: auto;
+  min-height: 100vh;
+  overflow-y: auto;
 }

 body {
   margin: 0;
   padding: 0;
-  height: 100%;
-  overflow: hidden;
+  height: auto;
+  min-height: 100vh;
+  overflow-y: auto;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
     sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   background: #f5f5f5;
   color: #333;
 }

 #root {
-  height: 100%;
+  min-height: 100vh;
   display: flex;
   flex-direction: column;
-  overflow: hidden;
 }
```

---

## 2. src/App.css

### 변경사항
- `.app`: `height: 100vh` + `overflow: hidden` → `min-height: 100vh` + `display: flex`

```diff
 .app {
-  height: 100vh;
+  min-height: 100vh;
   width: 100%;
+  display: flex;
+  flex-direction: column;
-  overflow: hidden;
 }
```

---

## 3. src/components/GameScreen.css

### 변경사항

#### 3.1. `.game-screen`
- `height: 100vh` → `min-height: 100vh`
- `overflow: hidden` 제거

```diff
 .game-screen {
-  height: 100vh;
+  min-height: 100vh;
   display: flex;
   flex-direction: column;
   background: #f5f5f5;
-  overflow: hidden;
 }
```

#### 3.2. `.game-header`
- 고정 `min-height: 6vh`, `max-height: 6vh` 제거
- `padding`을 `rem` 단위로 변경

```diff
 .game-header {
   flex: 0 0 auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
-  padding: 1.5vh 2vw;
+  padding: 1rem 1.5rem;
   background: white;
-  box-shadow: 0 0.2vh 0.4vh rgba(0, 0, 0, 0.1);
-  min-height: 6vh;
-  max-height: 6vh;
+  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }
```

#### 3.3. `.back-button`
- `padding`, `border-radius`를 `rem` 단위로 변경
- `min-width: 15vw` 제거

```diff
 .back-button {
   background: transparent;
   color: #4a90e2;
   font-size: clamp(0.875rem, 2vw, 1rem);
   font-weight: 600;
-  padding: 1vh 2vw;
-  border-radius: 0.6vh;
+  padding: 0.5rem 1rem;
+  border-radius: 0.5rem;
   transition: background 0.2s;
-  min-width: 15vw;
 }
```

#### 3.4. `.header-spacer`
- `width: 15vw` → `width: 80px` (고정값)

```diff
 .header-spacer {
-  width: 15vw;
+  width: 80px;
   flex-shrink: 0;
 }
```

#### 3.5. `.game-content`
- `overflow: hidden` 제거

```diff
 .game-content {
   flex: 1;
   display: flex;
   flex-direction: column;
   min-height: 0;
-  overflow: hidden;
 }
```

#### 3.6. `.top-section`
- 고정 `flex: 0 0 12vh`, `min-height: 12vh`, `max-height: 12vh` 제거
- `flex: 0 1 auto`로 변경하여 자동 비율 적용
- `padding`을 `rem` 단위로 변경
- `overflow: hidden` 제거

```diff
 /* 상단: 점수 영역 - flex-grow로 자동 비율 */
 .top-section {
-  flex: 0 0 12vh;
-  min-height: 12vh;
-  max-height: 12vh;
+  flex: 0 1 auto;
   display: flex;
   flex-direction: column;
-  padding: 1vh 2vw;
-  overflow: hidden;
+  padding: 1rem 1.5rem;
 }
```

#### 3.7. `.middle-section`
- `padding`을 `rem` 단위로 변경

```diff
 /* 중간: 게임 디스플레이 및 컨트롤 - flex-grow로 자동 비율 */
 .middle-section {
   flex: 1 1 auto;
   display: flex;
   flex-direction: column;
   min-height: 0;
-  padding: 1vh 2vw;
+  padding: 1rem 1.5rem;
   overflow-y: auto;
 }
```

#### 3.8. `.bottom-section`
- 고정 `max-height: calc(100vh - 6vh - 12vh - 2vh)` 제거
- `flex: 0 0 auto` → `flex: 0 1 auto`로 변경
- `padding`을 `rem` 단위로 변경
- `overflow: hidden`, `min-height: 0` 제거

```diff
 /* 하단: 입력 패널 (키패드) - 내용에 맞게 자동 조정 */
 .bottom-section {
-  flex: 0 0 auto;
-  min-height: 0;
-  padding: 1vh 2vw;
-  overflow: hidden;
-  max-height: calc(100vh - 6vh - 12vh - 2vh); /* 헤더 - 점수 - 여백 */
+  flex: 0 1 auto;
+  padding: 1rem 1.5rem;
 }
```

#### 3.9. `.game-controls`
- `gap`, `padding`을 `rem` 단위로 변경

```diff
 .game-controls {
   display: flex;
   justify-content: center;
-  gap: 2vw;
-  padding: 1vh 0;
+  gap: 1rem;
+  padding: 1rem 0;
 }
```

#### 3.10. `.start-button`, `.reset-button`
- `padding`, `border-radius`를 `rem` 단위로 변경
- `min-width: 25vw` 제거

```diff
 .start-button,
 .reset-button {
-  padding: 1.5vh 4vw;
+  padding: 0.75rem 2rem;
   font-size: clamp(0.875rem, 2.5vw, 1.2rem);
   font-weight: 600;
-  border-radius: 1vh;
+  border-radius: 0.5rem;
   transition: all 0.2s;
-  min-width: 25vw;
 }
```

#### 3.11. `.new-record-message`
- `padding`, `border-radius`, `margin`을 `rem` 단위로 변경
- `box-shadow` 값을 `px` 단위로 변경

```diff
 .new-record-message {
   text-align: center;
-  padding: 1.5vh 4vw;
+  padding: 0.75rem 2rem;
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   color: white;
-  border-radius: 1vh;
+  border-radius: 0.5rem;
   font-size: clamp(0.875rem, 2.5vw, 1.2rem);
   font-weight: 700;
   animation: slideIn 0.3s ease-out;
-  box-shadow: 0 0.4vh 1.2vh rgba(102, 126, 234, 0.4);
-  margin: 1vh 0;
+  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
+  margin: 0.5rem 0;
 }
```

#### 3.12. `@keyframes slideIn`
- `translateY(-2vh)` → `translateY(-1rem)`

```diff
 @keyframes slideIn {
   from {
     opacity: 0;
-    transform: translateY(-2vh);
+    transform: translateY(-1rem);
   }
   to {
     opacity: 1;
     transform: translateY(0);
   }
 }
```

#### 3.13. `.container` (호환성)
- 전체 클래스 제거

```diff
-/* 컨테이너 레이아웃 (호환성) */
-.container {
-  display: flex;
-  flex-direction: column;
-  height: 100vh;
-}
```

---

## 4. src/components/InputPanel.css

### 변경사항

#### 4.1. `.input-panel`
- `gap`, `padding`, `border-radius`를 `rem` 단위로 변경
- `flex: 0 0 auto`, `max-height: 100%`, `overflow-y: auto` 제거
- `box-shadow` 값을 `px` 단위로 변경

```diff
 .input-panel {
   display: flex;
   flex-direction: column;
-  gap: 1vh;
-  padding: 1vh 2vw;
+  gap: 1rem;
+  padding: 1rem 1.5rem;
   background: white;
-  border-radius: 1.2vh;
-  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
-  flex: 0 0 auto;
-  max-height: 100%;
-  overflow-y: auto;
+  border-radius: 0.75rem;
+  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 }
```

#### 4.2. `.input-box`
- `padding`, `gap`, `border-radius`를 `rem` 단위로 변경
- `overflow: hidden` 제거
- `box-shadow` 값을 `px` 단위로 변경

```diff
 .input-box {
   height: auto;
-  padding: 1vh 2vw;
+  padding: 1rem 1.5rem;
   display: flex;
   flex-direction: column;
-  gap: 1vh;
+  gap: 1rem;
   background: white;
-  border-radius: 1.2vh;
-  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
-  overflow: hidden;
+  border-radius: 0.75rem;
+  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 }
```

#### 4.3. `.input-section`
- `gap`을 `rem` 단위로 변경

```diff
 .input-section {
   display: flex;
   flex-direction: column;
-  gap: 1vh;
+  gap: 0.75rem;
   flex: 0 0 auto;
 }
```

#### 4.4. `.button-row`
- `gap`, `padding`을 `rem` 단위로 변경

```diff
 .button-row {
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
-  gap: 1.5vw;
-  padding: 0.5vh 0;
+  gap: 0.5rem;
+  padding: 0.5rem 0;
 }
```

#### 4.5. `.number-grid`, `.alphabet-grid`, `.nato-grid`, `.color-grid`
- `gap`을 `rem` 단위로 변경

```diff
 .number-grid {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
-  gap: 1vw;
+  gap: 0.5rem;
 }

 .alphabet-grid {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
-  gap: 1vw;
+  gap: 0.5rem;
 }

 .nato-grid {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
-  gap: 1vw;
+  gap: 0.5rem;
 }

 .color-grid {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
-  gap: 1.5vw;
+  gap: 0.75rem;
 }
```

#### 4.6. `.num-btn`, `.alpha-btn`, `.number-button`, `.alphabet-button`
- 고정 `width: 11vw`, `height: 11vw` 제거
- `flex: 1 1 auto` + `min-width`, `max-width` + `aspect-ratio: 1`로 변경
- `margin`, `border-radius`를 `rem` 단위로 변경
- `min-width: 45px`, `min-height: 45px`, `max-width: 65px`, `max-height: 65px` 제거

```diff
 .num-btn {
-  width: 11vw;
-  height: 11vw;
-  min-width: 45px;
-  min-height: 45px;
-  max-width: 65px;
-  max-height: 65px;
-  margin: 0;
+  flex: 1 1 auto;
+  min-width: 2.5rem;
+  max-width: 4rem;
+  aspect-ratio: 1;
+  margin: 0.25rem;
   font-size: clamp(0.875rem, 4vw, 1.125rem);
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   background: #4a90e2;
   color: white;
-  border-radius: 1vh;
+  border-radius: 0.5rem;
   transition: all 0.2s;
 }
```

#### 4.7. `.nato-button`
- `padding`을 `rem` 단위로 변경
- `min-width: 20vw` → `min-width: 8rem`
- `border-radius`를 `rem` 단위로 변경

```diff
 .nato-button {
   background: #50c878;
   color: white;
   font-size: clamp(0.75rem, 3vw, 0.9rem);
-  padding: 1.5vh 2vw;
+  padding: 0.75rem 1rem;
+  border-radius: 0.5rem;
-  width: auto;
-  min-width: 20vw;
+  min-width: 8rem;
 }
```

#### 4.8. `.color-button`
- 고정 `width: 25vw`, `height: 8vh` 제거
- `min-width`, `min-height`, `max-width`, `max-height`를 `rem` 단위로 변경
- `padding` 추가
- `border-radius`를 `rem` 단위로 변경
- `text-shadow` 값을 `px` 단위로 변경

```diff
 .color-button {
   color: white;
   font-weight: 600;
-  text-shadow: 0 0.1vh 0.2vh rgba(0, 0, 0, 0.3);
-  width: 25vw;
-  height: 8vh;
-  min-width: 80px;
-  min-height: 50px;
-  max-width: 120px;
-  max-height: 80px;
+  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
+  min-width: 5rem;
+  min-height: 3rem;
+  max-width: 7.5rem;
+  max-height: 5rem;
+  padding: 0.75rem 1rem;
+  border-radius: 0.5rem;
 }
```

#### 4.9. `.color-흰색`
- `border` 값을 `rem` 단위로 변경

```diff
 .color-흰색 {
   background: #ecf0f1;
   color: #333;
   text-shadow: none;
-  border: 0.2vh solid #bdc3c7;
+  border: 1px solid #bdc3c7;
 }
```

---

## 5. src/components/GameDisplay.css

### 변경사항

#### 5.1. `.game-display`
- `gap`, `padding`을 `rem` 단위로 변경

```diff
 .game-display {
   display: flex;
   flex-direction: column;
-  gap: 1vh;
+  gap: 1rem;
   align-items: center;
-  padding: 1vh 2vw;
+  padding: 1rem 1.5rem;
   flex: 0 0 auto;
 }
```

#### 5.2. `.display-area`
- 고정 `min-height: 15vh`, `max-height: 25vh` 제거
- `min-height: 8rem`으로 변경
- `max-width`를 `%` 단위로 변경
- `padding`, `border-radius`를 `rem` 단위로 변경
- `box-shadow` 값을 `px` 단위로 변경

```diff
 .display-area {
   width: 100%;
-  max-width: 90vw;
-  min-height: 15vh;
-  max-height: 25vh;
+  max-width: 90%;
   min-height: 8rem;
   display: flex;
   align-items: center;
   justify-content: center;
   background: white;
-  border-radius: 1.2vh;
-  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
-  padding: 2vh;
+  border-radius: 0.75rem;
+  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
+  padding: 1.5rem;
 }
```

#### 5.3. `.showing-element`
- `gap`을 `rem` 단위로 변경

```diff
 .showing-element {
   display: flex;
   flex-direction: column;
   align-items: center;
-  gap: 1vh;
+  gap: 0.75rem;
   animation: fadeIn 0.3s ease-in;
 }
```

#### 5.4. `.mode-1-pair`
- `gap`을 `rem` 단위로 변경

```diff
 .mode-1-pair {
   display: flex;
   align-items: center;
   justify-content: center;
-  gap: 2vw;
+  gap: 1rem;
   flex-wrap: nowrap;
   white-space: nowrap;
   overflow: hidden;
 }
```

#### 5.5. `.empty-display`
- `min-height: 15vh` → `min-height: 8rem`

```diff
 .empty-display {
   display: flex;
   align-items: center;
   justify-content: center;
-  min-height: 15vh;
+  min-height: 8rem;
 }
```

#### 5.6. `.result-message`
- `padding`, `border-radius`를 `rem` 단위로 변경

```diff
 .result-message {
   font-size: clamp(1.2rem, 4vw, 2rem);
   font-weight: 700;
-  padding: 1.5vh 4vw;
-  border-radius: 1vh;
+  padding: 0.75rem 2rem;
+  border-radius: 0.5rem;
   animation: fadeIn 0.3s ease-in;
 }
```

#### 5.7. `.user-input-display`
- `max-width`를 `%` 단위로 변경
- `padding`, `border-radius`를 `rem` 단위로 변경
- `box-shadow` 값을 `px` 단위로 변경

```diff
 .user-input-display {
   width: 100%;
-  max-width: 90vw;
+  max-width: 90%;
   background: white;
-  border-radius: 1.2vh;
-  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
-  padding: 2vh;
+  border-radius: 0.75rem;
+  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
+  padding: 1.5rem;
 }
```

#### 5.8. `.input-label`
- `margin-bottom`을 `rem` 단위로 변경

```diff
 .input-label {
   font-size: clamp(0.875rem, 2.5vw, 1rem);
   font-weight: 600;
   color: #666;
-  margin-bottom: 1vh;
+  margin-bottom: 0.75rem;
 }
```

#### 5.9. `.input-sequence`
- `gap`을 `rem` 단위로 변경

```diff
 .input-sequence {
   display: flex;
   flex-wrap: wrap;
-  gap: 1vw;
+  gap: 0.5rem;
   align-items: center;
 }
```

#### 5.10. `.input-item`
- `padding`, `border-radius`, `min-width`를 `rem` 단위로 변경

```diff
 .input-item {
   font-size: clamp(1rem, 3vw, 1.5rem);
   font-weight: 600;
   color: #333;
-  padding: 1vh 2vw;
+  padding: 0.5rem 1rem;
   background: #f0f0f0;
-  border-radius: 0.8vh;
-  min-width: 8vw;
+  border-radius: 0.5rem;
+  min-width: 3rem;
   text-align: center;
 }
```

#### 5.11. `.color-block`
- `padding`, `border-radius`, `min-width`를 `rem` 단위로 변경
- `text-shadow` 값을 `px` 단위로 변경

```diff
 .color-block {
   font-size: clamp(1.5rem, 5vw, 2rem);
   font-weight: 700;
-  padding: 3vh 6vw;
-  border-radius: 1.2vh;
-  min-width: 30vw;
+  padding: 1.5rem 3rem;
+  border-radius: 0.75rem;
+  min-width: 12rem;
   text-align: center;
   color: white;
-  text-shadow: 0 0.2vh 0.4vh rgba(0, 0, 0, 0.3);
+  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
   animation: fadeIn 0.3s ease-in, pulse 0.8s ease-in-out;
 }
```

#### 5.12. `.color-white`
- `border` 값을 `px` 단위로 변경

```diff
 .color-white {
   background: #ecf0f1;
   color: #333;
   text-shadow: none;
-  border: 0.3vh solid #bdc3c7;
+  border: 2px solid #bdc3c7;
 }
```

---

## 6. src/components/ScoreDisplay.css

### 변경사항

#### 6.1. `.score-display`
- `height: 100%`, `overflow: hidden` 제거
- `gap`, `padding`, `border-radius`를 `rem` 단위로 변경
- `box-shadow` 값을 `px` 단위로 변경

```diff
 .score-display {
   display: flex;
   flex-direction: column;
-  gap: 1vh;
-  padding: 1vh 2vw;
+  gap: 1rem;
+  padding: 1rem;
   background: white;
-  border-radius: 1.2vh;
-  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
-  height: 100%;
-  overflow: hidden;
 }
```

#### 6.2. `.score-box`
- `padding`, `gap`, `border-radius`를 `rem` 단위로 변경
- `height: 100%`, `overflow: hidden` 제거
- `box-shadow` 값을 `px` 단위로 변경

```diff
 .score-box {
-  padding: 1vh 2vw;
-  height: 100%;
+  padding: 1rem;
   display: flex;
   flex-direction: column;
-  gap: 1vh;
+  gap: 1rem;
   background: white;
-  border-radius: 1.2vh;
-  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
-  overflow: hidden;
+  border-radius: 0.75rem;
+  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
 }
```

#### 6.3. `.score-section`
- `gap`, `padding-bottom`, `border-bottom`를 `rem`/`px` 단위로 변경

```diff
 .score-section {
   display: flex;
   flex-direction: column;
   align-items: center;
-  gap: 0.5vh;
-  padding-bottom: 1vh;
-  border-bottom: 0.2vh solid #e0e0e0;
+  gap: 0.5rem;
+  padding-bottom: 0.75rem;
+  border-bottom: 1px solid #e0e0e0;
 }
```

#### 6.4. `.record-section`
- `gap`을 `rem` 단위로 변경

```diff
 .record-section {
   display: flex;
   justify-content: space-around;
-  gap: 2vw;
+  gap: 1rem;
   flex: 1;
 }
```

#### 6.5. `.record-item`
- `gap`을 `rem` 단위로 변경

```diff
 .record-item {
   display: flex;
   flex-direction: column;
   align-items: center;
-  gap: 0.5vh;
+  gap: 0.5rem;
   flex: 1;
 }
```

---

## 7. src/components/RecordsScreen.css

### 변경사항 없음
이 파일은 이미 `min-height: 100vh`를 사용하고 있으며, flex 기반 레이아웃과 세로 스크롤이 정상적으로 작동하고 있어 변경하지 않았습니다.

---

## 요약

### 제거된 고정값 (vh 기반)
1. `html`, `body`: `height: 100%`, `overflow: hidden`
2. `.game-screen`: `height: 100vh`
3. `.top-section`: `flex: 0 0 12vh`, `min-height: 12vh`, `max-height: 12vh`
4. `.bottom-section`: `max-height: calc(100vh - 6vh - 12vh - 2vh)`
5. `.num-btn`, `.alpha-btn`: 고정 `width: 11vw`, `height: 11vw`
6. `.display-area`: 고정 `min-height: 15vh`, `max-height: 25vh`
7. 기타 vh/vw 기반 고정값들

### 추가된 flex 기반 자동 비율
1. `html`, `body`: `height: auto`, `min-height: 100vh`, `overflow-y: auto`
2. `.top-section`: `flex: 0 1 auto` (자동 비율)
3. `.middle-section`: `flex: 1 1 auto` (남은 공간 자동 할당)
4. `.bottom-section`: `flex: 0 1 auto` (내용에 맞게 자동 조정)
5. `.num-btn`, `.alpha-btn`: `flex: 1 1 auto` + `aspect-ratio: 1` (부모 크기에 따라 자연스럽게)

### 변경된 단위
- `vh` → `rem` 또는 `min-height: 100vh` (최소 높이만)
- `vw` → `rem` 또는 `%` (반응형 폰트는 `clamp()` 유지)
- 고정 `px` → `rem` (일관성 유지)

### 컴포넌트 구조 변경
- **GameScreen**: `top-section`, `middle-section`, `bottom-section`을 flex-grow로 자동 비율 배치
- **InputPanel**: 버튼 컨테이너를 `width: 100%`로 통일, `flex: 1 1 auto`로 자연스러운 크기 조정
- **RecordsScreen**: 변경 없음 (이미 적절히 구성됨)

---

## 테스트 권장사항

1. 다양한 화면 크기에서 테스트 (스마트폰, 태블릿, 데스크톱)
2. 콘텐츠가 긴 경우 세로 스크롤이 정상 작동하는지 확인
3. 버튼들이 부모 컨테이너에서 자연스럽게 크기 조정되는지 확인
4. 모든 영역이 화면에 잘리지 않고 표시되는지 확인


