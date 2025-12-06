# 두 가지 문제 수정 - 전체 Diff 및 설명

## 문제 1: 숫자→알파벳 게임에서 두 개씩 생성되는 로직 오류 수정

### 문제 원인 분석

`GameDisplay.tsx`에서 알파벳을 표시할 때 다음과 같은 로직이 있었습니다:

```tsx
// 이전 코드 (문제가 있던 부분)
showingIndex % 2 === 0 ? (
  // 숫자 표시
  <div className="element-main">{pattern[showingIndex]}</div>
) : (
  // 알파벳 인덱스: 숫자 → 알파벳 형태로 표시
  showingIndex > 0 && ... ? (
    <div className="mode-1-pair">
      <div className="mode-1-number">{pattern[showingIndex - 1]}</div>
      <div className="mode-1-arrow">→</div>
      <div className="mode-1-letter">{pattern[showingIndex]}</div>
    </div>
  ) : ...
)
```

**문제점:**
- 알파벳을 표시할 때 이전 숫자(`pattern[showingIndex - 1]`)와 함께 "숫자 → 알파벳" 형태로 표시
- 사용자에게는 두 개의 요소가 동시에 보이는 것처럼 보임
- 실제로는 하나의 알파벳만 표시해야 하는데, 이전 숫자까지 함께 표시되어 혼란

### 해결 방법

각 요소를 개별적으로 표시하도록 변경:

```tsx
// 수정된 코드
typeof pattern[showingIndex] === 'string' && /^[0-9]$/.test(...) ? (
  // 숫자만 표시
  <div className="element-main">{pattern[showingIndex]}</div>
) : typeof pattern[showingIndex] === 'string' && /^[A-Z]$/.test(...) ? (
  // 알파벳만 표시 (NATO 단어 포함)
  <>
    <div className="element-main">{pattern[showingIndex]}</div>
    {getNatoWord(...) && <div className="element-nato">...</div>}
  </>
) : ...
```

**변경 사항:**
1. 이전 숫자와 함께 표시하는 로직 제거
2. 현재 `showingIndex`의 요소만 표시
3. 숫자는 숫자만, 알파벳은 알파벳만 개별적으로 표시
4. 알파벳의 경우 NATO 단어는 함께 표시 (요구사항)

### 수정 이유

1. **사용자 요구사항**: "항상 한 턴에 하나의 문제만 나오고, 문제 타입은 숫자→알파벳→숫자→알파벳 순서로 번갈아가며 반복되는 구조"
2. **현재 문제**: 알파벳 표시 시 이전 숫자와 함께 표시하여 두 개가 동시에 보이는 것처럼 보임
3. **해결**: 각 요소를 개별적으로 표시하여 명확성 향상

---

## 문제 2: 기록 보기 페이지 하단 카드 잘림 문제 해결

### 문제 원인 분석

`RecordsScreen.css`에서 다음과 같은 문제가 있었습니다:

```css
/* 이전 코드 (문제가 있던 부분) */
.records-content {
  flex: 1;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}
```

**문제점:**
1. `flex: 1`만 사용하여 스크롤 제한
2. `overflow-y: auto` 없음 → 스크롤 불가능
3. `padding-bottom` 부족 → 하단 카드가 화면 아래에 가려짐
4. `min-height: 0` 없음 → flex 컨테이너에서 스크롤이 제대로 작동하지 않음

### 해결 방법

```css
/* 수정된 코드 */
.records-header {
  flex: 0 0 auto;  /* 추가: 고정 헤더 */
  ...
}

.records-content {
  flex: 1 1 auto;  /* 변경: 1 → 1 1 auto */
  padding: 2rem;
  padding-bottom: 4rem;  /* 추가: 하단 여백 증가 */
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;  /* 추가: 스크롤 가능 */
  min-height: 0;  /* 추가: flex 스크롤 정상 작동 */
}

.record-info {
  ...
  margin-bottom: 2rem;  /* 추가: 하단 여백 */
}
```

**변경 사항:**
1. `.records-header`에 `flex: 0 0 auto` 추가 → 고정 헤더
2. `.records-content`에 `overflow-y: auto` 추가 → 스크롤 가능
3. `.records-content`에 `min-height: 0` 추가 → flex 스크롤 정상 작동
4. `.records-content`의 `padding-bottom`을 `2rem` → `4rem`으로 증가
5. `.record-info`에 `margin-bottom: 2rem` 추가
6. 미디어 쿼리에서 `padding-bottom: 3rem` 추가

### 수정 이유

1. **사용자 요구사항**: "기록 페이지는 내용이 길면 자연스럽게 전체 화면 세로 스크롤이 가능해야 하고, 어떤 해상도에서도 마지막 카드까지 모두 보여야 한다"
2. **현재 문제**: 
   - 스크롤이 제한되어 하단 카드가 잘림
   - 하단 여백 부족
3. **해결**:
   - `overflow-y: auto`로 스크롤 활성화
   - `padding-bottom` 증가로 하단 여백 확보
   - `min-height: 0`으로 flex 스크롤 정상 작동
   - `margin-bottom` 추가로 추가 여백 확보

---

## 전체 Diff

### 1. src/components/GameDisplay.tsx

```diff
--- a/src/components/GameDisplay.tsx
+++ b/src/components/GameDisplay.tsx
@@ -56,23 +56,20 @@ export const GameDisplay: React.FC<GameDisplayProps> = ({
             ) : (
               <>
                 {mode === 1 ? (
-                  // 모드 1: 숫자 → 알파벳 (NATO 단어) 형태로 표시
-                  showingIndex % 2 === 0 ? (
+                  // 모드 1: 각 요소를 개별적으로 표시 (한 번에 하나만)
+                  typeof pattern[showingIndex] === 'string' && /^[0-9]$/.test(pattern[showingIndex] as string) ? (
                     // 숫자 표시
                     <div className="element-main">{getDisplayText(pattern[showingIndex])}</div>
-                  ) : (
-                    // 알파벳 인덱스: 숫자 → 알파벳 (NATO 단어) 형태로 표시
-                    showingIndex > 0 && typeof pattern[showingIndex - 1] === 'string' && /^[0-9]$/.test(pattern[showingIndex - 1] as string) && typeof pattern[showingIndex] === 'string' && /^[A-Z]$/.test(pattern[showingIndex] as string) ? (
-                      <div className="mode-1-pair">
-                        <div className="mode-1-number">{pattern[showingIndex - 1]}</div>
-                        <div className="mode-1-arrow">→</div>
-                        <div className="mode-1-letter">{getDisplayText(pattern[showingIndex])}</div>
-                        {getNatoWord(String(pattern[showingIndex])) && (
-                          <div className="mode-1-nato-word">({getNatoWord(String(pattern[showingIndex]))})</div>
-                        )}
-                      </div>
-                    ) : (
-                      <div className="element-main">{getDisplayText(pattern[showingIndex])}</div>
-                    )
+                  ) : typeof pattern[showingIndex] === 'string' && /^[A-Z]$/.test(pattern[showingIndex] as string) ? (
+                    // 알파벳만 표시 (NATO 단어 포함)
+                    <>
+                      <div className="element-main">{getDisplayText(pattern[showingIndex])}</div>
+                      {getNatoWord(String(pattern[showingIndex])) && (
+                        <div className="element-nato">{getNatoWord(String(pattern[showingIndex]))}</div>
+                      )}
+                    </>
                   )
                 ) : (
                   <>
```

**주요 변경 사항:**
- ❌ 제거: 알파벳 표시 시 이전 숫자와 함께 "숫자 → 알파벳" 형태로 표시하는 로직
- ✅ 추가: 각 요소를 개별적으로 표시 (숫자는 숫자만, 알파벳은 알파벳만)
- ✅ 유지: 알파벳의 경우 NATO 단어는 함께 표시 (요구사항)

### 2. src/components/RecordsScreen.css

```diff
--- a/src/components/RecordsScreen.css
+++ b/src/components/RecordsScreen.css
@@ -8,6 +8,7 @@
 }
 
 .records-header {
+  flex: 0 0 auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
@@ -42,12 +43,15 @@
 .records-content {
-  flex: 1;
+  flex: 1 1 auto;
   padding: 2rem;
+  padding-bottom: 4rem;
   max-width: 1000px;
   margin: 0 auto;
   width: 100%;
+  overflow-y: auto;
+  min-height: 0;
 }
 
@@ -92,6 +96,7 @@
   border-radius: 12px;
   padding: 2rem;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
   text-align: center;
+  margin-bottom: 2rem;
 }
 
 .record-info p {
@@ -104,6 +109,7 @@
 @media (max-width: 768px) {
   .records-content {
     padding: 1rem;
+    padding-bottom: 3rem;
   }
 
   .record-cards {
```

**주요 변경 사항:**
- ✅ 추가: `.records-header`에 `flex: 0 0 auto` (고정 헤더)
- ✅ 변경: `.records-content`의 `flex: 1` → `flex: 1 1 auto`
- ✅ 추가: `.records-content`에 `overflow-y: auto` (스크롤 가능)
- ✅ 추가: `.records-content`에 `min-height: 0` (flex 스크롤 정상 작동)
- ✅ 변경: `.records-content`의 `padding-bottom: 2rem` → `padding-bottom: 4rem`
- ✅ 추가: `.record-info`에 `margin-bottom: 2rem`
- ✅ 추가: 미디어 쿼리에서 `padding-bottom: 3rem`

---

## 변경 사항 요약

### 문제 1: GameDisplay.tsx
| 항목 | 이전 | 이후 |
|------|------|------|
| 알파벳 표시 방식 | 이전 숫자와 함께 "숫자 → 알파벳" | 알파벳만 개별 표시 |
| 숫자 표시 방식 | 숫자만 표시 | 숫자만 표시 (변경 없음) |
| NATO 단어 표시 | "숫자 → 알파벳 (NATO)" 형태 | "알파벳 (NATO)" 형태 |

### 문제 2: RecordsScreen.css
| 항목 | 이전 | 이후 |
|------|------|------|
| `.records-header` | `flex` 없음 | `flex: 0 0 auto` (고정) |
| `.records-content` | `flex: 1` | `flex: 1 1 auto` |
| 스크롤 | 없음 | `overflow-y: auto` |
| 하단 여백 | `padding-bottom: 2rem` | `padding-bottom: 4rem` |
| flex 스크롤 | `min-height: 0` 없음 | `min-height: 0` 추가 |
| `.record-info` 하단 여백 | 없음 | `margin-bottom: 2rem` |

---

## 테스트 권장사항

### 문제 1 테스트
1. ✅ 숫자→알파벳 게임 모드 선택
2. ✅ 게임 시작 후 각 요소가 개별적으로 표시되는지 확인
3. ✅ 숫자만 표시되고, 그 다음 알파벳만 표시되는지 확인
4. ✅ 두 개가 동시에 표시되지 않는지 확인
5. ✅ 알파벳 표시 시 NATO 단어도 함께 표시되는지 확인

### 문제 2 테스트
1. ✅ 기록 보기 페이지 접속
2. ✅ 화면을 세로로 스크롤하여 마지막 카드까지 모두 보이는지 확인
3. ✅ 다양한 화면 크기에서 테스트 (스마트폰, 태블릿, 데스크톱)
4. ✅ 하단 카드가 잘리지 않고 전체가 표시되는지 확인
5. ✅ 하단 여백이 충분한지 확인

---

**수정 완료: 2024년 12월 28일**


