import preferences from "@ohos:data.preferences";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
const KEY_APP_FONT_SIZE = 'appFontSize';
const TAG = 'PreferencesUtil';
/**
 * The PreferencesUtil provides preferences of create, save and query.
 */
class PreferencesUtil {
    preference?: preferences.Preferences;
    /**
     *The method of creating a preferences Instance.
     */
    getFontPreferences(context: Context) {
        try {
            this.preference = preferences.getPreferencesSync(context, { name: 'FontPreferences' });
            hilog.info(0x0000, TAG, 'create success');
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x00, TAG, `create failed, code = ${err.code}, message = ${err.message}`);
        }
    }
    /**
     *The method of saving fontsize offset change.
     */
    saveChangeFontSize(fontSizeOffset: number) {
        try {
            this.preference?.putSync(KEY_APP_FONT_SIZE, fontSizeOffset);
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x00, TAG, `putSync failed, code = ${err.code}, message = ${err.message}`);
        }
        this.preference?.flush((err: BusinessError) => {
            if (err) {
                hilog.error(0x0000, TAG, 'Failed to flush. code =' + err.code + ', message =' + err.message);
                return;
            }
            hilog.info(0x0000, TAG, 'Succeeded in flushing.');
        });
    }
    /**
     *The method of getting fontsize offset.
     */
    getChangeFontSize() {
        let fontSizeOffset: number = 0;
        try {
            fontSizeOffset = this.preference?.getSync(KEY_APP_FONT_SIZE, 0) as number;
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x00, TAG, `getSync failed, code = ${err.code}, message = ${err.message}`);
        }
        return fontSizeOffset;
    }
    /**
     *The method of Determining Whether a key Exists.
     */
    isKeyExist(): boolean {
        let isKeyExist: boolean = false;
        this.preference?.has(KEY_APP_FONT_SIZE).then((isExist: boolean) => {
            isKeyExist = isExist;
        }).catch((err: Error) => {
            hilog.error(0x0000, TAG, 'Has the value failed with err: ' + err);
        });
        return isKeyExist;
    }
}
export default new PreferencesUtil();
