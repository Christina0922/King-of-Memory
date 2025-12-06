# 전체 반응형 레이아웃 리팩토링 Diff

## 파일 1: src/components/GameScreen.tsx

```diff
--- a/src/components/GameScreen.tsx
+++ b/src/components/GameScreen.tsx
@@ -49,24 +49,37 @@ export const GameScreen: React.FC<GameScreenProps> = ({ mode, onBack }) => {
   return (
     <div className="game-screen">
       <div className="game-header">
         <button className="back-button" onClick={onBack}>
           ← 뒤로
         </button>
         <h1 className="game-title">{getModeName(mode)}</h1>
         <div className="header-spacer"></div>
       </div>
 
       <div className="game-content">
-        <ScoreDisplay
-          currentScore={currentScore}
-          todayBest={todayBest}
-          weeklyBest={weeklyBest}
-          allTimeBest={allTimeBest}
-        />
-
-        <GameDisplay
-          pattern={pattern}
-          showingIndex={showingIndex}
-          result={result}
-          mode={mode}
-          inputIndex={inputIndex}
-        />
-
-        {newRecordMessage && (
-          <div className="new-record-message">{newRecordMessage}</div>
-        )}
-
-        <div className="game-controls">
-          {!isGameActive && pattern.length === 0 && (
-            <button className="start-button" onClick={startGame}>
-              게임 시작
-            </button>
-          )}
-          {isGameActive && (
-            <button className="reset-button" onClick={resetGame} disabled={isPlayingPattern}>
-              게임 리셋
-            </button>
-          )}
-          {!isGameActive && pattern.length > 0 && (
-            <button className="start-button" onClick={startGame}>
-              다시 시작
-            </button>
-          )}
-        </div>
-
-        {isAwaitingInput && (
-          <InputPanel
-            mode={mode}
-            onInput={handleInput}
-            disabled={isPlayingPattern}
-          />
-        )}
+        {/* 상단: 점수 영역 */}
+        <div className="top-section">
+          <ScoreDisplay
+            currentScore={currentScore}
+            todayBest={todayBest}
+            weeklyBest={weeklyBest}
+            allTimeBest={allTimeBest}
+          />
+        </div>
+
+        {/* 중간: 게임 디스플레이 및 컨트롤 */}
+        <div className="middle-section">
+          <GameDisplay
+            pattern={pattern}
+            showingIndex={showingIndex}
+            result={result}
+            mode={mode}
+            inputIndex={inputIndex}
+          />
+
+          {newRecordMessage && (
+            <div className="new-record-message">{newRecordMessage}</div>
+          )}
+
+          <div className="game-controls">
+            {!isGameActive && pattern.length === 0 && (
+              <button className="start-button" onClick={startGame}>
+                게임 시작
+              </button>
+            )}
+            {isGameActive && (
+              <button className="reset-button" onClick={resetGame} disabled={isPlayingPattern}>
+                게임 리셋
+              </button>
+            )}
+            {!isGameActive && pattern.length > 0 && (
+              <button className="start-button" onClick={startGame}>
+                다시 시작
+              </button>
+            )}
+          </div>
+        </div>
+
+        {/* 하단: 입력 패널 (키패드) */}
+        {isAwaitingInput && (
+          <div className="bottom-section">
+            <InputPanel
+              mode={mode}
+              onInput={handleInput}
+              disabled={isPlayingPattern}
+            />
+          </div>
+        )}
       </div>
     </div>
   );
 };
```

## 파일 2: src/components/GameScreen.css

주요 변경사항:
- 모든 px 값을 vh/vw/%로 변경
- 상단/중간/하단 섹션을 vh 기반 고정 높이로 설정
- 반응형 폰트 크기 (clamp 사용)
- flex 기반 레이아웃으로 100vh 안에 맞추기

```diff
--- a/src/components/GameScreen.css
+++ b/src/components/GameScreen.css
@@ -1,164 +1,91 @@
 .game-screen {
   height: 100vh;
   display: flex;
   flex-direction: column;
   background: #f5f5f5;
   overflow: hidden;
 }
 
-/* 컨테이너 레이아웃 */
-.container {
-  display: flex;
-  flex-direction: column;
-  height: 100vh;
-}
-
-.top-section {
-  flex: 0 0 auto;
-}
-
-.middle-section {
-  flex: 0 0 auto;
-}
-
-.bottom-section {
-  flex: 1 1 auto;
-  display: flex;
-  flex-direction: column;
-  justify-content: flex-start;
-  overflow-y: auto;
-}
-
 .game-header {
+  flex: 0 0 auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
-  padding: 1rem 1.5rem;
+  padding: 1.5vh 2vw;
   background: white;
-  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
+  box-shadow: 0 0.2vh 0.4vh rgba(0, 0, 0, 0.1);
+  min-height: 6vh;
 }
 
 .back-button {
   background: transparent;
   color: #4a90e2;
-  font-size: 1rem;
+  font-size: clamp(0.875rem, 2vw, 1rem);
   font-weight: 600;
-  padding: 0.5rem 1rem;
-  border-radius: 6px;
+  padding: 1vh 2vw;
+  border-radius: 0.6vh;
   transition: background 0.2s;
+  min-width: 15vw;
 }
 
 .back-button:hover {
   background: #f0f0f0;
 }
 
 .game-title {
-  font-size: 1.5rem;
+  font-size: clamp(1rem, 3vw, 1.5rem);
   font-weight: 700;
   color: #333;
   margin: 0;
+  text-align: center;
+  flex: 1;
 }
 
 .header-spacer {
-  width: 80px;
+  width: 15vw;
+  flex-shrink: 0;
 }
 
 .game-content {
   flex: 1;
   display: flex;
   flex-direction: column;
+  min-height: 0;
+  overflow: hidden;
+}
+
+/* 상단: 점수 영역 */
+.top-section {
+  flex: 0 0 12vh;
+  min-height: 12vh;
+  max-height: 12vh;
+  padding: 1vh 2vw;
+}
+
+/* 중간: 게임 디스플레이 및 컨트롤 */
+.middle-section {
+  flex: 1 1 auto;
+  display: flex;
+  flex-direction: column;
+  min-height: 0;
+  padding: 1vh 2vw;
+  overflow-y: auto;
+}
+
+/* 하단: 입력 패널 (키패드) */
+.bottom-section {
+  flex: 0 0 auto;
+  min-height: 0;
+  padding: 1vh 2vw;
+  overflow: hidden;
+}
+
+.game-controls {
+  display: flex;
+  justify-content: center;
+  gap: 2vw;
+  padding: 1vh 0;
+}
+
+.start-button,
+.reset-button {
+  padding: 1.5vh 4vw;
+  font-size: clamp(0.875rem, 2.5vw, 1.2rem);
+  font-weight: 600;
+  border-radius: 1vh;
+  transition: all 0.2s;
+  min-width: 25vw;
+}
+
+.start-button {
+  background: #2ecc71;
+  color: white;
+}
+
+.start-button:hover {
+  background: #27ae60;
+  transform: scale(1.05);
+}
+
+.reset-button {
+  background: #e74c3c;
+  color: white;
+}
+
+.reset-button:hover {
+  background: #c0392b;
+  transform: scale(1.05);
+}
+
+.reset-button:disabled {
+  opacity: 0.6;
+  cursor: not-allowed;
+}
+
+.new-record-message {
+  text-align: center;
+  padding: 1.5vh 4vw;
+  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
+  color: white;
+  border-radius: 1vh;
+  font-size: clamp(0.875rem, 2.5vw, 1.2rem);
+  font-weight: 700;
+  animation: slideIn 0.3s ease-out;
+  box-shadow: 0 0.4vh 1.2vh rgba(102, 126, 234, 0.4);
+  margin: 1vh 0;
+}
+
+@keyframes slideIn {
+  from {
+    opacity: 0;
+    transform: translateY(-2vh);
+  }
+  to {
+    opacity: 1;
+    transform: translateY(0);
+  }
+}
+
+/* 컨테이너 레이아웃 (호환성) */
+.container {
+  display: flex;
+  flex-direction: column;
+  height: 100vh;
+}
```

## 파일 3: src/components/ScoreDisplay.css

주요 변경사항:
- 높이: 120px → 100% (부모의 12vh에 맞춤)
- 모든 padding, gap, font-size를 vh/vw/clamp로 변경
- 반응형 폰트 크기 적용

```diff
--- a/src/components/ScoreDisplay.css
+++ b/src/components/ScoreDisplay.css
@@ -1,126 +1,56 @@
 .score-display {
   display: flex;
   flex-direction: column;
-  gap: 0.75rem;
-  padding: 10px 0;
+  gap: 1vh;
+  padding: 1vh 2vw;
   background: white;
-  border-radius: 12px;
-  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
-  height: 120px;
+  border-radius: 1.2vh;
+  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
+  height: 100%;
   overflow: hidden;
 }
 
-/* score-box 별칭 추가 */
 .score-box {
-  padding: 10px 0;
-  height: 120px;
+  padding: 1vh 2vw;
+  height: 100%;
   display: flex;
   flex-direction: column;
-  gap: 0.75rem;
+  gap: 1vh;
   background: white;
-  border-radius: 12px;
+  border-radius: 1.2vh;
   box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
   overflow: hidden;
 }
 
 .score-section {
   display: flex;
   flex-direction: column;
   align-items: center;
-  gap: 0.25rem;
-  padding-bottom: 0.5rem;
-  border-bottom: 2px solid #e0e0e0;
+  gap: 0.5vh;
+  padding-bottom: 1vh;
+  border-bottom: 0.2vh solid #e0e0e0;
 }
 
 .score-label {
-  font-size: 1rem;
+  font-size: clamp(0.75rem, 2vw, 1rem);
   font-weight: 600;
   color: #666;
 }
 
 .score-value {
-  font-size: 2rem;
+  font-size: clamp(1.5rem, 5vw, 2rem);
   font-weight: 700;
   color: #4a90e2;
 }
 
 .record-section {
   display: flex;
   justify-content: space-around;
-  gap: 0.5rem;
+  gap: 2vw;
+  flex: 1;
 }
 
 .record-item {
   display: flex;
   flex-direction: column;
   align-items: center;
-  gap: 0.25rem;
+  gap: 0.5vh;
   flex: 1;
 }
 
 .record-label {
-  font-size: 0.875rem;
+  font-size: clamp(0.65rem, 1.8vw, 0.875rem);
   color: #999;
   font-weight: 500;
 }
 
 .record-value {
-  font-size: 1.5rem;
+  font-size: clamp(1rem, 3.5vw, 1.5rem);
   font-weight: 700;
   color: #333;
 }
-
-@media (max-width: 768px) {
-  .score-display {
-    padding: 1rem;
-    gap: 1rem;
-  }
-
-  .score-section {
-    padding-bottom: 0.75rem;
-    gap: 0.25rem;
-  }
-
-  .score-label {
-    font-size: 0.875rem;
-  }
-
-  .score-value {
-    font-size: 1.75rem;
-  }
-
-  .record-section {
-    gap: 0.5rem;
-  }
-
-  .record-item {
-    gap: 0.2rem;
-  }
-
-  .record-label {
-    font-size: 0.7rem;
-  }
-
-  .record-value {
-    font-size: 1rem;
-  }
-}
-
-@media (max-width: 480px) {
-  .score-display {
-    padding: 0.75rem;
-    gap: 0.75rem;
-  }
-
-  .score-value {
-    font-size: 1.5rem;
-  }
-
-  .record-value {
-    font-size: 0.9rem;
-  }
-
-  .record-label {
-    font-size: 0.65rem;
-  }
-}
```

## 파일 4: src/components/InputPanel.css

주요 변경사항:
- 버튼 크기: 48px → vw 기반 (9vw 숫자, 7vw 알파벳)
- min-width/max-width로 최소/최대 크기 제한
- 모든 padding, gap을 vh/vw로 변경
- 미디어 쿼리 제거 (clamp로 대체)

```diff
--- a/src/components/InputPanel.css
+++ b/src/components/InputPanel.css
@@ -1,247 +1,156 @@
 .input-panel {
   display: flex;
   flex-direction: column;
-  gap: 0.5rem;
-  padding: 10px;
+  gap: 1vh;
+  padding: 1vh 2vw;
   background: white;
-  border-radius: 12px;
+  border-radius: 1.2vh;
   box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
   flex: 0 0 auto;
+  max-height: 100%;
+  overflow-y: auto;
 }
 
 .input-box {
-  height: 80px;
-  padding: 10px;
+  height: auto;
+  padding: 1vh 2vw;
   display: flex;
   flex-direction: column;
-  gap: 0.5rem;
+  gap: 1vh;
   background: white;
-  border-radius: 12px;
+  border-radius: 1.2vh;
   box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
   overflow: hidden;
 }
 
 .input-section {
   display: flex;
   flex-direction: column;
-  gap: 0.5rem;
+  gap: 1vh;
+  flex: 0 0 auto;
 }
 
 .input-section h3 {
-  font-size: 1.2rem;
+  font-size: clamp(0.875rem, 2.5vw, 1.2rem);
   font-weight: 600;
   color: #333;
   margin: 0;
 }
 
 .number-grid {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
-  gap: 4px;
+  gap: 1vw;
 }
 
 .alphabet-grid {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
-  gap: 4px;
+  gap: 1vw;
 }
 
 .nato-grid {
-  display: grid;
-  grid-template-columns: repeat(4, 1fr);
-  gap: 0.5rem;
+  display: flex;
+  flex-wrap: wrap;
+  justify-content: center;
+  gap: 1vw;
 }
 
 .color-grid {
-  display: grid;
-  grid-template-columns: repeat(3, 1fr);
-  gap: 0.75rem;
+  display: flex;
+  flex-wrap: wrap;
+  justify-content: center;
+  gap: 1.5vw;
 }
 
 .input-button {
   padding: 0;
-  font-size: 1rem;
+  font-size: clamp(0.875rem, 4vw, 1.2rem);
   font-weight: 600;
-  border-radius: 8px;
+  border-radius: 1vh;
   transition: all 0.2s;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 
-/* 버튼 크기 축소 - 요청된 클래스명 지원 */
-.num-btn, .number-button {
-  width: 48px;
-  height: 48px;
-  margin: 4px;
-  font-size: 18px;
-  padding: 0;
-  min-height: 48px;
+/* 버튼 크기 - vw 기준 */
+.num-btn, .number-button {
+  width: 9vw;
+  height: 9vw;
+  min-width: 40px;
+  min-height: 40px;
+  max-width: 60px;
+  max-height: 60px;
+  margin: 0.5vw;
+  font-size: clamp(0.875rem, 4vw, 1.2rem);
+  padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 
 .alpha-btn, .alphabet-button {
-  width: 48px;
-  height: 48px;
-  margin: 4px;
-  font-size: 18px;
-  padding: 0;
-  min-height: 48px;
+  width: 7vw;
+  height: 7vw;
+  min-width: 35px;
+  min-height: 35px;
+  max-width: 55px;
+  max-height: 55px;
+  margin: 0.5vw;
+  font-size: clamp(0.75rem, 3.5vw, 1rem);
+  padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 
-.button-row {
-  display: flex;
-  flex-wrap: wrap;
-  justify-content: center;
-  gap: 4px;
-}
-
 .number-button {
   background: #4a90e2;
   color: white;
 }
 
@@ -109,7 +78,11 @@
 .nato-button {
   background: #50c878;
   color: white;
-  font-size: 0.9rem;
-  padding: 0.75rem 0.5rem;
+  font-size: clamp(0.75rem, 3vw, 0.9rem);
+  padding: 1.5vh 2vw;
+  width: auto;
+  min-width: 20vw;
 }
 
 .color-button {
   color: white;
   font-weight: 600;
-  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
+  text-shadow: 0 0.1vh 0.2vh rgba(0, 0, 0, 0.3);
+  width: 25vw;
+  height: 8vh;
+  min-width: 80px;
+  min-height: 50px;
+  max-width: 120px;
+  max-height: 80px;
 }
 
@@ -187,60 +150,6 @@
 .input-button:disabled {
   opacity: 0.5;
   cursor: not-allowed;
 }
-
-@media (max-width: 768px) {
-  .input-panel {
-    gap: 1rem;
-    padding: 1rem;
-  }
-
-  .input-section {
-    gap: 0.75rem;
-  }
-
-  .input-section h3 {
-    font-size: 1rem;
-  }
-
-  .number-grid {
-    grid-template-columns: repeat(5, 1fr);
-    gap: 0.4rem;
-  }
-
-  .alphabet-grid {
-    ......
-  }
-}
```

## 파일 5: src/components/GameDisplay.css

주요 변경사항:
- 모든 px 값을 vh/vw/clamp로 변경
- max-width를 90vw로 설정
- min-height/max-height를 vh 기반으로 설정
- 반응형 폰트 크기 적용

```diff
--- a/src/components/GameDisplay.css
+++ b/src/components/GameDisplay.css
@@ -1,305 +1,201 @@
 .game-display {
   display: flex;
   flex-direction: column;
-  gap: 1rem;
+  gap: 1vh;
   align-items: center;
-  padding: 1rem;
+  padding: 1vh 2vw;
   flex: 0 0 auto;
 }
 
 .display-area {
   width: 100%;
-  max-width: 400px;
-  min-height: 120px;
+  max-width: 90vw;
+  min-height: 15vh;
+  max-height: 25vh;
   display: flex;
   align-items: center;
   justify-content: center;
   background: white;
-  border-radius: 12px;
-  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
-  padding: 2rem;
+  border-radius: 1.2vh;
+  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
+  padding: 2vh;
 }
 
 .showing-element {
   display: flex;
   flex-direction: column;
   align-items: center;
-  gap: 1rem;
+  gap: 1vh;
   animation: fadeIn 0.3s ease-in;
 }
 
 .element-main {
-  font-size: 4rem;
+  font-size: clamp(2rem, 8vw, 4rem);
   font-weight: 700;
   color: #333;
   text-align: center;
 }
 
 .element-nato {
-  font-size: 1.5rem;
+  font-size: clamp(1rem, 3vw, 1.5rem);
   font-weight: 600;
   color: #666;
   text-align: center;
   font-style: italic;
 }
 
 .mode-1-pair {
   display: flex;
   align-items: center;
   justify-content: center;
-  gap: 1rem;
-  flex-wrap: wrap;
+  gap: 2vw;
+  flex-wrap: nowrap;
+  white-space: nowrap;
+  overflow: hidden;
 }
 
 .mode-1-number {
-  font-size: 3rem;
+  font-size: clamp(1.5rem, 6vw, 3rem);
   font-weight: 700;
   color: #4a90e2;
+  display: inline-flex;
+  white-space: nowrap;
 }
 
 .mode-1-arrow {
-  font-size: 2rem;
+  font-size: clamp(1rem, 4vw, 2rem);
   font-weight: 600;
   color: #666;
 }
 
 .mode-1-letter {
-  font-size: 3rem;
+  font-size: clamp(1.5rem, 6vw, 3rem);
+  font-weight: 700;
+  color: #50c878;
+  display: inline-flex;
+  white-space: nowrap;
+}
+
+.mode-1-nato-word {
+  font-size: clamp(0.875rem, 3vw, 1.5rem);
   font-weight: 600;
-  color: #50c878;
+  color: #999;
+  font-style: italic;
+  display: inline-flex;
+  white-space: nowrap;
 }
 
-.mode-1-nato-word {
-  font-size: 1.5rem;
-  font-weight: 600;
-  color: #999;
-  font-style: italic;
-}
-
-@media (max-width: 768px) {
-  .mode-1-pair {
-    gap: 0.5rem;
-  }
-
-  .mode-1-number,
-  .mode-1-letter {
-    font-size: 2rem;
-  }
-
-  .mode-1-arrow {
-    font-size: 1.5rem;
-  }
-
-  .mode-1-nato-word {
-    font-size: 1.2rem;
-  }
-}
-
 .empty-display {
   display: flex;
   align-items: center;
   justify-content: center;
-  min-height: 150px;
+  min-height: 15vh;
 }
 
 .input-prompt {
-  font-size: 1.5rem;
+  font-size: clamp(1rem, 3vw, 1.5rem);
   color: #999;
   font-weight: 500;
 }
 
 .result-message {
-  font-size: 2rem;
+  font-size: clamp(1.2rem, 4vw, 2rem);
   font-weight: 700;
-  padding: 1rem 2rem;
-  border-radius: 8px;
+  padding: 1.5vh 4vw;
+  border-radius: 1vh;
   animation: fadeIn 0.3s ease-in;
 }
 
 .user-input-display {
   width: 100%;
-  max-width: 600px;
+  max-width: 90vw;
   background: white;
-  border-radius: 12px;
-  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
-  padding: 1.5rem;
+  border-radius: 1.2vh;
+  box-shadow: 0 0.2vh 0.8vh rgba(0, 0, 0, 0.1);
+  padding: 2vh;
 }
 
 .input-label {
-  font-size: 1rem;
+  font-size: clamp(0.875rem, 2.5vw, 1rem);
   font-weight: 600;
   color: #666;
-  margin-bottom: 0.75rem;
+  margin-bottom: 1vh;
 }
 
 .input-sequence {
   display: flex;
   flex-wrap: wrap;
-  gap: 0.5rem;
+  gap: 1vw;
   align-items: center;
 }
 
 .input-item {
-  font-size: 1.5rem;
+  font-size: clamp(1rem, 3vw, 1.5rem);
   font-weight: 600;
   color: #333;
-  padding: 0.5rem 1rem;
+  padding: 1vh 2vw;
   background: #f0f0f0;
-  border-radius: 6px;
-  min-width: 50px;
+  border-radius: 0.8vh;
+  min-width: 8vw;
   text-align: center;
 }
 
 .color-block {
-  font-size: 2rem;
+  font-size: clamp(1.5rem, 5vw, 2rem);
   font-weight: 700;
-  padding: 2rem 3rem;
-  border-radius: 12px;
-  min-width: 200px;
+  padding: 3vh 6vw;
+  border-radius: 1.2vh;
+  min-width: 30vw;
   text-align: center;
   color: white;
-  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
+  text-shadow: 0 0.2vh 0.4vh rgba(0, 0, 0, 0.3);
   animation: fadeIn 0.3s ease-in, pulse 0.8s ease-in-out;
 }
 
@@ -204,102 +100,51 @@
 .color-white {
   background: #ecf0f1;
   color: #333;
   text-shadow: none;
-  border: 3px solid #bdc3c7;
+  border: 0.3vh solid #bdc3c7;
 }
 
 @keyframes fadeIn {
   from {
     opacity: 0;
     transform: scale(0.9);
   }
   to {
     opacity: 1;
     transform: scale(1);
   }
 }
 
 @keyframes pulse {
   0%, 100% {
     transform: scale(1);
   }
   50% {
     transform: scale(1.1);
   }
 }
-
-@media (max-width: 768px) {
-  .game-display {
-    gap: 1rem;
-    padding: 1rem;
-  }
-
-  .display-area {
-    max-width: 100%;
-    min-height: 150px;
-    padding: 1.5rem;
-  }
-
-  .element-main {
-    font-size: 2.5rem;
-  }
-
-  .element-nato {
-    font-size: 1rem;
-  }
-
-  .color-block {
-    font-size: 1.5rem;
-    padding: 1.5rem 2rem;
-    min-width: 150px;
-  }
-
-  .empty-display {
-    min-height: 120px;
-  }
-
-  .input-prompt {
-    font-size: 1.1rem;
-  }
-
-  .result-message {
-    font-size: 1.3rem;
-    padding: 0.75rem 1.5rem;
-  }
-
-  .input-item {
-    font-size: 1.2rem;
-    padding: 0.4rem 0.8rem;
-    min-width: 40px;
-  }
-}
-
-@media (max-width: 480px) {
-  .game-display {
-    gap: 0.75rem;
-    padding: 0.5rem;
-  }
-
-  .display-area {
-    min-height: 120px;
-    padding: 1rem;
-  }
-
-  .element-main {
-    font-size: 2rem;
-  }
-
-  .color-block {
-    font-size: 1.2rem;
-    padding: 1rem 1.5rem;
-    min-width: 120px;
-  }
-
-  .empty-display {
-    min-height: 100px;
-  }
-
-  .input-prompt {
-    font-size: 1rem;
-  }
-
-  .result-message {
-    font-size: 1.1rem;
-    padding: 0.6rem 1.2rem;
-  }
-}
```

## 파일 6: src/App.css

```diff
--- a/src/App.css
+++ b/src/App.css
@@ -1,4 +1,4 @@
 .app {
-  min-height: 100vh;
+  height: 100vh;
   width: 100%;
+  overflow: hidden;
 }
```

## 주요 변경 사항 요약

1. **구조 재구성**: GameScreen을 상단(점수)/중간(게임)/하단(키패드)으로 명확히 분리
2. **비율 기반 레이아웃**: 모든 px 값을 vh/vw/%로 변경
3. **반응형 폰트**: clamp() 함수로 최소/기본/최대 크기 설정
4. **Flex 기반 레이아웃**: 100vh 안에 모든 요소가 들어오도록 flex로 공간 분배
5. **버튼 크기**: vw 기반으로 설정하여 화면 크기에 맞게 자동 조정
6. **미디어 쿼리 제거**: clamp()로 대체하여 더 유연한 반응형 구현

## 테스트 필요 사항

- 다양한 화면 크기에서 레이아웃 확인
- 버튼 크기가 너무 작거나 크지 않은지 확인
- 모든 요소가 100vh 안에 들어오는지 확인
- 스크롤이 발생하지 않는지 확인


