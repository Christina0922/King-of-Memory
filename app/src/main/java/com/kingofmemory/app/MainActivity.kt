package com.kingofmemory.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.ads.AdView
import com.kingofmemory.app.R

class MainActivity : AppCompatActivity() {

    private val TAG = "MainActivity"
    private lateinit var webView: WebView
    private var adView: AdView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        try {
            // activity_main.xml 로드
            setContentView(R.layout.activity_main)
        } catch (e: Exception) {
            Log.e(TAG, "layout load error: ${e.message}")
            finish()
            return
        }

        webView = findViewById(R.id.webView)

        // 🔐 WebView 설정
        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.javaScriptCanOpenWindowsAutomatically = true
        settings.allowFileAccess = true
        settings.allowUniversalAccessFromFileURLs = true
        settings.allowContentAccess = true
        settings.setSupportZoom(false)
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        settings.cacheMode = android.webkit.WebSettings.LOAD_NO_CACHE

        // 🚀 WebChromeClient 설정 (JavaScript 상호작용 활성화 - 쿠팡 링크 등)
        webView.webChromeClient = WebChromeClient()

        // 에러 로그 + 에러 화면 표시 + 쿠팡 링크 처리
        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                super.onPageStarted(view, url, favicon)
                Log.d(TAG, "Page started loading: $url")
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.d(TAG, "Page finished loading: $url")
            }

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                
                // 쿠팡 링크 처리 (coupang:// 스킴 또는 link.coupang.com)
                if (url.startsWith("coupang://") || url.contains("link.coupang.com")) {
                    try {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        startActivity(intent)
                        Log.d(TAG, "쿠팡 링크 열기: $url")
                        return true
                    } catch (e: Exception) {
                        Log.e(TAG, "쿠팡 링크 열기 실패: ${e.message}")
                        // 실패 시 브라우저로 열기 시도
                        try {
                            val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url.replace("coupang://", "https://www.coupang.com/")))
                            startActivity(browserIntent)
                            return true
                        } catch (e2: Exception) {
                            Log.e(TAG, "브라우저 열기 실패: ${e2.message}")
                        }
                    }
                }
                
                return false
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                val errorMsg = "WebView error: ${error?.description}, URL: ${request?.url}"
                Log.e(TAG, errorMsg)
                // 쿠팡 링크 오류는 무시 (외부 앱으로 열리므로)
                if (request?.url?.toString()?.startsWith("coupang://") == true) {
                    return
                }
                view?.loadData(
                    "<html><body style='padding:20px; font-family:Arial;'><h2>파일 로드 오류</h2><p>index.html을 찾지 못했습니다.</p><p>에러: ${error?.description}</p><p>URL: ${request?.url}</p></body></html>",
                    "text/html",
                    "UTF-8"
                )
            }
        }

        // ✅ 로컬 index.html 로드
        try {
            val url = "file:///android_asset/index.html"
            Log.d(TAG, "Loading URL: $url")
            webView.loadUrl(url)
        } catch (e: Exception) {
            Log.e(TAG, "Error loading URL: ${e.message}", e)
        }
    }
}
