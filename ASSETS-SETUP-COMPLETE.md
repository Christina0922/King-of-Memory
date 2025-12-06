# Assets 폴더 설정 완료

## ✅ 완료된 작업

### 1. 기존 assets 폴더 삭제
- `app/src/main/assets` 폴더가 삭제되었습니다.

### 2. 새로운 assets 폴더 생성
- Android Studio 방식으로 새로운 assets 폴더가 생성되었습니다.

### 3. 파일 복사 및 설정
다음 파일들이 `app/src/main/assets/` 폴더에 생성되었습니다:

- ✅ **index.html** (376 bytes) - 상대 경로 사용 (`index.js`, `index.css`)
- ✅ **index.js** (157.15 KB)
- ✅ **index.css** (17.68 KB)

### 4. MainActivity.kt 확인
- ✅ WebView 로드 경로가 올바르게 설정되어 있습니다:
  ```kotlin
  webView.loadUrl("file:///android_asset/index.html")
  ```
- ✅ 필요한 WebView 설정이 모두 활성화되어 있습니다:
  - `javaScriptEnabled = true`
  - `allowFileAccess = true`
  - `allowUniversalAccessFromFileURLs = true`

## 📋 다음 단계

### Android Studio에서 확인
1. **Android Studio를 열고** 프로젝트를 엽니다.
2. **Project 패널**에서 `app/src/main/` 폴더 확인
3. assets 폴더가 제대로 인식되지 않으면:
   - `app` → **우클릭** → **New** → **Folder** → **Assets Folder** → **Finish**

### 빌드 및 테스트
1. **Build → Clean Project**
2. **Build → Rebuild Project**
3. **Build → Generate Signed Bundle / APK** → **Release APK** 생성
4. 스마트폰에서 **기존 앱을 완전히 삭제**
5. 새 APK를 설치하고 테스트

### 자동화 스크립트 사용
- **`setup-assets.ps1`**: Assets 폴더 설정만 수행
- **`build-and-test.ps1`**: 전체 빌드 및 테스트 프로세스

## 🔍 확인 사항

### index.html 경로
현재 `index.html`은 상대 경로를 사용하도록 설정되어 있습니다:
```html
<script type="module" crossorigin src="index.js"></script>
<link rel="stylesheet" crossorigin href="index.css">
```

### WebView 설정
`MainActivity.kt`에서 모든 필요한 설정이 활성화되어 있습니다.

## ⚠️ 주의사항

1. **기존 앱 삭제 필수**: 새 APK를 설치하기 전에 스마트폰에서 기존 앱을 완전히 삭제해야 합니다.

2. **Android Studio 인식**: Windows에서 직접 만든 assets 폴더는 Android Studio가 인식하지 못할 수 있습니다. 필요시 Android Studio의 Assets Folder 기능을 사용하세요.

3. **React 빌드**: `dist` 폴더의 파일이 최신 상태인지 확인하세요. 변경사항이 있다면 `npm run build`를 실행하세요.

## 📝 파일 위치

```
app/src/main/assets/
├── index.html
├── index.js
└── index.css
```

## ✅ 완료!

모든 설정이 완료되었습니다. 이제 Android Studio에서 빌드하고 테스트할 수 있습니다.


