package com.kingofmemory.app

import android.os.Bundle
import android.util.Log
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
        settings.allowFileAccess = true
        settings.allowUniversalAccessFromFileURLs = true
        settings.allowContentAccess = true
        settings.setSupportZoom(false)
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        settings.cacheMode = android.webkit.WebSettings.LOAD_NO_CACHE

        // 에러 로그 + 에러 화면 표시
        webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                super.onPageStarted(view, url, favicon)
                Log.d(TAG, "Page started loading: $url")
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.d(TAG, "Page finished loading: $url")
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                val errorMsg = "WebView error: ${error?.description}, URL: ${request?.url}"
                Log.e(TAG, errorMsg)
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
