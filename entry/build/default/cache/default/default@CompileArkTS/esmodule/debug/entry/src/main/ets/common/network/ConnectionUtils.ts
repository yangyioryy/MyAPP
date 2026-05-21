import connection from "@ohos:net.connection";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
const TAG: string = 'ConnectionUtils';
/**
 * The ConnectionUtils provides the network listening capability.
 */
class ConnectionUtils {
    netConnection = connection.createNetConnection();
    /**
     *The method of checking whether the monitoring network is connected..
     */
    isNetworkConnected(): boolean {
        let result: boolean = false;
        try {
            let data = connection.getDefaultNetSync();
            if (data.netId === 0) {
                hilog.info(0x0000, TAG, 'network error');
                return false;
            }
            let netCapabilities = connection.getNetCapabilitiesSync(data);
            let bearerTypes: Set<number> = new Set(netCapabilities.bearerTypes);
            let bearerTypesNum = Array.from(bearerTypes.values());
            for (let item of bearerTypesNum) {
                if (item === 0) {
                    result = true;
                    hilog.info(0x0000, TAG, 'BEARER_CELLULAR');
                }
                else if (item === 1) {
                    result = true;
                    hilog.info(0x0000, TAG, 'BEARER_WIFI');
                }
                else if (item === 3) {
                    result = true;
                    hilog.info(0x0000, TAG, 'BEARER_ETHERNET');
                }
                else {
                    hilog.info(0x0000, TAG, 'OTHER TYPE');
                }
            }
        }
        catch (error) {
            hilog.error(0x00, TAG, `getDefaultNet failed, code = ${error.code}, message = ${error.message}`);
        }
        return result;
    }
    /**
     *The method of opening register.
     */
    openRegister() {
        this.netConnection.register((error: BusinessError) => {
            hilog.info(0x0000, TAG, JSON.stringify(error));
        });
    }
    /**
     *The method of listening to the network status.
     */
    registerNetworkAvailableStatus(context: UIContext) {
        this.netConnection.on('netAvailable', () => {
            try {
                context.getPromptAction().showToast({
                    message: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                    duration: 2000
                });
            }
            catch (error) {
                let err = error as BusinessError;
                hilog.error(0x00, TAG, `showToast failed, code = ${err.code}, message = ${err.message}`);
            }
        });
        this.netConnection.on('netUnavailable', () => {
            try {
                context.getPromptAction().showToast({
                    message: { "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                    duration: 2000
                });
            }
            catch (error) {
                let err = error as BusinessError;
                hilog.error(0x00, TAG, `showToast failed, code = ${err.code}, message = ${err.message}`);
            }
        });
        this.netConnection.on('netLost', () => {
            try {
                context.getPromptAction().showToast({
                    message: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                    duration: 2000
                });
            }
            catch (error) {
                let err = error as BusinessError;
                hilog.error(0x00, TAG, `showToast failed, code = ${err.code}, message = ${err.message}`);
            }
        });
    }
    /**
     *The method of closing register.
     */
    closeRegister() {
        this.netConnection.unregister((error: BusinessError) => {
            hilog.info(0x0000, TAG, JSON.stringify(error));
        });
    }
}
export default new ConnectionUtils();
