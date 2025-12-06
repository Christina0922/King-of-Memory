# ============================================
# 전체 빌드 및 테스트 스크립트
# ============================================

Write-Host "=== King of Memory - 빌드 및 테스트 ===" -ForegroundColor Cyan
Write-Host ""

# 1단계: Assets 설정
Write-Host "[1/6] Assets 폴더 설정 중..." -ForegroundColor Yellow
& ".\setup-assets.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Assets 설정 실패!" -ForegroundColor Red
    exit 1
}

# 2단계: Android 프로젝트 정리
Write-Host ""
Write-Host "[2/6] Android 프로젝트 정리 중..." -ForegroundColor Yellow
Set-Location "."
& ".\gradlew" clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Clean 실패!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Clean 완료" -ForegroundColor Green

# 3단계: Android 프로젝트 재빌드
Write-Host ""
Write-Host "[3/6] Android 프로젝트 재빌드 중..." -ForegroundColor Yellow
& ".\gradlew" assembleRelease
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Rebuild 실패!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Rebuild 완료" -ForegroundColor Green

# 4단계: APK 파일 위치 확인
Write-Host ""
Write-Host "[4/6] APK 파일 위치 확인..." -ForegroundColor Yellow
$apkPath = "app\build\outputs\apk\release\app-release.apk"
if (Test-Path $apkPath) {
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "✅ APK 생성 완료: $apkPath" -ForegroundColor Green
    Write-Host "   크기: $([math]::Round($apkSize, 2)) MB" -ForegroundColor Cyan
} else {
    Write-Host "❌ APK 파일을 찾을 수 없습니다!" -ForegroundColor Red
    exit 1
}

# 5단계: 기존 앱 삭제 안내
Write-Host ""
Write-Host "[5/6] 기존 앱 삭제 안내" -ForegroundColor Yellow
Write-Host "⚠️  다음 단계를 수행하세요:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 스마트폰에서 'King of Memory' 앱을 완전히 삭제하세요." -ForegroundColor White
Write-Host "   (설정 → 앱 → King of Memory → 삭제)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 다음 명령어로 새 APK를 설치하세요:" -ForegroundColor White
Write-Host "   adb install -r $apkPath" -ForegroundColor Cyan
Write-Host ""

# 6단계: 설치 스크립트 생성
Write-Host "[6/6] 설치 스크립트 생성 중..." -ForegroundColor Yellow
$installScript = @"
# ============================================
# APK 설치 스크립트
# ============================================

Write-Host "=== APK 설치 중 ===" -ForegroundColor Cyan
Write-Host ""

`$apkPath = "app\build\outputs\apk\release\app-release.apk"

if (-not (Test-Path `$apkPath)) {
    Write-Host "❌ APK 파일을 찾을 수 없습니다: `$apkPath" -ForegroundColor Red
    exit 1
}

# 기존 앱 제거 (선택적)
Write-Host "기존 앱 제거 중..." -ForegroundColor Yellow
adb uninstall com.kingofmemory.app 2>&1 | Out-Null

# 새 APK 설치
Write-Host "새 APK 설치 중..." -ForegroundColor Yellow
adb install -r `$apkPath

if (`$LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 설치 완료!" -ForegroundColor Green
    Write-Host ""
    Write-Host "앱을 실행하여 index.html이 정상적으로 로드되는지 확인하세요." -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ 설치 실패!" -ForegroundColor Red
    Write-Host "스마트폰에서 수동으로 기존 앱을 삭제한 후 다시 시도하세요." -ForegroundColor Yellow
}
"@

Set-Content -Path "install-apk.ps1" -Value $installScript -Encoding UTF8
Write-Host "✅ 설치 스크립트 생성 완료: install-apk.ps1" -ForegroundColor Green

Write-Host ""
Write-Host "=== 모든 작업 완료! ===" -ForegroundColor Green
Write-Host ""
Write-Host "📋 다음 단계:" -ForegroundColor Yellow
Write-Host "1. 스마트폰에서 기존 앱 완전 삭제" -ForegroundColor White
Write-Host "2. 다음 명령어 실행:" -ForegroundColor White
Write-Host "   .\install-apk.ps1" -ForegroundColor Cyan
Write-Host "3. 앱 실행하여 index.html 로드 확인" -ForegroundColor White
Write-Host ""


