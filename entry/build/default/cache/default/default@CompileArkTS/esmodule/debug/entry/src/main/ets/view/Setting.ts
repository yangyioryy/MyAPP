if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Setting_Params {
    fontSizeOffset?: number;
    SliderCustomDialogController?: CustomDialogController;
}
import type ItemData from '../viewmodel/ItemData';
import mainViewModel from "@bundle:com.example.pageanddata/entry/ets/viewmodel/MainViewModel";
import { SliderCustomDialog } from "@bundle:com.example.pageanddata/entry/ets/view/SliderCustomDialog";
export default class Setting extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__fontSizeOffset = this.createStorageLink('fontSizeOffset', 0, "fontSizeOffset");
        this.SliderCustomDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SliderCustomDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/view/Setting.ets", line: 27, col: 14 });
                jsDialog.setController(this.SliderCustomDialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            customStyle: true,
            offset: { dx: 0, dy: -25 }
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Setting_Params) {
        if (params.SliderCustomDialogController !== undefined) {
            this.SliderCustomDialogController = params.SliderCustomDialogController;
        }
    }
    updateStateVars(params: Setting_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__fontSizeOffset.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__fontSizeOffset.aboutToBeDeleted();
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
    private SliderCustomDialogController: CustomDialogController;
    settingCell(item: ItemData, customDialogController: CustomDialogController, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.onClick(() => {
                if (item.id === 1) {
                    customDialogController.open();
                }
            });
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('100%');
            Row.padding({
                left: '8vp',
                right: '22vp'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({});
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.img);
            Image.height('22vp');
            Image.margin({
                left: '16vp',
                right: '12vp'
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontSize(16 + this.fontSizeOffset);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.others === undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777430, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                        Image.width('12vp');
                        Image.height('24vp');
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Switch, isOn: false });
                    }, Toggle);
                    Toggle.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777265, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.width('100%');
            Text.margin({
                top: '48vp',
                bottom: '12vp'
            });
            Text.fontWeight(700);
            Text.fontSize(26 + this.fontSizeOffset);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Image.width('48vp');
            Image.height('48vp');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: '12vp' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777287, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.fontSize(20 + this.fontSizeOffset);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777286, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.fontSize(12 + this.fontSizeOffset);
            Text.margin({ top: '4vp' });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12 });
            List.scrollBar(BarState.Off);
            List.width('100%');
            List.padding({
                top: 4,
                bottom: 4
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ListItemGroup.create();
                    ListItemGroup.divider({
                        strokeWidth: '1vp',
                        color: '#0d000000',
                        startMargin: '42vp',
                        endMargin: '24vp'
                    });
                    ListItemGroup.backgroundColor('#ffffff');
                    ListItemGroup.borderRadius('16vp');
                }, ListItemGroup);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const cell = _item;
                        {
                            const itemCreation = (elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                ListItem.create(deepRenderFunction, true);
                                if (!isInitialRender) {
                                    ListItem.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            };
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                ListItem.create(deepRenderFunction, true);
                                ListItem.height('48vp');
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.settingCell.bind(this)(cell, this.SliderCustomDialogController);
                                ListItem.pop();
                            };
                            this.observeComponentCreation2(itemCreation2, ListItem);
                            ListItem.pop();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, item, forEachItemGenFunction, (cell: ItemData) => JSON.stringify(cell), false, false);
                }, ForEach);
                ForEach.pop();
                ListItemGroup.pop();
            };
            this.forEachUpdateFunction(elmtId, mainViewModel.getSettingListData(), forEachItemGenFunction, (item: ItemData) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777288, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { type: ButtonType.Capsule });
            Button.width('90%');
            Button.height('40vp');
            Button.fontSize(16 + this.fontSizeOffset);
            Button.fontColor('#FA2A2D');
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor('#E5E8EA');
            Button.margin({ bottom: '16vp' });
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
