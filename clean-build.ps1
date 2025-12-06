# 빌드 디렉토리 강제 삭제 스크립트
Write-Host "빌드 디렉토리 정리 중..." -ForegroundColor Yellow

$buildPath = "app\build"

if (Test-Path $buildPath) {
    Write-Host "Java/Gradle 프로세스 종료 중..." -ForegroundColor Yellow
    Get-Process -Name "java","gradle*","kotlin*" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    
    Write-Host "빌드 디렉토리 삭제 시도 중..." -ForegroundColor Yellow
    
    # 파일을 하나씩 삭제
    Get-ChildItem -Path $buildPath -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
        try {
            Remove-Item $_.FullName -Force -ErrorAction Stop
        } catch {
            Write-Warning "파일 삭제 실패: $($_.FullName)"
        }
    }
    
    Start-Sleep -Seconds 1
    
    # 디렉토리 삭제
    try {
        Remove-Item $buildPath -Recurse -Force -ErrorAction Stop
        Write-Host "✅ 빌드 디렉토리 삭제 완료!" -ForegroundColor Green
    } catch {
        Write-Host "❌ 일부 파일이 여전히 잠겨있습니다." -ForegroundColor Red
        Write-Host "   Android Studio나 IntelliJ IDEA를 완전히 종료한 후 다시 시도하세요." -ForegroundColor Yellow
        Write-Host "   또는 컴퓨터를 재시작한 후 다시 시도하세요." -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "빌드 디렉토리가 이미 없습니다." -ForegroundColor Green
}

Write-Host "정리 완료!" -ForegroundColor Green

