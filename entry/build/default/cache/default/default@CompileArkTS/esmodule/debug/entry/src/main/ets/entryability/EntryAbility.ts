import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import PreferencesUtil from "@bundle:com.example.pageanddata/entry/ets/common/database/PreferencesUtil";
import RDBStoreUtil from "@bundle:com.example.pageanddata/entry/ets/common/database/RDBStoreUtil";
import ConnectionUtils from "@bundle:com.example.pageanddata/entry/ets/common/network/ConnectionUtils";
/**
 * Lift cycle management of Ability.
 */
export default class entryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        PreferencesUtil.getFontPreferences(this.context);
        ConnectionUtils.openRegister();
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
        hilog.info(0x0000, 'testTag', '%{public}s', 'want param:' + JSON.stringify(want) ?? '');
        hilog.info(0x0000, 'testTag', '%{public}s', 'launchParam:' + JSON.stringify(launchParam) ?? '');
    }
    onDestroy(): void | Promise<void> {
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // Main window is created, set main page for this ability
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage.getMainWindow().then((data: window.Window) => {
            // Window immersive.
            data.setWindowLayoutFullScreen(true).catch((err: BusinessError) => {
                hilog.error(0x00, 'testTag', `setWindowLayoutFullScreen failed, code = ${err.code}, message = ${err.message}`);
            });
        }).catch((err: BusinessError) => {
            hilog.error(0x00, 'testTag', `getMainWindow failed, code = ${err.code}, message = ${err.message}`);
        });
        RDBStoreUtil.createObjectiveRDB(this.context);
        windowStage.loadContent('pages/LoginPage', (err, data) => {
            if (err.code) {
                hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.ERROR);
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            try {
                let context: UIContext = windowStage.getMainWindowSync().getUIContext();
                ConnectionUtils.registerNetworkAvailableStatus(context);
            }
            catch (error) {
                let err = error as BusinessError;
                hilog.error(0x00, 'testTag', `getUIContext failed, code = ${err.code}, message = ${err.message}`);
            }
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }
    onWindowStageDestroy(): void {
        // Main window is destroyed, release UI related resources
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
        ConnectionUtils.closeRegister();
    }
    onForeground(): void {
        // Ability has brought to foreground
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability has back to background
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
