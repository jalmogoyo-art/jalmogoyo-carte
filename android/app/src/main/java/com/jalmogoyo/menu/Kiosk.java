package com.jalmogoyo.menu;

import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.UserManager;
import android.util.Log;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;

/**
 * Kiosk mode: the tablet shows the menu and nothing else.
 *
 * Only available when the tablet was set up with the kiosk QR code (www/kiosque.html), which makes
 * this app the "device owner". On any other tablet every method here does nothing.
 */
final class Kiosk {

    private static final String TAG = "JalmogoyoKiosk";
    private static final String PREFS = "kiosk";
    private static final String KEY_SALT = "salt";
    private static final String KEY_HASH = "hash";

    private Kiosk() {
    }

    private static DevicePolicyManager dpm(Context c) {
        return (DevicePolicyManager) c.getSystemService(Context.DEVICE_POLICY_SERVICE);
    }

    private static ComponentName admin(Context c) {
        return new ComponentName(c, KioskAdminReceiver.class);
    }

    private static ComponentName homeAlias(Context c) {
        return new ComponentName(c.getPackageName(), c.getPackageName() + ".KioskHome");
    }

    /** True when this app manages the tablet, i.e. kiosk mode is possible. */
    static boolean isOwner(Context c) {
        DevicePolicyManager dpm = dpm(c);
        return dpm != null && dpm.isDeviceOwnerApp(c.getPackageName());
    }

    /** Menu only: the menu becomes the home screen and nothing else can be opened. */
    static void lock(Context c) {
        if (!isOwner(c)) return;
        DevicePolicyManager dpm = dpm(c);
        ComponentName admin = admin(c);
        try {
            // the menu may take over the screen (no status bar, no home / recent-apps buttons)
            dpm.setLockTaskPackages(admin, new String[]{c.getPackageName()});
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                // keep only the power menu, so that the staff can switch the tablet off
                dpm.setLockTaskFeatures(admin, DevicePolicyManager.LOCK_TASK_FEATURE_GLOBAL_ACTIONS);
            }

            // the menu is the home screen: it is what shows when the tablet is switched on
            c.getPackageManager().setComponentEnabledSetting(homeAlias(c),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);
            IntentFilter home = new IntentFilter(Intent.ACTION_MAIN);
            home.addCategory(Intent.CATEGORY_HOME);
            home.addCategory(Intent.CATEGORY_DEFAULT);
            dpm.addPersistentPreferredActivity(admin, home, homeAlias(c));

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                dpm.setKeyguardDisabled(admin, true);                          // no lock screen in the way
                dpm.addUserRestriction(admin, UserManager.DISALLOW_SAFE_BOOT); // no way round by restarting
            }
        } catch (RuntimeException e) {
            Log.w(TAG, "lock", e);
        }
    }

    /** Administrator access: the normal Samsung home screen comes back until the menu is opened again. */
    static void unlock(Context c) {
        if (!isOwner(c)) return;
        try {
            dpm(c).clearPackagePersistentPreferredActivities(admin(c), c.getPackageName());
            c.getPackageManager().setComponentEnabledSetting(homeAlias(c),
                    PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
        } catch (RuntimeException e) {
            Log.w(TAG, "unlock", e);
        }
    }

    /* ---------- administrator code (chosen on the tablet, never stored in clear) ---------- */

    static boolean isValidCode(String code) {
        return code != null && code.matches("\\d{4,8}");
    }

    static boolean hasCode(Context c) {
        return prefs(c).contains(KEY_HASH);
    }

    static void setCode(Context c, String code) {
        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);
        String saltHex = hex(salt);
        prefs(c).edit().putString(KEY_SALT, saltHex).putString(KEY_HASH, hash(saltHex, code)).apply();
    }

    static boolean checkCode(Context c, String code) {
        SharedPreferences p = prefs(c);
        String salt = p.getString(KEY_SALT, null);
        String expected = p.getString(KEY_HASH, null);
        if (salt == null || expected == null || code == null) return false;
        return MessageDigest.isEqual(expected.getBytes(StandardCharsets.UTF_8),
                hash(salt, code).getBytes(StandardCharsets.UTF_8));
    }

    private static SharedPreferences prefs(Context c) {
        return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    private static String hash(String salt, String code) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return hex(md.digest((salt + ":" + code).getBytes(StandardCharsets.UTF_8)));
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }

    private static String hex(byte[] bytes) {
        StringBuilder sb = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) sb.append(String.format("%02x", b & 0xff));
        return sb.toString();
    }
}
