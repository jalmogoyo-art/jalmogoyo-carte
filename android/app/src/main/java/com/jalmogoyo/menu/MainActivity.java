package com.jalmogoyo.menu;

import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Full-screen kiosk-style shell for the menu.
 *
 * The menu is shown from the online version, so a change of price or dish reaches every tablet
 * without reinstalling anything. The web app keeps a complete offline copy of itself, and if the
 * tablet has never been online, the copy bundled in this APK (the /www folder) is shown instead.
 */
public class MainActivity extends Activity {

    private static final String ONLINE_URL = "https://jalmogoyo-art.github.io/jalmogoyo-carte/";
    private static final String BUNDLED_BASE = "file:///android_asset/";
    private static final long RETRY_MS = 2 * 60 * 1000;

    private final Handler handler = new Handler(Looper.getMainLooper());
    private WebView web;
    private boolean showingBundled;

    /** While the bundled copy is shown, look for the online version from time to time. */
    private final Runnable retryOnline = new Runnable() {
        @Override
        public void run() {
            tryGoOnline();
            handler.postDelayed(this, RETRY_MS);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        web = new WebView(this);
        web.setBackgroundColor(Color.BLACK);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setLongClickable(false);
        web.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                return true; // no text selection / context menu
            }
        });

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        s.setTextZoom(100);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // never leave the menu
                return !(url.startsWith(ONLINE_URL) || url.startsWith(BUNDLED_BASE));
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) showBundled();
            }

            @Override
            @SuppressWarnings("deprecation")
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) showBundled();
            }

            @Override
            public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
                if (request.isForMainFrame()) showBundled();
            }
        });

        setContentView(web);
        web.loadUrl(ONLINE_URL);
        hideSystemUi();
    }

    /** Online version unreachable and no offline copy yet: show the menu bundled in the APK. */
    private void showBundled() {
        if (showingBundled) return;
        showingBundled = true;
        web.loadUrl(BUNDLED_BASE + "index.html");
        handler.removeCallbacks(retryOnline);
        handler.postDelayed(retryOnline, RETRY_MS);
    }

    private void tryGoOnline() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                if (!isOnlineVersionReachable()) return;
                handler.post(new Runnable() {
                    @Override
                    public void run() {
                        switchToOnlineWhenIdle();
                    }
                });
            }
        }).start();
    }

    private static boolean isOnlineVersionReachable() {
        HttpURLConnection c = null;
        try {
            c = (HttpURLConnection) new URL(ONLINE_URL + "version.json").openConnection();
            c.setRequestMethod("HEAD");
            c.setConnectTimeout(5000);
            c.setReadTimeout(5000);
            c.setUseCaches(false);
            return c.getResponseCode() == 200;
        } catch (Exception e) {
            return false;
        } finally {
            if (c != null) c.disconnect();
        }
    }

    /** Only switch while the welcome screen is shown, never while a guest reads the menu. */
    private void switchToOnlineWhenIdle() {
        if (web == null || !showingBundled) return;
        web.evaluateJavascript("!!(window.isIdle && window.isIdle())", new android.webkit.ValueCallback<String>() {
            @Override
            public void onReceiveValue(String idle) {
                if (web == null || !showingBundled || !"true".equals(idle)) return;
                showingBundled = false;
                handler.removeCallbacks(retryOnline);
                web.loadUrl(ONLINE_URL);
            }
        });
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemUi();
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("window.handleBack && window.handleBack()", null);
    }

    @Override
    protected void onDestroy() {
        handler.removeCallbacks(retryOnline);
        if (web != null) {
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }

    @SuppressWarnings("deprecation")
    private void hideSystemUi() {
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }
}
