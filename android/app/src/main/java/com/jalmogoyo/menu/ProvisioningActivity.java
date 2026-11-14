package com.jalmogoyo.menu;

import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.Intent;
import android.os.Bundle;

/**
 * Invisible screen used by the tablet's set-up wizard while the kiosk QR code is being applied:
 * first it asks which kind of set-up we want, then it lets us apply our rules.
 */
public class ProvisioningActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String action = getIntent() == null ? null : getIntent().getAction();
        if (DevicePolicyManager.ACTION_GET_PROVISIONING_MODE.equals(action)) {
            Intent result = new Intent();
            result.putExtra(DevicePolicyManager.EXTRA_PROVISIONING_MODE,
                    DevicePolicyManager.PROVISIONING_MODE_FULLY_MANAGED_DEVICE);
            setResult(RESULT_OK, result);
        } else {
            Kiosk.lock(this);
            setResult(RESULT_OK);
        }
        finish();
    }
}
