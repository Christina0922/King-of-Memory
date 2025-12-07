// ============================================================
// King of Memory - Coupang 버튼 전용 스크립트 (최종 확정본)
// 이 파일 하나만으로 "기억력이 좋아지고 싶다면?" 버튼이 100% 동작한다.
// ============================================================

(function () {

  // ------------------------------------------------------------
  // 1) 쿠팡 파트너스 링크 목록
  //    (원하실 때 여기만 수정하시면 됩니다)
  // ------------------------------------------------------------
  const coupangLinks = [
    "https://link.coupang.com/a/dbl7EG",
    "https://link.coupang.com/a/dbl7X2",
    "https://link.coupang.com/a/dbl8bZ",
    "https://link.coupang.com/a/dbl8m9",
    "https://link.coupang.com/a/dbl8CE",
    "https://link.coupang.com/a/dbl8TE",
    "https://link.coupang.com/a/dbl9cr",
    "https://link.coupang.com/a/dbl9wS",
    "https://link.coupang.com/a/dbl9Fu",
    "https://link.coupang.com/a/dbl9Oj",
    "https://link.coupang.com/a/dbl92X",
    "https://link.coupang.com/a/dbmacb",
    "https://link.coupang.com/a/dbmapT",
    "https://link.coupang.com/a/dbmaJA",
    "https://link.coupang.com/a/dbmaSu",
    "https://link.coupang.com/a/dbma3B",
    "https://link.coupang.com/a/dbmbbW",
    "https://link.coupang.com/a/dbmbkf",
    "https://link.coupang.com/a/dbmbMO",
    "https://link.coupang.com/a/dbmb6a",
    "https://link.coupang.com/a/dbmcf3",
    "https://link.coupang.com/a/dbmcqi",
    "https://link.coupang.com/a/dbmczB",
    "https://link.coupang.com/a/dbmcJf"
  ];

  // ------------------------------------------------------------
  // 2) 1시간 동안 랜덤 링크 유지 로직
  // ------------------------------------------------------------
  const STORAGE_KEY_LINK = "km_coupang_link";
  const STORAGE_KEY_TIME = "km_coupang_time";
  const ONE_HOUR = 60 * 60 * 1000;

  function getCoupangUrl() {
    try {
      const now = Date.now();
      const lastTime = Number(localStorage.getItem(STORAGE_KEY_TIME) || "0");
      const savedLink = localStorage.getItem(STORAGE_KEY_LINK);

      // 저장된 링크가 1시간 이내라면 그대로 사용
      if (
        savedLink &&
        coupangLinks.includes(savedLink) &&
        now - lastTime < ONE_HOUR
      ) {
        return savedLink;
      }

      // 새 링크 선택
      if (!coupangLinks.length) return null;
      const idx = Math.floor(Math.random() * coupangLinks.length);
      const newLink = coupangLinks[idx];

      localStorage.setItem(STORAGE_KEY_TIME, String(now));
      localStorage.setItem(STORAGE_KEY_LINK, newLink);

      return newLink;
    } catch (e) {
      console.error("[KM] 쿠팡 링크 선택 오류:", e);
      return coupangLinks[0] || null;
    }
  }

  // ------------------------------------------------------------
  // 3) WebView 최적화된 쿠팡 이동 함수
  // ------------------------------------------------------------
  function openCoupang() {
    const url = getCoupangUrl();
    if (!url) {
      console.error("[KM] 유효한 쿠팡 URL이 없음");
      return;
    }

    try {
      // WebView에서는 location.href가 가장 안정적으로 동작함
      window.location.href = url;
    } catch (e) {
      console.error("[KM] location.href 이동 실패:", e);

      // fallback
      try {
        window.open(url, "_blank");
      } catch (e2) {
        console.error("[KM] window.open 이동 실패:", e2);
      }
    }
  }

  // ------------------------------------------------------------
  // 4) 버튼 클릭 핸들러 연결 (이벤트 위임 방식 - React 호환)
  // ID 또는 텍스트로 버튼 찾기
  // ------------------------------------------------------------
  function setupCoupangButton() {
    // 이벤트 위임으로 처리 (React 렌더링 후에도 작동)
    document.addEventListener(
      "click",
      function (event) {
        let node = event.target;
        let found = false;

        // 부모 노드를 타고 올라가며 버튼 찾기
        while (node && node !== document) {
          // 방법 1: ID로 찾기
          if (node.id === "boostMemoryBtn") {
            found = true;
            break;
          }
          
          // 방법 2: 텍스트로 찾기 (React가 ID 없이 렌더링한 경우)
          if (node.tagName === "BUTTON" || 
              (node.tagName === "DIV" && node.getAttribute("role") === "button")) {
            const text = (node.textContent || node.innerText || "").trim();
            if (text === "기억력이 좋아지고 싶다면?" || 
                text.includes("기억력이 좋아지고 싶다면")) {
              found = true;
              break;
            }
          }
          
          node = node.parentElement;
        }

        if (!found) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        try {
          openCoupang();
        } catch (error) {
          console.error("[KM] 쿠팡 링크 처리 중 오류:", error);
        }
      },
      true // 캡처 단계에서 먼저 잡아서 확실히 동작
    );
  }

  // ------------------------------------------------------------
  // 5) DOM 로딩 후 이벤트 연결
  // ------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCoupangButton);
  } else {
    setupCoupangButton();
  }

})();
