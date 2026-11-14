package com.jalmogoyo.menu;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.app.admin.DevicePolicyManager;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.text.InputFilter;
import android.text.InputType;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;

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

    // Kiosk mode (tablets set up with the kiosk QR code only, see Kiosk.java)
    private static final int ADMIN_TAPS = 5;              // taps in the top-right corner…
    private static final long ADMIN_TAPS_MS = 3000;       // …within 3 seconds open the code prompt
    private static final int MAX_WRONG_CODES = 5;
    private static final long WRONG_CODE_PAUSE_MS = 60 * 1000;
    private boolean kiosk;
    private final long[] cornerTaps = new long[ADMIN_TAPS];
    private AlertDialog dialog;
    private int wrongCodes;
    private long codeBlockedUntil;

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
        kiosk = Kiosk.isOwner(this);
        if (kiosk) Kiosk.lock(this);

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

    /* ------------------------------------------------------------------ */
    /* Kiosk mode                                                         */
    /* ------------------------------------------------------------------ */

    @Override
    protected void onResume() {
        super.onResume();
        if (!kiosk) return;
        pinToScreen();
        if (!Kiosk.hasCode(this)) askNewCode();
    }

    /** Nothing but the menu: no status bar, no home button, no other app. */
    private void pinToScreen() {
        try {
            DevicePolicyManager dpm = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
            if (dpm == null || !dpm.isLockTaskPermitted(getPackageName())) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                ActivityManager am = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
                if (am != null && am.getLockTaskModeState() != ActivityManager.LOCK_TASK_MODE_NONE) return;
            }
            startLockTask();
        } catch (RuntimeException ignored) {
            // the menu still works, only less locked down
        }
    }

    /** Hidden gesture for the staff: 5 quick taps in the top-right corner open the code prompt. */
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        if (kiosk && ev.getActionMasked() == MotionEvent.ACTION_DOWN) {
            float corner = 96 * getResources().getDisplayMetrics().density;
            int width = getWindow().getDecorView().getWidth();
            if (ev.getX() >= width - corner && ev.getY() <= corner) {
                long now = SystemClock.uptimeMillis();
                System.arraycopy(cornerTaps, 1, cornerTaps, 0, ADMIN_TAPS - 1);
                cornerTaps[ADMIN_TAPS - 1] = now;
                if (cornerTaps[0] != 0 && now - cornerTaps[0] <= ADMIN_TAPS_MS) {
                    Arrays.fill(cornerTaps, 0);
                    askCode();
                }
            } else {
                Arrays.fill(cornerTaps, 0);
            }
        }
        return super.dispatchTouchEvent(ev);
    }

    private boolean dialogOpen() {
        return dialog != null && dialog.isShowing();
    }

    private EditText codeField(String hint) {
        EditText field = new EditText(this);
        field.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        field.setFilters(new InputFilter[]{new InputFilter.LengthFilter(8)});
        field.setHint(hint);
        return field;
    }

    private AlertDialog.Builder codeDialog(String title, String message, EditText... fields) {
        int pad = (int) (24 * getResources().getDisplayMetrics().density);
        LinearLayout box = new LinearLayout(this);
        box.setOrientation(LinearLayout.VERTICAL);
        box.setPadding(pad, pad / 2, pad, 0);
        for (EditText f : fields) box.addView(f);
        return new AlertDialog.Builder(this, android.R.style.Theme_Material_Light_Dialog_Alert)
                .setTitle(title)
                .setMessage(message)
                .setView(box);
    }

    private void show(AlertDialog.Builder builder) {
        dialog = builder.create();
        if (dialog.getWindow() != null) {
            dialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE);
        }
        dialog.show();
    }

    private void toast(String text) {
        Toast.makeText(this, text, Toast.LENGTH_LONG).show();
    }

    /** First start in kiosk mode (or code change): the staff chooses the administrator code. */
    private void askNewCode() {
        if (dialogOpen()) return;
        final EditText first = codeField("Code (4 à 8 chiffres)");
        final EditText second = codeField("Répéter le code");
        show(codeDialog("Code administrateur",
                "Choisissez le code qui permettra au personnel de sortir du menu et d'accéder à la tablette. "
                        + "Notez-le : sans ce code, il faudra réinitialiser la tablette.", first, second)
                .setCancelable(false)
                .setPositiveButton("Enregistrer", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface d, int which) {
                        String code = first.getText().toString();
                        if (!Kiosk.isValidCode(code)) {
                            toast("Le code doit contenir 4 à 8 chiffres.");
                        } else if (!code.equals(second.getText().toString())) {
                            toast("Les deux codes sont différents.");
                        } else {
                            Kiosk.setCode(MainActivity.this, code);
                            toast("Code enregistré. Pour l'utiliser : 5 appuis rapides dans le coin en haut à droite.");
                            return;
                        }
                        dialog = null;
                        askNewCode();
                    }
                }));
    }

    /** Staff access: the right code gives back the whole tablet. */
    private void askCode() {
        if (dialogOpen() || !Kiosk.hasCode(this)) return;
        if (SystemClock.elapsedRealtime() < codeBlockedUntil) {
            toast("Trop d'essais. Réessayez dans une minute.");
            return;
        }
        final EditText field = codeField("Code administrateur");
        show(codeDialog("Accès administrateur", "Saisissez le code pour accéder à la tablette.", field)
                .setNegativeButton("Annuler", null)
                .setNeutralButton("Changer le code", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface d, int which) {
                        if (!codeIsRight(field.getText().toString())) return;
                        dialog = null;
                        askNewCode();
                    }
                })
                .setPositiveButton("Déverrouiller", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface d, int which) {
                        if (codeIsRight(field.getText().toString())) leaveKiosk();
                    }
                }));
    }

    private boolean codeIsRight(String code) {
        if (Kiosk.checkCode(this, code)) {
            wrongCodes = 0;
            return true;
        }
        if (++wrongCodes >= MAX_WRONG_CODES) {
            wrongCodes = 0;
            codeBlockedUntil = SystemClock.elapsedRealtime() + WRONG_CODE_PAUSE_MS;
        }
        toast("Code incorrect.");
        return false;
    }

    /** Back to the normal Samsung home screen, until the menu app is opened again. */
    private void leaveKiosk() {
        try {
            stopLockTask();
        } catch (RuntimeException ignored) {
            // was not pinned
        }
        Kiosk.unlock(this);
        toast("Tablette déverrouillée. Pour la reverrouiller, ouvrez « Jalmogoyo Menu ».");
        try {
            startActivity(new Intent(Intent.ACTION_MAIN)
                    .addCategory(Intent.CATEGORY_HOME)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
        } catch (RuntimeException ignored) {
            // no other home screen: stay on the menu
        }
        finish();
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
        if (dialogOpen()) dialog.dismiss();
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
