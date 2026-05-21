import ItemData from "@bundle:com.example.pageanddata/entry/ets/viewmodel/ItemData";
/**
 * Binds data to components and provides interfaces.
 */
export class MainViewModel {
    /**
     * Get swiper image data.
     *
     * @return {Array<Resource>} swiperImages.
     */
    getSwiperImages(): Array<Resource> {
        let swiperImages: Resource[] = [
            { "id": 16777405, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
            { "id": 16777406, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
            { "id": 16777407, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
            { "id": 16777408, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }
        ];
        return swiperImages;
    }
    /**
     * Get data of the first grid.
     *
     * @return {Array<PageResource>} firstGridData.
     */
    getFirstGridData(): Array<ItemData> {
        let firstGridData: ItemData[] = [
            new ItemData(0, { "id": 16777277, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777417, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(1, { "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777427, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(2, { "id": 16777272, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777419, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(3, { "id": 16777296, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777432, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(4, { "id": 16777276, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777436, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(5, { "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777398, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(6, { "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777404, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(7, { "id": 16777284, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777428, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" })
        ];
        return firstGridData;
    }
    /**
     * Get data of the setting list.
     *
     * @return {Array<PageResource>} settingListData.
     */
    getSettingListData(): Array<Array<ItemData>> {
        let settingListData: ItemData[][] = [
            [
                new ItemData(0, { "id": 16777292, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777423, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777295, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" })
            ],
            [
                new ItemData(1, { "id": 16777290, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777399, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
                new ItemData(2, { "id": 16777291, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777418, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            ],
            [
                new ItemData(3, { "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777435, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
                new ItemData(4, { "id": 16777293, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777425, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            ],
            [
                new ItemData(5, { "id": 16777289, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777393, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" })
            ]
        ];
        return settingListData;
    }
}
export default new MainViewModel();
