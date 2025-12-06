# 숫자/알파벳 버튼 레이아웃 재구성 전체 Diff

## 변경 요약
- InputPanel 컴포넌트 구조 재배치: 숫자/알파벳 버튼을 `.button-row` 컨테이너로 통합
- className 통일: `.num-btn`, `.alpha-btn`으로 변경
- 버튼 크기를 11vw로 통일 (width: 11vw, height: 11vw)
- top-section, middle-section, bottom-section을 vh 단위로 명확히 설정
- 모든 버튼이 동일한 폭의 컨테이너에서 같은 중심선으로 정렬

---

## 파일 1: src/components/InputPanel.tsx

### 변경사항
1. 숫자 버튼과 알파벳 버튼을 `.button-row` 컨테이너로 통합
2. className을 `.num-btn`, `.alpha-btn`으로 통일
3. 모든 모드에 동일한 구조 적용

```diff
--- a/src/components/InputPanel.tsx
+++ b/src/components/InputPanel.tsx
@@ -32,33 +32,33 @@ export const InputPanel: React.FC<InputPanelProps> = ({ mode, onInput, disable
   switch (mode) {
     case 1: // 숫자 + 알파벳
       return (
         <div className="input-panel">
           <div className="input-section">
             <h3>숫자</h3>
-            <div className="number-grid">
+            <div className="button-row">
               {NUMBERS.map((num) => (
                 <button
                   key={num}
-                  className="input-button number-button"
+                  className="num-btn"
                   onClick={() => handleNumberClick(num)}
                   disabled={disabled}
                 >
                   {num}
                 </button>
               ))}
             </div>
           </div>
           <div className="input-section">
             <h3>알파벳</h3>
-            <div className="alphabet-grid">
+            <div className="button-row">
               {ALPHABETS.map((letter) => (
                 <button
                   key={letter}
-                  className="input-button alphabet-button"
+                  className="alpha-btn"
                   onClick={() => handleAlphabetClick(letter)}
                   disabled={disabled}
                 >
                   {letter}
                 </button>
               ))}
             </div>
           </div>
         </div>
       );
 
     case 2: // 숫자 + 색상
       return (
         <div className="input-panel">
           <div className="input-section">
             <h3>숫자</h3>
-            <div className="number-grid">
+            <div className="button-row">
               {NUMBERS.map((num) => (
                 <button
                   key={num}
-                  className="input-button number-button"
+                  className="num-btn"
                   onClick={() => handleNumberClick(num)}
                   disabled={disabled}
                 >
                   {num}
                 </button>
               ))}
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
         <div className="input-panel">
           <div className="input-section">
             <h3>숫자</h3>
-            <div className="number-grid">
+            <div className="button-row">
               {NUMBERS.map((num) => (
                 <button
                   key={num}
-                  className="input-button number-button"
+                  className="num-btn"
                   onClick={() => handleNumberClick(num)}
                   disabled={disabled}
                 >
                   {num}
                 </button>
               ))}
             </div>
           </div>
         </div>
       );
 
     case 4: // 알파벳만
       return (
         <div className="input-panel">
           <div className="input-section">
             <h3>알파벳</h3>
-            <div className="alphabet-grid">
+            <div className="button-row">
               {ALPHABETS.map((letter) => (
                 <button
                   key={letter}
-                  className="input-button alphabet-button"
+                  className="alpha-btn"
                   onClick={() => handleAlphabetClick(letter)}
                   disabled={disabled}
                 >
                   {letter}
                 </button>
               ))}
             </div>
           </div>
         </div>
       );
```

---

## 파일 2: src/components/InputPanel.css

### 주요 변경사항
1. `.button-row`를 width: 100%로 설정하여 동일한 폭의 컨테이너 생성
2. `.num-btn`과 `.alpha-btn`의 크기를 11vw로 통일
3. 버튼이 같은 중심선에서 정렬되도록 설정

```diff
--- a/src/components/InputPanel.css
+++ b/src/components/InputPanel.css
@@ -27,6 +27,17 @@
   margin: 0;
 }
 
+/* 공통 버튼 컨테이너 - 동일한 폭으로 정렬 */
+.button-row {
+  width: 100%;
+  display: flex;
+  flex-wrap: wrap;
+  justify-content: center;
+  align-items: center;
+  gap: 1.5vw;
+  padding: 0.5vh 0;
+}
+
 .number-grid {
   display: flex;
   flex-wrap: wrap;
@@ -64,30 +75,66 @@
   justify-content: center;
 }
 
-/* 버튼 크기 - vw 기준 */
-.num-btn, .number-button {
-  width: 9vw;
-  height: 9vw;
-  min-width: 40px;
-  min-height: 40px;
-  max-width: 60px;
-  max-height: 60px;
-  margin: 0.5vw;
-  font-size: clamp(0.875rem, 4vw, 1.2rem);
+/* 숫자 버튼 - vw 기준 통일 */
+.num-btn {
+  width: 11vw;
+  height: 11vw;
+  min-width: 45px;
+  min-height: 45px;
+  max-width: 65px;
+  max-height: 65px;
+  margin: 0;
+  font-size: clamp(1rem, 4.5vw, 1.3rem);
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
+  background: #4a90e2;
+  color: white;
+  border-radius: 1vh;
+  transition: all 0.2s;
+}
+
+.num-btn:hover:not(:disabled) {
+  background: #357abd;
+  transform: scale(1.05);
+}
+
+.num-btn:active:not(:disabled) {
+  transform: scale(0.95);
 }
 
-.alpha-btn, .alphabet-button {
-  width: 7vw;
-  height: 7vw;
-  min-width: 35px;
-  min-height: 35px;
-  max-width: 55px;
-  max-height: 55px;
-  margin: 0.5vw;
-  font-size: clamp(0.75rem, 3.5vw, 1rem);
+/* 알파벳 버튼 - vw 기준 통일 */
+.alpha-btn {
+  width: 11vw;
+  height: 11vw;
+  min-width: 45px;
+  min-height: 45px;
+  max-width: 65px;
+  max-height: 65px;
+  margin: 0;
+  font-size: clamp(1rem, 4.5vw, 1.3rem);
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
+  background: #50c878;
+  color: white;
+  border-radius: 1vh;
+  transition: all 0.2s;
+}
+
+.alpha-btn:hover:not(:disabled) {
+  background: #3da05f;
+  transform: scale(1.05);
+}
+
+.alpha-btn:active:not(:disabled) {
+  transform: scale(0.95);
+}
+
+/* 호환성을 위한 기존 클래스명 지원 */
+.number-button {
+  width: 11vw;
+  height: 11vw;
+  min-width: 45px;
+  min-height: 45px;
+  max-width: 65px;
+  max-height: 65px;
+  margin: 0;
+  font-size: clamp(1rem, 4.5vw, 1.3rem);
+  padding: 0;
+  display: flex;
+  align-items: center;
+  justify-content: center;
+  background: #4a90e2;
+  color: white;
+  border-radius: 1vh;
+  transition: all 0.2s;
 }
 
-/* 버튼 그리드 가로 정렬 */
-.button-row {
-  display: flex;
-  flex-wrap: wrap;
-  justify-content: center;
-  gap: 1vw;
-}
-
 .number-button {
   background: #4a90e2;
   color: white;
 }
@@ -118,15 +165,19 @@
 
 .input-section h3 {
   font-size: clamp(0.875rem, 2.5vw, 1.2rem);
   font-weight: 600;
   color: #333;
   margin: 0;
+  text-align: center;
 }
```

---

## 파일 3: src/components/GameScreen.css

### 주요 변경사항
1. top-section을 12vh로 고정
2. middle-section을 flex: 1로 설정하여 남은 공간 자동 할당
3. bottom-section의 max-height를 계산하여 100vh 안에 맞추기

```diff
--- a/src/components/GameScreen.css
+++ b/src/components/GameScreen.css
@@ -9,6 +9,7 @@
   padding: 1.5vh 2vw;
   background: white;
   box-shadow: 0 0.2vh 0.4vh rgba(0, 0, 0, 0.1);
   min-height: 6vh;
+  max-height: 6vh;
 }
 
@@ -57,7 +58,8 @@
 /* 상단: 점수 영역 - vh 단위로 고정 */
 .top-section {
   flex: 0 0 12vh;
   min-height: 12vh;
   max-height: 12vh;
   padding: 1vh 2vw;
+  overflow: hidden;
 }
 
 /* 중간: 게임 디스플레이 및 컨트롤 - 남은 공간 자동 할당 */
@@ -68,7 +70,9 @@
   min-height: 0;
   padding: 1vh 2vw;
   overflow-y: auto;
 }
 
 /* 하단: 입력 패널 (키패드) - 내용에 맞게 자동 조정 */
 .bottom-section {
   flex: 0 0 auto;
   min-height: 0;
   padding: 1vh 2vw;
   overflow: hidden;
+  max-height: calc(100vh - 6vh - 12vh - 2vh); /* 헤더 - 점수 - 여백 */
 }
```

---

## 변경 이유 설명

### 1. `.button-row` 컨테이너 통합
- **목적**: 숫자 버튼과 알파벳 버튼을 동일한 폭(width: 100%)의 컨테이너 안에 배치
- **효과**: 두 그룹이 같은 중심선에서 정렬되어 시각적으로 일관성 있는 레이아웃 제공
- **구현**: `.button-row`에 `width: 100%`, `justify-content: center` 적용

### 2. 버튼 크기 통일 (11vw)
- **목적**: 모든 화면 크기에서 동일한 비율로 표시되도록 반응형 구현
- **효과**: 작은 화면과 큰 화면 모두에서 버튼 비율이 일관되게 유지
- **구현**: `.num-btn`과 `.alpha-btn` 모두 `width: 11vw, height: 11vw`로 설정
- **최소/최대 크기**: `min-width: 45px, max-width: 65px`로 너무 작거나 크지 않도록 제한

### 3. className 통일 (`.num-btn`, `.alpha-btn`)
- **목적**: 코드 일관성 향상 및 유지보수 용이
- **효과**: 명확한 네이밍으로 버튼 타입을 쉽게 식별 가능
- **호환성**: 기존 `.number-button`, `.alphabet-button` 클래스도 지원하여 하위 호환성 유지

### 4. vh 단위 기반 섹션 높이
- **목적**: 기기 해상도와 상관없이 100vh 안에서 정확한 비율로 표시
- **구현**:
  - `.top-section`: `flex: 0 0 12vh` (12vh 고정)
  - `.middle-section`: `flex: 1 1 auto` (남은 공간 자동 할당)
  - `.bottom-section`: `max-height: calc(100vh - 6vh - 12vh - 2vh)` (100vh 안에 맞춤)
- **효과**: 모든 기기에서 스크롤 없이 모든 요소가 화면에 들어옴

### 5. 중앙 정렬 및 간격 통일
- **목적**: 버튼들이 시각적으로 균형 잡힌 레이아웃
- **구현**: 
  - `.button-row`에 `justify-content: center` 적용
  - `gap: 1.5vw`로 일관된 간격 설정
  - `text-align: center`로 제목도 중앙 정렬

---

## 테스트 체크리스트

- [ ] 다양한 화면 크기에서 버튼 비율이 일관되는지 확인
- [ ] 숫자 버튼과 알파벳 버튼이 같은 중심선에서 정렬되는지 확인
- [ ] 모든 섹션이 100vh 안에 스크롤 없이 들어오는지 확인
- [ ] 버튼 클릭 및 호버 효과가 정상 작동하는지 확인
- [ ] 최소/최대 크기 제한이 올바르게 작동하는지 확인


