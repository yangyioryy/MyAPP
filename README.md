# PageAndData

`PageAndData` 是一个基于 HarmonyOS Stage 模型与 ArkTS 开发的示例应用，主要用于展示页面跳转、网络访问、偏好设置、本地关系型数据库和基础 UI 组件组合等能力。

应用入口为登录页。登录时会检查网络状态，网络可用且账号、密码不为空时进入主页面。主页面包含“首页”和“我的”两个底部 Tab，其中首页展示轮播图、功能宫格和远端活动列表；“我的”页面展示账户信息、设置项和字体大小调节入口。首页宫格中的“我的目标”会跳转到运动计划页面，支持新增、查询、筛选、修改和删除运动计划。

## 项目功能

- 登录页：提供账号、密码输入、空输入提示、网络状态校验和加载态展示。
- 首页：展示本地轮播资源、功能宫格，以及通过网络接口获取的活动列表数据。
- 我的页：展示用户信息、推送开关、字体大小调节、菜单设置、清理缓存、隐私协议和关于等入口。
- 字体调节：通过 `Preferences` 保存字体偏移量，并用 `@StorageLink` 在页面间共享字体大小状态。
- 运动目标：使用 `RDBStore` 管理运动计划，支持计划新增、筛选、更新和删除。
- 网络能力：使用 `NetworkKit` 监听网络状态，并使用 `RemoteCommunicationKit` 发起远端请求。
- 本地资源：包含图标、轮播图、背景图、Tab 图标和多语言字符串资源。

## 技术栈

- HarmonyOS Stage 模型
- ArkTS / ArkUI
- Hvigor 构建体系
- `@kit.AbilityKit`
- `@kit.ArkUI`
- `@kit.NetworkKit`
- `@kit.RemoteCommunicationKit`
- `@kit.ArkData`
- `@kit.CoreFileKit`
- `@kit.PerformanceAnalysisKit`

## 运行环境

项目配置位于 `build-profile.json5`：

- 运行系统：HarmonyOS
- 设备类型：phone
- compatibleSdkVersion：5.0.5(17)
- targetSdkVersion：6.0.2(22)
- 模块：entry

建议使用 DevEco Studio 打开项目，然后执行同步、构建和真机或模拟器运行。

## 目录结构

```text
MyAPP
├── AppScope
│   ├── app.json5
│   └── resources
├── entry
│   ├── build-profile.json5
│   ├── hvigorfile.ts
│   ├── oh-package.json5
│   └── src/main
│       ├── ets
│       │   ├── common
│       │   │   ├── constants
│       │   │   ├── database
│       │   │   └── network
│       │   ├── entryability
│       │   ├── pages
│       │   ├── view
│       │   └── viewmodel
│       ├── module.json5
│       └── resources
├── hvigor
├── build-profile.json5
├── hvigorfile.ts
├── oh-package.json5
└── LICENSE
```

## 核心模块说明

### 应用配置

- `AppScope/app.json5`：配置应用包名、版本号、图标和应用名称。
- `entry/src/main/module.json5`：配置 entry 模块、入口 Ability、页面路由和权限。
- `entry/src/main/resources/base/profile/main_pages.json`：配置启动页为 `pages/LoginPage`。
- `entry/src/main/resources/base/profile/route_map.json`：配置 `MainPage` 和 `GoalPage` 命名路由。

### 页面层

- `LoginPage.ets`：登录页，负责账号密码输入、网络检查、登录加载态和跳转主页面。
- `MainPage.ets`：主页面容器，使用 `Tabs` 管理首页和我的页。
- `GoalPage.ets`：运动目标页面，负责运动计划的列表展示、筛选、新增、编辑和删除。

### 视图层

- `Home.ets`：首页内容，包含轮播图、功能宫格和网络活动列表。
- `Setting.ets`：我的页内容，包含账户信息、设置列表和退出按钮。
- `SliderCustomDialog.ets`：字体大小调节弹窗，保存字体偏移设置。

### 数据与工具层

- `MainViewModel.ets`：提供首页宫格、轮播图和设置列表的静态数据。
- `RDBStoreUtil.ets`：封装 `RDBStore` 创建表、初始化数据和运动计划 CRUD。
- `PreferencesUtil.ets`：封装字体设置的偏好存储。
- `ConnectionUtils.ets`：封装网络连接检测和网络状态监听。
- `RCPUtils.ets`：通过 `RemoteCommunicationKit` 获取远端活动列表和图片资源。
- `HttpUtils.ets`：保留了基于 `NetworkKit` 的 HTTP 请求实现，目前首页中主要使用 `RCPUtils`。

## 数据流说明

### 登录流程

```text
LoginPage
└── ConnectionUtils.isNetworkConnected()
    ├── 网络可用：延迟 2 秒后跳转 MainPage
    └── 网络不可用：显示 Network Lost 提示
```

### 首页数据流程

```text
Home
├── MainViewModel.getSwiperImages()
├── MainViewModel.getFirstGridData()
└── RCPUtils
    ├── postRCPRequest() 获取活动列表
    └── getRCPRequest() 下载 SVG 到应用文件目录
```

### 运动计划数据流程

```text
GoalPage
└── RDBStoreUtil
    ├── createSportTable()
    ├── initSportTable()
    ├── createPlanTable()
    ├── queryAllPlans()
    ├── conditionalPlansQuery()
    ├── insertPlan()
    ├── updatePlan()
    └── deletePlan()
```

## 权限说明

`entry/src/main/module.json5` 中申请了以下权限：

- `ohos.permission.INTERNET`：用于请求远端活动列表和图片资源。
- `ohos.permission.GET_NETWORK_INFO`：用于检查和监听网络状态。

## 构建与运行

1. 使用 DevEco Studio 打开 `MyAPP` 项目目录。
2. 等待工程同步完成。
3. 选择 `entry` 模块和 `default` target。
4. 连接 HarmonyOS 设备或启动模拟器。
5. 点击 Run 运行应用。

## 使用说明

1. 打开应用后进入登录页。
2. 输入账号和密码。
3. 网络可用时点击登录进入主页面。
4. 在首页查看轮播图、功能宫格和远端活动列表。
5. 点击功能宫格中的“我的目标”进入运动计划页面。
6. 在运动计划页新增、筛选、修改或删除运动计划。
7. 在“我的”页面打开字体大小调节弹窗，调整全局字体显示效果。

## 注意事项

- 登录逻辑目前只做空输入和网络状态校验，没有真实账号认证。
- 首页活动列表依赖华为开发者社区远端接口，网络不可用或接口异常时列表可能为空。
- 项目中存在 `entry/build` 和 `.hvigor` 等构建产物目录，阅读源码时应优先关注 `entry/src/main`。
- 部分中文资源在当前终端读取时可能显示为乱码，建议在 DevEco Studio 中确认资源文件编码与实际展示效果。

## 许可证

项目包含 `LICENSE` 文件，使用 Apache License 2.0。
