if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SliderCustomDialog_Params {
    fontSizeOffset?: number;
    currentValue?: number;
    SliderCustomDialogController?: CustomDialogController;
}
import PreferencesUtil from "@bundle:com.example.pageanddata/entry/ets/common/database/PreferencesUtil";
export class SliderCustomDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__fontSizeOffset = this.createStorageLink('fontSizeOffset', 4, "fontSizeOffset");
        this.__currentValue = new ObservedPropertySimplePU(0, this, "currentValue");
        this.SliderCustomDialogController = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SliderCustomDialog_Params) {
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
        if (params.SliderCustomDialogController !== undefined) {
            this.SliderCustomDialogController = params.SliderCustomDialogController;
        }
    }
    updateStateVars(params: SliderCustomDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__fontSizeOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__currentValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__fontSizeOffset.aboutToBeDeleted();
        this.__currentValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __fontSizeOffset: ObservedPropertyAbstractPU<number>;
    get fontSizeOffset() {
        return this.__fontSizeOffset.get();
    }
    set fontSizeOffset(newValue: number) {
        this.__fontSizeOffset.set(newValue);
    }
    private __currentValue: ObservedPropertySimplePU<number>;
    get currentValue() {
        return this.__currentValue.get();
    }
    set currentValue(newValue: number) {
        this.__currentValue.set(newValue);
    }
    private SliderCustomDialogController?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.SliderCustomDialogController = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.width('360vp');
            Column.backgroundColor('#ffffff');
            Column.borderRadius('16vp');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.font({
                size: '20fp',
                weight: 700
            });
            Text.textAlign(TextAlign.Center);
            Text.opacity(0.9);
            Text.width('312vp');
            Text.height('27vp');
            Text.margin({
                top: '15vp',
                bottom: '15vp',
                left: '24vp',
                right: '24vp'
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('A');
            Text.font({
                size: '12fp',
                weight: 700
            });
            Text.margin({ right: '4vp' });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.fontSizeOffset,
                min: -4,
                max: 4
            });
            Slider.margin({ right: '4vp' });
            Slider.width('304vp');
            Slider.onChange((data: number) => {
                this.currentValue = data;
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('A');
            Text.font({
                size: '20fp',
                weight: 700
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({
                top: '15vp',
                bottom: '15vp'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Button.width('156vp');
            Button.height('41vp');
            Button.margin({
                left: '16vp',
                right: '16vp'
            });
            Button.backgroundColor('#0d000000');
            Button.fontColor('#0A59F7');
            Button.onClick(() => {
                this.SliderCustomDialogController?.close();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Button.width('156vp');
            Button.height('41vp');
            Button.margin({ right: '16vp' });
            Button.onClick(() => {
                PreferencesUtil.saveChangeFontSize(this.currentValue);
                this.fontSizeOffset = this.currentValue;
                this.SliderCustomDialogController?.close();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
