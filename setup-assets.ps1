# ============================================
# Assets 폴더 설정 스크립트
# ============================================

Write-Host "=== Assets 폴더 재설정 ===" -ForegroundColor Cyan
Write-Host ""

# 1단계: 기존 assets 폴더 삭제
Write-Host "[1/4] 기존 assets 폴더 삭제 중..." -ForegroundColor Yellow
$assetsPath = "app\src\main\assets"
if (Test-Path $assetsPath) {
    Remove-Item $assetsPath -Recurse -Force
    Write-Host "✅ 기존 assets 폴더 삭제 완료" -ForegroundColor Green
} else {
    Write-Host "⚠️  assets 폴더가 존재하지 않습니다." -ForegroundColor Yellow
}

# 2단계: 새로운 assets 폴더 생성
Write-Host ""
Write-Host "[2/4] 새로운 assets 폴더 생성 중..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $assetsPath -Force | Out-Null
Write-Host "✅ 새로운 assets 폴더 생성 완료" -ForegroundColor Green
Write-Host ""
Write-Host "📝 참고: Android Studio에서 assets 폴더로 인식되려면:" -ForegroundColor Cyan
Write-Host "   app → 우클릭 → New → Folder → Assets Folder → Finish" -ForegroundColor White
Write-Host ""

# 3단계: React 빌드 (필요한 경우)
Write-Host "[3/4] React 앱 빌드 확인 중..." -ForegroundColor Yellow
if (-not (Test-Path "dist\index.html")) {
    Write-Host "⚠️  dist 폴더가 없습니다. React 빌드를 실행합니다..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ React 빌드 실패!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ React 빌드 완료" -ForegroundColor Green
} else {
    Write-Host "✅ dist 폴더 확인 완료" -ForegroundColor Green
}

# 4단계: 파일 복사 및 경로 수정
Write-Host ""
Write-Host "[4/4] assets 폴더에 파일 복사 중..." -ForegroundColor Yellow

# index.js, index.css 복사
if (Test-Path "dist\index.js") {
    Copy-Item "dist\index.js" -Destination "$assetsPath\index.js" -Force
    Write-Host "✅ index.js 복사 완료" -ForegroundColor Green
} else {
    Write-Host "❌ dist\index.js 파일을 찾을 수 없습니다!" -ForegroundColor Red
}

if (Test-Path "dist\index.css") {
    Copy-Item "dist\index.css" -Destination "$assetsPath\index.css" -Force
    Write-Host "✅ index.css 복사 완료" -ForegroundColor Green
} else {
    Write-Host "❌ dist\index.css 파일을 찾을 수 없습니다!" -ForegroundColor Red
}

# index.html 생성 (상대 경로로)
$htmlContent = @"
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>King of Memory</title>
    <script type="module" crossorigin src="index.js"></script>
    <link rel="stylesheet" crossorigin href="index.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
"@

Set-Content -Path "$assetsPath\index.html" -Value $htmlContent -Encoding UTF8
Write-Host "✅ index.html 생성 완료 (상대 경로 사용)" -ForegroundColor Green

Write-Host ""
Write-Host "=== 완료! ===" -ForegroundColor Green
Write-Host ""
Write-Host "📁 생성된 파일:" -ForegroundColor Cyan
Get-ChildItem $assetsPath | ForEach-Object {
    Write-Host "   ✅ $($_.Name) ($([math]::Round($_.Length/1KB, 2)) KB)" -ForegroundColor White
}
Write-Host ""
Write-Host "다음 단계:" -ForegroundColor Yellow
Write-Host "1. Android Studio에서 app → 우클릭 → New → Folder → Assets Folder" -ForegroundColor White
Write-Host "2. Build → Clean Project" -ForegroundColor White
Write-Host "3. Build → Rebuild Project" -ForegroundColor White
Write-Host "4. Release APK 생성 및 테스트" -ForegroundColor White


