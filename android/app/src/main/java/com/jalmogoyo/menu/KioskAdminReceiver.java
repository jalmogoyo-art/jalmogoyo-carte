package com.jalmogoyo.menu;

import android.app.admin.DeviceAdminReceiver;
import android.content.Context;
import android.content.Intent;

/** Lets this app manage the tablet when it was set up with the kiosk QR code. */
public class KioskAdminReceiver extends DeviceAdminReceiver {

    @Override
    public void onProfileProvisioningComplete(Context context, Intent intent) {
        Kiosk.lock(context);
    }
}
