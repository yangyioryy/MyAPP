if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GoalPage_Params {
    plansSet?: Array<GoalItem>;
    plan?: GoalItem;
    durationSelectOptions?: Array<SelectOption>;
    durationSet?: Array<number>;
    currentDuration?: number | undefined;
    currentStatus?: boolean | undefined;
    isUpdateShow?: boolean;
    isInsetShow?: boolean;
    currentPlan?: GoalItem;
    duration?: number;
    status?: boolean;
    addSportID?: number;
    addDuration?: number;
    addStatus?: boolean;
}
import hilog from "@ohos:hilog";
import RDBStoreUtil from "@bundle:com.example.pageanddata/entry/ets/common/database/RDBStoreUtil";
import { GoalItem } from "@bundle:com.example.pageanddata/entry/ets/viewmodel/GoalItem";
const TAG = 'GoalPage';
export function GoalPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new GoalPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GoalPage.ets", line: 24, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "GoalPage" });
    }
}
export class GoalPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__plansSet = new ObservedPropertyObjectPU([], this, "plansSet");
        this.__plan = new ObservedPropertyObjectPU(new GoalItem(0, '', '', 0, ''), this, "plan");
        this.__durationSelectOptions = new ObservedPropertyObjectPU([], this, "durationSelectOptions");
        this.__durationSet = new ObservedPropertyObjectPU([], this, "durationSet");
        this.__currentDuration = new ObservedPropertyObjectPU(undefined, this, "currentDuration");
        this.__currentStatus = new ObservedPropertySimplePU(undefined, this, "currentStatus");
        this.__isUpdateShow = new ObservedPropertySimplePU(false, this, "isUpdateShow");
        this.__isInsetShow = new ObservedPropertySimplePU(false, this, "isInsetShow");
        this.__currentPlan = new ObservedPropertyObjectPU(new GoalItem(0, '', '', 0, ''), this, "currentPlan");
        this.__duration = new ObservedPropertySimplePU(0, this, "duration");
        this.__status = new ObservedPropertySimplePU(false, this, "status");
        this.__addSportID = new ObservedPropertySimplePU(0, this, "addSportID");
        this.__addDuration = new ObservedPropertySimplePU(0, this, "addDuration");
        this.__addStatus = new ObservedPropertySimplePU(false, this, "addStatus");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GoalPage_Params) {
        if (params.plansSet !== undefined) {
            this.plansSet = params.plansSet;
        }
        if (params.plan !== undefined) {
            this.plan = params.plan;
        }
        if (params.durationSelectOptions !== undefined) {
            this.durationSelectOptions = params.durationSelectOptions;
        }
        if (params.durationSet !== undefined) {
            this.durationSet = params.durationSet;
        }
        if (params.currentDuration !== undefined) {
            this.currentDuration = params.currentDuration;
        }
        if (params.currentStatus !== undefined) {
            this.currentStatus = params.currentStatus;
        }
        if (params.isUpdateShow !== undefined) {
            this.isUpdateShow = params.isUpdateShow;
        }
        if (params.isInsetShow !== undefined) {
            this.isInsetShow = params.isInsetShow;
        }
        if (params.currentPlan !== undefined) {
            this.currentPlan = params.currentPlan;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
        if (params.addSportID !== undefined) {
            this.addSportID = params.addSportID;
        }
        if (params.addDuration !== undefined) {
            this.addDuration = params.addDuration;
        }
        if (params.addStatus !== undefined) {
            this.addStatus = params.addStatus;
        }
    }
    updateStateVars(params: GoalPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__plansSet.purgeDependencyOnElmtId(rmElmtId);
        this.__plan.purgeDependencyOnElmtId(rmElmtId);
        this.__durationSelectOptions.purgeDependencyOnElmtId(rmElmtId);
        this.__durationSet.purgeDependencyOnElmtId(rmElmtId);
        this.__currentDuration.purgeDependencyOnElmtId(rmElmtId);
        this.__currentStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__isUpdateShow.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsetShow.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPlan.purgeDependencyOnElmtId(rmElmtId);
        this.__duration.purgeDependencyOnElmtId(rmElmtId);
        this.__status.purgeDependencyOnElmtId(rmElmtId);
        this.__addSportID.purgeDependencyOnElmtId(rmElmtId);
        this.__addDuration.purgeDependencyOnElmtId(rmElmtId);
        this.__addStatus.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__plansSet.aboutToBeDeleted();
        this.__plan.aboutToBeDeleted();
        this.__durationSelectOptions.aboutToBeDeleted();
        this.__durationSet.aboutToBeDeleted();
        this.__currentDuration.aboutToBeDeleted();
        this.__currentStatus.aboutToBeDeleted();
        this.__isUpdateShow.aboutToBeDeleted();
        this.__isInsetShow.aboutToBeDeleted();
        this.__currentPlan.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
        this.__addSportID.aboutToBeDeleted();
        this.__addDuration.aboutToBeDeleted();
        this.__addStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __plansSet: ObservedPropertyObjectPU<Array<GoalItem>>;
    get plansSet() {
        return this.__plansSet.get();
    }
    set plansSet(newValue: Array<GoalItem>) {
        this.__plansSet.set(newValue);
    }
    private __plan: ObservedPropertyObjectPU<GoalItem>;
    get plan() {
        return this.__plan.get();
    }
    set plan(newValue: GoalItem) {
        this.__plan.set(newValue);
    }
    private __durationSelectOptions: ObservedPropertyObjectPU<Array<SelectOption>>;
    get durationSelectOptions() {
        return this.__durationSelectOptions.get();
    }
    set durationSelectOptions(newValue: Array<SelectOption>) {
        this.__durationSelectOptions.set(newValue);
    }
    private __durationSet: ObservedPropertyObjectPU<Array<number>>;
    get durationSet() {
        return this.__durationSet.get();
    }
    set durationSet(newValue: Array<number>) {
        this.__durationSet.set(newValue);
    }
    private __currentDuration: ObservedPropertyObjectPU<number | undefined>;
    get currentDuration() {
        return this.__currentDuration.get();
    }
    set currentDuration(newValue: number | undefined) {
        this.__currentDuration.set(newValue);
    }
    private __currentStatus: ObservedPropertySimplePU<boolean | undefined>;
    get currentStatus() {
        return this.__currentStatus.get();
    }
    set currentStatus(newValue: boolean | undefined) {
        this.__currentStatus.set(newValue);
    }
    private __isUpdateShow: ObservedPropertySimplePU<boolean>;
    get isUpdateShow() {
        return this.__isUpdateShow.get();
    }
    set isUpdateShow(newValue: boolean) {
        this.__isUpdateShow.set(newValue);
    }
    private __isInsetShow: ObservedPropertySimplePU<boolean>;
    get isInsetShow() {
        return this.__isInsetShow.get();
    }
    set isInsetShow(newValue: boolean) {
        this.__isInsetShow.set(newValue);
    }
    private __currentPlan: ObservedPropertyObjectPU<GoalItem>;
    get currentPlan() {
        return this.__currentPlan.get();
    }
    set currentPlan(newValue: GoalItem) {
        this.__currentPlan.set(newValue);
    }
    private __duration: ObservedPropertySimplePU<number>;
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private __status: ObservedPropertySimplePU<boolean>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: boolean) {
        this.__status.set(newValue);
    }
    private __addSportID: ObservedPropertySimplePU<number>;
    get addSportID() {
        return this.__addSportID.get();
    }
    set addSportID(newValue: number) {
        this.__addSportID.set(newValue);
    }
    private __addDuration: ObservedPropertySimplePU<number>;
    get addDuration() {
        return this.__addDuration.get();
    }
    set addDuration(newValue: number) {
        this.__addDuration.set(newValue);
    }
    private __addStatus: ObservedPropertySimplePU<boolean>;
    get addStatus() {
        return this.__addStatus.get();
    }
    set addStatus(newValue: boolean) {
        this.__addStatus.set(newValue);
    }
    updateBindSheet(planData: GoalItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('90%');
            Row.margin({
                top: '15vp',
                bottom: '15vp'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777297, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.font({
                size: '16fp',
                weight: 500
            });
            Text.opacity(0.9);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('150vp');
            Row.borderRadius('20vp');
            Row.height('40vp');
            Row.backgroundColor('#0C000000');
            Row.padding({ left: '16vp' });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(planData.sportName);
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.margin({ bottom: '15vp' });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.font({
                size: '16fp',
                weight: 400
            });
            Text.opacity(0.9);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: planData.duration.toString() });
            TextInput.onChange((data: string) => {
                this.duration = Number.parseInt(data);
            });
            TextInput.width('150vp');
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.margin({ bottom: '15vp' });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.font({
                size: '16fp',
                weight: 400
            });
            Text.opacity(0.9);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                { value: { "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } }
            ]);
            Select.width('150vp');
            Select.value(planData.status);
            Select.onSelect((index: number) => {
                if (index === 0) {
                    this.status = true;
                }
                else {
                    this.status = false;
                }
            });
        }, Select);
        Select.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777299, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Button.width('288vp');
            Button.onClick(async () => {
                await RDBStoreUtil.updatePlan(planData.id, this.duration, this.status);
                this.plansSet = RDBStoreUtil.queryAllPlans();
                this.refreshSelectOption();
                this.isUpdateShow = false;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    insertBindSheet(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width('90%');
            Row.margin({
                top: '15vp',
                bottom: '15vp'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777297, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.font({
                size: '16fp',
                weight: 500
            });
            Text.opacity(0.9);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                { value: { "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                { value: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } }
            ]);
            Select.value({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Select.onSelect((index: number) => {
                this.addSportID = index;
            });
            Select.width('170vp');
        }, Select);
        Select.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.margin({ bottom: '15vp' });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.font({
                size: '16fp',
                weight: 400
            });
            Text.opacity(0.9);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } });
            TextInput.onChange((data: string) => {
                this.addDuration = Number.parseInt(data);
            });
            TextInput.width('170vp');
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.margin({ bottom: '15vp' });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Text.font({
                size: '16fp',
                weight: 400
            });
            Text.opacity(0.9);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                { value: { "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } }
            ]);
            Select.value({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Select.onSelect((index: number) => {
                if (index === 0) {
                    this.addStatus = true;
                }
                else {
                    this.addStatus = false;
                }
            });
            Select.width('170vp');
        }, Select);
        Select.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777299, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
            Button.width('288vp');
            Button.onClick(async () => {
                await RDBStoreUtil.insertPlan(this.addSportID, this.addDuration, this.addStatus);
                this.plansSet = RDBStoreUtil.queryAllPlans();
                this.refreshSelectOption();
                this.isInsetShow = false;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    async aboutToAppear(): Promise<void> {
        RDBStoreUtil.createSportTable();
        RDBStoreUtil.initSportTable();
        RDBStoreUtil.createPlanTable();
        this.plansSet = RDBStoreUtil.queryAllPlans();
        this.refreshSelectOption();
    }
    refreshSelectOption() {
        this.durationSet = RDBStoreUtil.queryAllPlansDuration();
        this.durationSelectOptions = [{ value: { "id": 16777218, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } }];
        for (let i = 0; i < this.durationSet.length; i++) {
            this.durationSelectOptions.push({ value: this.durationSet[i] + 'min' });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({
                        left: '12vp',
                        right: '12vp'
                    });
                    Column.width('100%');
                    Column.height('100%');
                    Column.justifyContent(FlexAlign.SpaceBetween);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777276, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                    Text.width('100%');
                    Text.font({
                        size: '30fp',
                        weight: 700
                    });
                    Text.margin({
                        top: '48vp',
                        bottom: '32vp'
                    });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ bottom: '8vp' });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create(this.durationSelectOptions);
                    Select.onSelect((index: number) => {
                        if (index === 0) {
                            this.currentDuration = undefined;
                        }
                        else {
                            this.currentDuration = this.durationSet[index - 1];
                        }
                    });
                    Select.value({ "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                    Select.margin({ right: '25vp' });
                }, Select);
                Select.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create([{ value: { "id": 16777218, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                        { value: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                        { value: { "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } }]);
                    Select.onSelect((index: number) => {
                        if (index === 0) {
                            this.currentStatus = undefined;
                        }
                        else if (index === 1) {
                            this.currentStatus = true;
                        }
                        else {
                            this.currentStatus = false;
                        }
                    });
                    Select.value({ "id": 16777298, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                    Select.margin({ right: '25vp' });
                }, Select);
                Select.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777429, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                    Image.width(40);
                    Image.onClick(() => {
                        this.plansSet = RDBStoreUtil.queryAllPlans();
                    });
                    Image.margin({ right: '16vp' });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777433, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                    Image.width(40);
                    Image.onClick(async () => {
                        await RDBStoreUtil.conditionalPlansQuery(ObservedObject.GetRawObject(this.currentDuration), this.currentStatus).then((value) => {
                            this.plansSet = value;
                        });
                    });
                    Image.margin({ right: '16vp' });
                }, Image);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    List.create();
                    List.width('100%');
                    List.divider({
                        strokeWidth: 1,
                        color: '#1a000000',
                        startMargin: 16,
                        endMargin: 16
                    });
                    List.bindSheet(this.isUpdateShow, { builder: () => {
                            this.updateBindSheet.call(this, ObservedObject.GetRawObject(this.currentPlan));
                        } }, {
                        height: '320vp',
                        title: { title: { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                        onDisappear: () => {
                            this.isUpdateShow = false;
                        }
                    });
                }, List);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const item = _item;
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
                                ListItem.width('100%');
                                ListItem.height('60vp');
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                    Row.height('100%');
                                    Row.justifyContent(FlexAlign.SpaceBetween);
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.alignItems(HorizontalAlign.Start);
                                    Column.margin({ left: '16vp' });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.sportName);
                                    Text.font({
                                        size: '16fp',
                                        weight: 500
                                    });
                                    Text.opacity(0.9);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.type);
                                    Text.font({
                                        size: '14fp',
                                        weight: 400
                                    });
                                    Text.opacity(0.6);
                                }, Text);
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.duration + 'min');
                                    Text.font({
                                        size: '14vp',
                                        weight: 400
                                    });
                                    Text.opacity(0.6);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.status);
                                    Text.font({
                                        size: '14vp',
                                        weight: 400
                                    });
                                    Text.opacity(0.6);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 16777403, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                                    Image.width('40vp');
                                    Image.onClick(() => {
                                        this.currentPlan = item;
                                        this.isUpdateShow = true;
                                    });
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 16777400, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                                    Image.width('40vp');
                                    Image.margin({ right: '16vp' });
                                    Image.onClick(() => {
                                        this.getUIContext().showAlertDialog({
                                            message: { "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                                            autoCancel: true,
                                            alignment: DialogAlignment.Bottom,
                                            gridCount: 4,
                                            offset: { dx: 0, dy: -20 },
                                            primaryButton: {
                                                value: { "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                                                action: () => {
                                                    hilog.info(0x0000, TAG, 'Callback when the first button is clicked');
                                                }
                                            },
                                            secondaryButton: {
                                                enabled: true,
                                                defaultFocus: true,
                                                style: DialogButtonStyle.HIGHLIGHT,
                                                value: { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                                                action: async () => {
                                                    await RDBStoreUtil.deletePlan(item.id);
                                                    this.refreshSelectOption();
                                                    this.plansSet = RDBStoreUtil.queryAllPlans();
                                                }
                                            },
                                            cancel: () => {
                                                hilog.info(0x0000, TAG, 'Closed callbacks');
                                            },
                                            onWillDismiss: (dismissDialogAction: DismissDialogAction) => {
                                                if (dismissDialogAction.reason == DismissReason.PRESS_BACK) {
                                                    dismissDialogAction.dismiss();
                                                }
                                                if (dismissDialogAction.reason == DismissReason.TOUCH_OUTSIDE) {
                                                    dismissDialogAction.dismiss();
                                                }
                                            }
                                        });
                                    });
                                }, Image);
                                Row.pop();
                                ListItem.pop();
                            };
                            this.observeComponentCreation2(itemCreation2, ListItem);
                            ListItem.pop();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.plansSet, forEachItemGenFunction, (item: GoalItem) => JSON.stringify(item), true, false);
                }, ForEach);
                ForEach.pop();
                List.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel({ "id": 16777219, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" });
                    Button.width('100%');
                    Button.margin({ bottom: '32vp' });
                    Button.onClick(() => {
                        this.isInsetShow = true;
                    });
                    Button.bindSheet(this.isInsetShow, { builder: () => {
                            this.insertBindSheet.call(this);
                        } }, {
                        height: '320vp',
                        title: { title: { "id": 16777219, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" } },
                        onDisappear: () => {
                            this.isInsetShow = false;
                        }
                    });
                }, Button);
                Button.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/GoalPage" });
            NavDestination.backgroundColor('#F1F3F5');
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("GoalPage", wrapBuilder(GoalPageBuilder));
    }
})();
