# index.html 로드 문제 해결

## 문제
화면이 하얗게 나오고 "index.html을 찾지 못했다"는 메시지가 표시됨

## 해결 방법

### 1. MainActivity.kt 개선
- WebView 설정 추가:
  - `allowContentAccess = true`
  - `allowFileAccess = true`
  - `allowUniversalAccessFromFileURLs = true`
  - `cacheMode = LOAD_NO_CACHE`
- 상세한 에러 로그 추가
- try-catch 블록 추가

### 2. Assets 폴더 재설정
- 기존 assets 폴더 삭제 후 재생성
- dist 폴더에서 최신 파일 복사:
  - index.html
  - index.js
  - index.css

### 3. 확인 사항
- ✅ `file:///android_asset/index.html` 경로 사용
- ✅ index.html에서 상대 경로 사용 (`./index.js`, `./index.css`)
- ✅ 모든 파일이 assets 폴더에 존재

## 다음 단계

1. **Android Studio에서:**
   - Build → Clean Project
   - Build → Rebuild Project

2. **APK 재생성:**
   - Build → Generate Signed Bundle / APK
   - Release APK 생성

3. **설치 및 테스트:**
   - 스마트폰에서 기존 앱 완전 삭제
   - 새 APK 설치
   - 로그캣에서 에러 확인 (MainActivity 태그)

## 로그 확인
앱 실행 후 로그캣에서 다음 태그로 에러 확인:
```
adb logcat | grep MainActivity
```

## 추가 문제 해결

만약 여전히 문제가 발생하면:

1. **assets 폴더 확인:**
   - Android Studio에서 `app/src/main/` 우클릭
   - New → Folder → Assets Folder

2. **파일 권한 확인:**
   - assets 폴더의 파일들이 읽기 가능한지 확인

3. **WebView 로그 확인:**
   - MainActivity.kt에서 Log.d()로 상세 로그 출력
   - 로그캣에서 URL 로드 과정 확인


