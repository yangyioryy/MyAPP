if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Home_Params {
    fontSizeOffset?: number;
    httpGridItems?: Array<ListInfo>;
    pictureUri?: string;
    pathStack?: NavPathStack;
    swiperController?: SwiperController;
    context?;
    applicationContext?;
    cacheDir?;
}
import type common from "@ohos:app.ability.common";
import mainViewModel from "@bundle:com.example.pageanddata/entry/ets/viewmodel/MainViewModel";
import type ItemData from '../viewmodel/ItemData';
import type ListInfo from '../viewmodel/ResponseData/ListInfo';
import { RCPUtils } from "@bundle:com.example.pageanddata/entry/ets/common/network/RCPUtils";
export default class Home extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__fontSizeOffset = this.createStorageLink('fontSizeOffset', 0, "fontSizeOffset");
        this.__httpGridItems = new ObservedPropertyObjectPU([], this, "httpGridItems");
        this.__pictureUri = new ObservedPropertySimplePU('', this, "pictureUri");
        this.__pathStack = new SynchedPropertyObjectTwoWayPU(params.pathStack, this, "pathStack");
        this.swiperController = new SwiperController();
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.applicationContext = this.context.getApplicationContext();
        this.cacheDir = this.applicationContext.filesDir;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Home_Params) {
        if (params.httpGridItems !== undefined) {
            this.httpGridItems = params.httpGridItems;
        }
        if (params.pictureUri !== undefined) {
            this.pictureUri = params.pictureUri;
        }
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.applicationContext !== undefined) {
            this.applicationContext = params.applicationContext;
        }
        if (params.cacheDir !== undefined) {
            this.cacheDir = params.cacheDir;
        }
    }
    updateStateVars(params: Home_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__fontSizeOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__httpGridItems.purgeDependencyOnElmtId(rmElmtId);
        this.__pictureUri.purgeDependencyOnElmtId(rmElmtId);
        this.__pathStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__fontSizeOffset.aboutToBeDeleted();
        this.__httpGridItems.aboutToBeDeleted();
        this.__pictureUri.aboutToBeDeleted();
        this.__pathStack.aboutToBeDeleted();
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
    private __httpGridItems: ObservedPropertyObjectPU<Array<ListInfo>>;
    get httpGridItems() {
        return this.__httpGridItems.get();
    }
    set httpGridItems(newValue: Array<ListInfo>) {
        this.__httpGridItems.set(newValue);
    }
    private __pictureUri: ObservedPropertySimplePU<string>;
    get pictureUri() {
        return this.__pictureUri.get();
    }
    set pictureUri(newValue: string) {
        this.__pictureUri.set(newValue);
    }
    private __pathStack: SynchedPropertySimpleOneWayPU<NavPathStack>;
    get pathStack() {
        return this.__pathStack.get();
    }
    set pathStack(newValue: NavPathStack) {
        this.__pathStack.set(newValue);
    }
    private swiperController: SwiperController;
    private context;
    private applicationContext;
    private cacheDir;
    async aboutToAppear(): Promise<void> {
        // let httpUtil: HttpUtils = new HttpUtils();
        // this.httpGridItems = await httpUtil.postHttpRequest();
        // this.pictureUri = await httpUtil.getHttpRequest(this.cacheDir);
        // httpUtil.destroyHttpRequest();
        let rcpUtil: RCPUtils = new RCPUtils();
        this.httpGridItems = await rcpUtil.postRCPRequest();
        this.pictureUri = await rcpUtil.getRCPRequest(this.cacheDir);
        rcpUtil.destroySession();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.alignItems(HorizontalAlign.Start);
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777264, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
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
            Scroll.create();
            Scroll.height('660vp');
            Scroll.align(Alignment.TopStart);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.swiperController);
            Swiper.autoPlay(true);
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const img = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(img);
                    Image.width('100%');
                    Image.borderRadius('16vp');
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, mainViewModel.getSwiperImages(), forEachItemGenFunction, (img: Resource) => JSON.stringify(img.id), false, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.backgroundImage({ "id": 16777396, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Grid.backgroundImageSize({
                width: '100%',
                height: '156vp'
            });
            Grid.columnsTemplate('1fr 1fr 1fr 1fr');
            Grid.rowsTemplate('1fr 1fr');
            Grid.columnsGap('8vp');
            Grid.rowsGap('12vp');
            Grid.margin({ top: '12vp' });
            Grid.padding({
                top: '12vp',
                bottom: '12vp'
            });
            Grid.height('156vp');
            Grid.backgroundColor(Color.White);
            Grid.borderRadius('16vp');
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.onClick(() => {
                            if (index === 4) {
                                this.pathStack.pushPathByName('GoalPage', null);
                            }
                        });
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.img);
                            Image.width('40vp');
                            Image.height('40vp');
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.fontSize(12 + this.fontSizeOffset);
                            Text.margin({ top: '4vp' });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, mainViewModel.getFirstGridData(), forEachItemGenFunction, (item: ItemData) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777255, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.fontSize('18fp');
            Text.fontWeight(700);
            Text.width('100%');
            Text.margin({
                top: '18vp',
                bottom: '8vp'
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.scrollBar(BarState.Off);
            List.width('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const secondItem = _item;
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
                        ListItem.margin({ bottom: '8vp' });
                        ListItem.borderRadius('16vp');
                        ListItem.backgroundColor('#ffffff');
                        ListItem.borderRadius({ "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                        ListItem.align(Alignment.TopStart);
                        ListItem.width('100%');
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({
                                left: '12vp',
                                right: '12vp',
                                top: '12vp',
                                bottom: '12vp'
                            });
                            Row.justifyContent(FlexAlign.SpaceBetween);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(secondItem.indexNavPic);
                            Image.width('130vp');
                            Image.height('80vp');
                            Image.objectFit(ImageFit.TOP_START);
                            Image.borderRadius(8);
                            Image.margin({ right: '12vp' });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(secondItem.activityName);
                            Text.width('190vp');
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.maxLines(1);
                            Text.fontSize(16 + this.fontSizeOffset);
                            Text.fontWeight(FontWeight.Medium);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(secondItem.theme);
                            Text.width('190vp');
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.maxLines(2);
                            Text.margin({ top: '4vp' });
                            Text.fontSize(12 + this.fontSizeOffset);
                            Text.fontColor('#99182431');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('170vp');
                            Row.margin({ top: '10.5vp' });
                            Row.justifyContent(FlexAlign.End);
                            Row.alignItems(VerticalAlign.Bottom);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(this.pictureUri);
                            Image.width('20vp');
                            Image.opacity(0.5);
                        }, Image);
                        Row.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.httpGridItems, forEachItemGenFunction, (secondItem: ListInfo) => JSON.stringify(secondItem), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
