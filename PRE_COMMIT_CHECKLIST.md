# 커밋 전 체크리스트

Git에 푸시하기 전에 다음 항목을 확인하세요.

## ✅ 개인정보 제거 확인

### 1. 키스토어 파일 확인
```bash
# 키스토어 파일이 Git에 포함되지 않았는지 확인
git ls-files | grep -E "\.(jks|keystore)$"
```
**결과**: 아무것도 나오지 않아야 합니다.

### 2. local.properties 확인
```bash
# local.properties 파일이 Git에 포함되지 않았는지 확인
git ls-files | grep "local.properties"
```
**결과**: 아무것도 나오지 않아야 합니다.

### 3. 하드코딩된 비밀번호 확인
```bash
# 비밀번호가 하드코딩되어 있는지 확인
git diff HEAD | grep -i "password\|skinner1"
```
**결과**: 개인 비밀번호가 포함된 라인이 없어야 합니다.

### 4. 환경 변수 파일 확인
```bash
# .env 파일이 Git에 포함되지 않았는지 확인
git ls-files | grep "\.env"
```
**결과**: `.env.example`만 있어야 하고, 실제 `.env` 파일은 없어야 합니다.

## 📝 커밋 전 최종 확인 명령어

```bash
# 1. 변경된 파일 확인
git status

# 2. 개인정보 파일 확인
git ls-files | grep -E "\.(jks|keystore|properties)$|\.env$|create-keystore"

# 3. 하드코딩된 비밀번호 검색
grep -r "skinner1" --exclude-dir=node_modules --exclude-dir=.git .

# 4. 변경 내용 확인
git diff
```

## 🚨 주의사항

1. **절대 커밋하면 안 되는 것들:**
   - `*.jks`, `*.keystore` 파일
   - `local.properties` 파일 (실제 비밀번호 포함)
   - `.env` 파일 (실제 비밀번호 포함)
   - 하드코딩된 비밀번호

2. **안전하게 커밋 가능한 것들:**
   - `local.properties.example` (예제 파일)
   - `create-keystore.ps1` (비밀번호 제거됨)
   - 환경 변수를 사용하는 코드

## 📚 관련 문서

- `SECURITY.md` - 개인정보 보호 가이드
- `local.properties.example` - 설정 예제

