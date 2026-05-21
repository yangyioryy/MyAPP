if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    fontSizeOffset?: number;
    currentIndex?: number;
    pathStack?: NavPathStack;
    tabsController?: TabsController;
}
import PreferencesUtil from "@bundle:com.example.pageanddata/entry/ets/common/database/PreferencesUtil";
import Home from "@bundle:com.example.pageanddata/entry/ets/view/Home";
import Setting from "@bundle:com.example.pageanddata/entry/ets/view/Setting";
export function MainPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new MainPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 22, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "MainPage" });
    }
}
export class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__fontSizeOffset = this.createStorageLink('fontSizeOffset', 0, "fontSizeOffset");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__pathStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "pathStack");
        this.tabsController = new TabsController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
        if (params.tabsController !== undefined) {
            this.tabsController = params.tabsController;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__fontSizeOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__pathStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__fontSizeOffset.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
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
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __pathStack: ObservedPropertyObjectPU<NavPathStack>;
    get pathStack() {
        return this.__pathStack.get();
    }
    set pathStack(newValue: NavPathStack) {
        this.__pathStack.set(newValue);
    }
    private tabsController: TabsController;
    aboutToAppear() {
        this.fontSizeOffset = PreferencesUtil.getChangeFontSize();
    }
    TabBuilder(title: Resource, index: number, selectedImg: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor('#F1F3F5');
            Column.justifyContent(FlexAlign.Center);
            Column.height('56vp');
            Column.width('100%');
            Column.onClick(() => {
                this.currentIndex = index;
                this.tabsController.changeIndex(this.currentIndex);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(selectedImg);
            SymbolGlyph.fontSize('24fp');
            SymbolGlyph.renderingStrategy(SymbolRenderingStrategy.MULTIPLE_OPACITY);
            SymbolGlyph.symbolEffect(new BounceSymbolEffect(EffectScope.WHOLE, EffectDirection.UP), this.currentIndex === index ? true : false);
            SymbolGlyph.fontColor(this.currentIndex === index ? ['#0a59f7'] : ['#66000000']);
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.margin({ top: '4vp' });
            Text.fontSize(10 + this.fontSizeOffset);
            Text.fontWeight(500);
            Text.fontColor(this.currentIndex === index ? '#0a59f7' : '#66000000');
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Tabs.create({
                        barPosition: BarPosition.End,
                        controller: this.tabsController
                    });
                    Tabs.margin({ bottom: '64vp' });
                    Tabs.width('100%');
                    Tabs.height('100%');
                    Tabs.barHeight('80vp');
                    Tabs.barMode(BarMode.Fixed);
                    Tabs.onChange((index: number) => {
                        this.currentIndex = index;
                    });
                }, Tabs);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new Home(this, { pathStack: this.__pathStack }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 71, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            pathStack: this.pathStack
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "Home" });
                        }
                    });
                    TabContent.padding({
                        left: '12vp',
                        right: '12vp'
                    });
                    TabContent.backgroundColor('#F1F3F5');
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, { "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, 0, { "id": 125831534, "type": 40000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                        } });
                }, TabContent);
                TabContent.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new Setting(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 81, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "Setting" });
                        }
                    });
                    TabContent.padding({
                        left: '12vp',
                        right: '12vp'
                    });
                    TabContent.backgroundColor('#F1F3F5');
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, { "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, 1, { "id": 125831250, "type": 40000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                        } });
                }, TabContent);
                TabContent.pop();
                Tabs.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/MainPage" });
            NavDestination.height('100%');
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor('#F1F3F5');
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pathStack = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("MainPage", wrapBuilder(MainPageBuilder));
    }
})();
