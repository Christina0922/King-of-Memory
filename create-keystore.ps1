# 키스토어 파일 생성 스크립트
Write-Host "키스토어 파일 생성 중..." -ForegroundColor Yellow

$keystorePath = "D:\King_of_Memory\king.jks"
$keytoolPath = "$env:JAVA_HOME\bin\keytool.exe"

# JAVA_HOME이 설정되어 있지 않으면 기본 경로 시도
if (-not (Test-Path $keytoolPath)) {
    $possiblePaths = @(
        "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe",
        "C:\Program Files\Java\jdk*\bin\keytool.exe",
        "C:\Program Files (x86)\Java\jdk*\bin\keytool.exe"
    )
    
    foreach ($path in $possiblePaths) {
        $resolvedPath = Resolve-Path $path -ErrorAction SilentlyContinue
        if ($resolvedPath) {
            $keytoolPath = $resolvedPath[0].Path
            break
        }
    }
}

if (-not (Test-Path $keytoolPath)) {
    Write-Host "❌ keytool을 찾을 수 없습니다." -ForegroundColor Red
    Write-Host "   JAVA_HOME 환경 변수를 설정하거나, Android Studio의 JDK 경로를 확인하세요." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   또는 Android Studio에서 직접 생성:" -ForegroundColor Yellow
    Write-Host "   Build > Generate Signed Bundle / APK > Create new..." -ForegroundColor Yellow
    exit 1
}

if (Test-Path $keystorePath) {
    Write-Host "⚠️  키스토어 파일이 이미 존재합니다: $keystorePath" -ForegroundColor Yellow
    $overwrite = Read-Host "덮어쓰시겠습니까? (y/N)"
    if ($overwrite -ne "y" -and $overwrite -ne "Y") {
        Write-Host "취소되었습니다." -ForegroundColor Yellow
        exit 0
    }
    Remove-Item $keystorePath -Force
}

Write-Host "키스토어 생성 중..." -ForegroundColor Yellow
Write-Host "⚠️  경고: 비밀번호는 환경 변수에서 읽습니다." -ForegroundColor Yellow
Write-Host "   환경 변수가 설정되지 않으면 입력을 요청합니다." -ForegroundColor Yellow

# 환경 변수에서 비밀번호 읽기 (없으면 입력 받기)
$storePass = $env:KEYSTORE_PASSWORD
$keyPass = $env:KEYSTORE_KEY_PASSWORD

if (-not $storePass) {
    Write-Host ""
    $storePass = Read-Host "키스토어 비밀번호를 입력하세요" -AsSecureString
    $storePassSecure = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($storePass))
    $storePass = $storePassSecure
}

if (-not $keyPass) {
    $keyPass = $storePass
}

Write-Host ""
Write-Host "키스토어 생성 중..." -ForegroundColor Yellow
& $keytoolPath -genkey -v -keystore $keystorePath -alias king -keyalg RSA -keysize 2048 -validity 10000 -storepass $storePass -keypass $keyPass -dname "CN=King of Memory, OU=Development, O=King of Memory, L=Seoul, ST=Seoul, C=KR"

if (Test-Path $keystorePath) {
    Write-Host "✅ 키스토어 파일 생성 완료: $keystorePath" -ForegroundColor Green
} else {
    Write-Host "❌ 키스토어 파일 생성 실패" -ForegroundColor Red
    exit 1
}

