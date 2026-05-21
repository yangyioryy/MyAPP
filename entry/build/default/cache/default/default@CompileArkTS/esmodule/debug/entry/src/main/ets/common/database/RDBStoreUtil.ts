import relationalStore from "@ohos:data.relationalStore";
import hilog from "@ohos:hilog";
import type { BusinessError } from "@ohos:base";
import { GoalItem } from "@bundle:com.example.pageanddata/entry/ets/viewmodel/GoalItem";
import CommonConstants from "@bundle:com.example.pageanddata/entry/ets/common/constants/CommonConstants";
const TAG: string = 'RDBStoreUtil';
/**
 *The RDBStoreUtil provides rdbStore of create, save and query.
 */
class RDBStoreUtil {
    objectiveRDB?: relationalStore.RdbStore;
    /**
     *The method of creating an RDBStore Instance.
     */
    createObjectiveRDB(context: Context) {
        const STORE_CONFIG: relationalStore.StoreConfig = {
            name: 'Objective.db',
            securityLevel: relationalStore.SecurityLevel.S1
        };
        relationalStore.getRdbStore(context, STORE_CONFIG, (err: BusinessError, rdbStore: relationalStore.RdbStore) => {
            this.objectiveRDB = rdbStore;
            if (err) {
                hilog.error(0x0000, TAG, `Get RdbStore failed, code is ${err.code},message is ${err.message}`);
                return;
            }
            hilog.error(0x0000, TAG, 'Get RdbStore successfully.');
        });
    }
    /**
     *The method of creating a sport table.
     */
    createSportTable() {
        this.objectiveRDB?.execute(CommonConstants.CREATE_SPORTS_TABLE_SQL)
            .then(() => {
            hilog.info(0x0000, TAG, `execute create sport table sql success`);
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `execute sql failed, code is ${err.code},message is ${err.message}`);
        });
    }
    /**
     *The method of creating a plan table.
     */
    createPlanTable() {
        this.objectiveRDB?.execute(CommonConstants.CREATE_PLANS_TABLE_SQL)
            .then(() => {
            hilog.info(0x0000, TAG, `execute create plas table sql success`);
        })
            .catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `execute sql failed, code is ${err.code},message is ${err.message}`);
        });
    }
    /**
     *The method of Initializing sport table.
     */
    initSportTable() {
        const sportDataOne: relationalStore.ValuesBucket = {
            'ID': 0,
            'NAME': '晨跑',
            'TYPE': '有氧运动'
        };
        const sportDataTWO: relationalStore.ValuesBucket = {
            'ID': 1,
            'NAME': '瑜伽',
            'TYPE': '柔韧运动'
        };
        const sportDataThree: relationalStore.ValuesBucket = {
            'ID': 2,
            'NAME': '游泳',
            'TYPE': '有氧运动'
        };
        let valueBuckets = new Array(sportDataOne, sportDataTWO, sportDataThree);
        this.objectiveRDB?.batchInsert('SPORTS', valueBuckets).then((insertNum: number) => {
            hilog.info(0x0000, TAG, `batchInsert is successful, the number of values that were inserted = ${insertNum}`);
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `batchInsert is failed, code is ${err.code},message is ${err.message}`);
        });
    }
    /**
     *The method of querying all durations in all plans.
     */
    queryAllPlansDuration(): number[] {
        let plansSet: Array<number> = [];
        try {
            let resultSet = this.objectiveRDB!.querySqlSync(CommonConstants.QUERY_ALL_DURATIONS_SQL);
            while (resultSet.goToNextRow()) {
                let duration: number = resultSet.getValue(resultSet.getColumnIndex('DURATION')) as number;
                plansSet.push(duration);
            }
            resultSet.close();
        }
        catch (error) {
            hilog.error(0x0000, TAG, `Query failed, code is ${error.code},message is ${error.message}`);
        }
        return plansSet;
    }
    /**
     *The method of querying all plans.
     */
    queryAllPlans(): GoalItem[] {
        let plansSet: Array<GoalItem> = [];
        try {
            let resultSet = this.objectiveRDB!.querySqlSync(CommonConstants.QUERY_ALL_PLANS_SQL);
            while (resultSet.goToNextRow()) {
                const id = resultSet.getValue(resultSet.getColumnIndex('ID')) as number;
                const name = resultSet.getValue(resultSet.getColumnIndex('NAME')) as string;
                const type = resultSet.getValue(resultSet.getColumnIndex('TYPE')) as string;
                const duration = resultSet.getValue(resultSet.getColumnIndex('DURATION')) as number;
                const status = resultSet.getValue(resultSet.getColumnIndex('STATUS')) as string;
                plansSet.push(new GoalItem(id, name, type, duration, status));
            }
            resultSet.close();
        }
        catch (error) {
            hilog.error(0x0000, TAG, `Query failed, code is ${error.code},message is ${error.message}`);
        }
        return plansSet;
    }
    /**
     *The method of inserting a plan information.
     */
    async insertPlan(sportID: number, duration: number, status: boolean) {
        const sportData: relationalStore.ValuesBucket = {
            'SPORT_ID': sportID,
            'DURATION': duration,
            'STATUS': status ? '已完成' : '未完成'
        };
        try {
            await this.objectiveRDB?.insert('PLANS', sportData, relationalStore.ConflictResolution.ON_CONFLICT_REPLACE);
        }
        catch (error) {
            hilog.error(0x0000, TAG, `Insert is failed, code is ${error.code},message is ${error.message}`);
        }
    }
    /**
     *The method of updating a plan information.
     */
    async updatePlan(planID: number, duration: number, status: boolean) {
        const planData: relationalStore.ValuesBucket = {
            'DURATION': duration,
            'STATUS': status ? '已完成' : '未完成'
        };
        let predicates = new relationalStore.RdbPredicates('PLANS');
        predicates.equalTo('ID', planID);
        try {
            await this.objectiveRDB?.update(planData, predicates, relationalStore.ConflictResolution.ON_CONFLICT_REPLACE);
        }
        catch (error) {
            hilog.error(0x0000, TAG, `Updated failed, code is ${error.code},message is ${error.message}`);
        }
    }
    /**
     *The method of deleting a plan information.
     */
    async deletePlan(planID: number) {
        let predicates = new relationalStore.RdbPredicates('PLANS');
        predicates.equalTo('ID', planID);
        try {
            await this.objectiveRDB?.delete(predicates);
        }
        catch (error) {
            hilog.error(0x0000, TAG, `Delete failed, code is ${error.code},message is ${error.message}`);
        }
    }
    /**
     *The method of filtering all plans based on different criteria.
     */
    async conditionalPlansQuery(duration: number | undefined, status: boolean | undefined): Promise<GoalItem[]> {
        let plansSet: Array<GoalItem> = [];
        let querySql: string = '';
        if (status === undefined) {
            if (duration === undefined) {
                querySql = CommonConstants.QUERY_ALL_PLANS_SQL;
            }
            else {
                querySql = CommonConstants.QUERY_PLANS_BY_DURATION_SQL + duration;
            }
        }
        else {
            let statusCondition: string = status ? '已完成' : '未完成';
            if (duration === undefined) {
                querySql = CommonConstants.QUERY_PLANS_BY_STATUS_SQL + statusCondition + '"';
            }
            else {
                querySql = CommonConstants.QUERY_PLANS_BY_STATUS_SQL + statusCondition + '" and p.DURATION = ' + duration;
            }
        }
        try {
            let resultSet = this.objectiveRDB!.querySqlSync(querySql);
            while (resultSet.goToNextRow()) {
                const id = resultSet.getValue(resultSet.getColumnIndex('ID')) as number;
                const name = resultSet.getValue(resultSet.getColumnIndex('NAME')) as string;
                const type = resultSet.getValue(resultSet.getColumnIndex('TYPE')) as string;
                const duration = resultSet.getValue(resultSet.getColumnIndex('DURATION')) as number;
                const status = resultSet.getValue(resultSet.getColumnIndex('STATUS')) as string;
                plansSet.push(new GoalItem(id, name, type, duration, status));
            }
            resultSet.close();
        }
        catch (error) {
            hilog.error(0x0000, TAG, `Query failed, code is ${error.code},message is ${error.message}`);
        }
        return plansSet;
    }
}
export default new RDBStoreUtil();
