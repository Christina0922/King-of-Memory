# 개인정보 보호 가이드

이 프로젝트는 개인정보를 안전하게 관리합니다.

## 🔒 개인정보 보호 정책

다음 파일들은 Git에 커밋되지 않습니다 (`.gitignore`에 포함):

- `*.jks`, `*.keystore` - 키스토어 파일
- `local.properties` - SDK 경로 및 키스토어 비밀번호
- `.env*` - 환경 변수 파일
- `create-keystore.ps1` - 비밀번호가 포함된 스크립트

## 📝 개인정보 설정 방법

### 1. local.properties 파일 생성

프로젝트 루트에 `local.properties` 파일을 생성하고 다음 내용을 추가하세요:

```properties
sdk.dir=C\:\\Android

# 키스토어 정보
keystore.path=king.jks
keystore.password=YOUR_ACTUAL_PASSWORD
keystore.alias=king
keystore.keyPassword=YOUR_ACTUAL_PASSWORD
```

**⚠️ 중요**: `local.properties` 파일은 절대 Git에 커밋하지 마세요!

### 2. 환경 변수 설정 (선택사항)

`local.properties` 대신 환경 변수를 사용할 수 있습니다:

**Windows PowerShell:**
```powershell
$env:KEYSTORE_PATH="king.jks"
$env:KEYSTORE_PASSWORD="your_password"
$env:KEYSTORE_ALIAS="king"
$env:KEYSTORE_KEY_PASSWORD="your_password"
```

**Linux/Mac:**
```bash
export KEYSTORE_PATH="king.jks"
export KEYSTORE_PASSWORD="your_password"
export KEYSTORE_ALIAS="king"
export KEYSTORE_KEY_PASSWORD="your_password"
```

## 🚨 보안 주의사항

1. **키스토어 파일** (`.jks`, `.keystore`)은 절대 공개 저장소에 업로드하지 마세요.
2. **비밀번호**는 하드코딩하지 마세요. 반드시 환경 변수나 `local.properties`에 저장하세요.
3. **local.properties**는 이미 `.gitignore`에 포함되어 있지만, 다시 한 번 확인하세요.

## ✅ 개인정보 제거 확인

Git에 커밋하기 전에 다음을 확인하세요:

```bash
# 커밋할 파일 목록 확인
git status

# 개인정보가 포함된 파일이 있는지 확인
git diff

# 키스토어 파일이 있는지 확인
git ls-files | grep -E "\.(jks|keystore|properties)$"
```

## 📚 참고

- `local.properties.example` - 설정 예제 파일
- `.gitignore` - 무시되는 파일 목록

