# vueH5项目组件库

# created by 杨玺

### 站点展示（建议手机扫码体验）

https://func-star.github.io/mov-mobile/

![Image text](./qrcode.png)

### 安装

```
npm i mov-mobile --save

```

### Loading（加载组件）

#### Loading.show()  |   Loading.hide()

#### DEMO

```
<template>
    <div class="flex-center">
        <div>
            <div class="loading-item" @click="show">开始加载</div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { Loading } from 'mov';

    export default {
        methods: {
            show () {
                Loading.show();
                setTimeout(() => {
                    this.hide();
                }, 1000);
            },
            hide () {
                Loading.hide();
            },
        },

    };

</script>

```


### Toast（提示组件）

#### Toast.show()

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | :-- |
| message | 提示信息 | String|Number | loading |
| duration | 显示持续时间 | Number(ms) | 1500 |
| onHide | 注销隐藏时的回调 | Function | null |

#### DEMO

```
<template>
    <div class="flex-center">
        <div>
            <div class="toast-item" @click="info">默认</div>
            <div class="toast-item" @click="error">error</div>
            <div class="toast-item" @click="success">success</div>
            <div class="toast-item" @click="callback">回调</div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { Tool } from 'mov';

    export default {
        methods: {
            info () {
                Tool.info('默认');
            },
            error () {
                Tool.error({
                    message: '请求失败',
                    duration: 1000,
                });
            },
            success () {
                Tool.success('请求成功');
            },
            callback () {
                Tool.info({
                    message: 'call',
                    onHide () {
                        Tool.info('toast关闭时的回调');
                    },
                });
            },
        },

    };

</script>


```


### Modal（弹框组件）

### Modal.confirm(options)  |  Modal.update(options)

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否打开 | Boolean | false |
| title | 抬头信息 | String | null |
| confirmText | 确认文案 | String | 确认 |
| cancelText | 取消文案 | String | 取消 |
| onClose | 关闭将visible置为false | function | null(必填) |
| enableCancel | 是否可以取消 | Boolean | true |
| maskClosable | 点击背景是否关闭 | Boolean | true |
| onConfirm | 确认回调 | Function | null |
| onCancel | 取消回调 | Function | null |
| isHaveMask | 是否显示阴影层 | Boolean | true |
| footer | 是否有底部 | Boolean | true |
| contentClass | content的样式class | String | '' |

#### DEMO

```
<template>
    <div class="flex-center">
        <div>
            <div class="modal-item" @click="open">自定义弹层</div>
            <div class="modal-item" @click="open1">有title</div>
            <div class="modal-item" @click="open2">无title</div>
            <div class="modal-item" @click="open3">无取消</div>
            <div class="modal-item" @click="open4">自定义confirm</div>
        </div>
        <modal
            :visible="isOpen"
            title="自定义弹层"
            confirmText="确定吗？"
            :enableCancel="true"
            cancelText="取消吗？"
            :onClose="closeModal"
            :maskClosable="true"
            contentClass="content-cls"
            :onConfirm="callback"
            :onCancel="callback"
            :footer="true"
            :isHaveMask="true">
            <div style="height: 100px;">
                <img src="https://s10.mogucdn.com/mlcdn/c024f5/180410_6fla7fghhkillkcd8831577hg52k1_600x600.jpg_100x100.jpg" alt="">
            </div>
        </modal>
    </div>
</template>
<script type="text/javascript">
    import { Modal, Tool } from 'mov';

    export default {
        components: {
            Modal,
        },
        data () {
            return {
                isOpen: false,
            };
        },

        methods: {
            open () {
                this.isOpen = true;
            },
            closeModal () {
                this.isOpen = false;
            },
            callback (type) {
                console.log(type);
            },
            open1 () {
                Modal.confirm({
                    title: 'title1',
                    maskClosable: false,
                    content: 'content1',
                    onConfirm: () => {
                        Tool.info('confirm');
                    },
                    onCancel: () => {
                        Tool.info('cancel');
                    },
                });
            },
            open2 () {
                Modal.confirm({
                    content: 'content2',
                    onConfirm: () => {
                        Tool.info('confirm');
                    },
                    onCancel: (type) => {
                        Tool.info(type);
                    },
                });
            },
            open3 () {
                Modal.confirm({
                    title: 'title3',
                    content: 'content3',
                    enableCancel: false,
                    onConfirm: () => {
                        Tool.info('confirm');
                    },
                });
            },
            open4 () {
                Modal.confirm({
                    title: '<span style="color: red;">title4</span>',
                    content: 'content4',
                    confirmText: '知道了',
                    cancelText: '算了呗',
                    onConfirm: () => {
                        Tool.info('confirm');
                    },
                });
            },
        },

    };

</script>


```


### Hammer（手势库）

在events中新添加以下计算量

#### API

| 参数 | 说明 |
| --- | --- |
| velocityY | y轴速度 |
| velocityX | x轴速度 |
| deltaY | y轴偏移量 |
| deltaX | x轴偏移量 |
| angle | 角度 |


#### DEMO

```
// 提供H5容器手势库及回调参数
<template>
    <hammer class="mov-picker-view-mask" :panmove="this.panmove" :panend="this.panend" :panstart="this.panstart"></hammer>
</template>
<script>

```



### Events（事件类）

消息广播

#### API

| 方法名 | 说明 |
| --- | --- |
| on（eventsName, callBackFunction） | 事件注册 |
| emit(eventsName, params) | 事件触发 |
| once(eventsName, callBackFunction) | 事件注册,触发一次后自动销毁 |
| off(eventsName) | 事件注销 |

#### DEMO

```
// 提供全局广播，消息监听，分发，使用方法请联系作者或者参考demo

```


### Popup（弹出层）

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placement | 弹出的位置（top|down|right） | String | bottom  |
| maskClosable | 是否可以关闭阴影层,需要传onClose将visible属性置为false | Boolean | true |
| onClose | 关闭时的回调 | Function | null |
| animate | 是否需要动画 | Boolean | true |

#### DEMO

```
<template>
    <div class="flex-center">
        <div>
            <div class="popup-item" @click="bottom">bottom打开(默认)</div>
            <div class="popup-item" @click="top">top打开</div>
            <div class="popup-item" @click="right">right打开</div>
            <div class="popup-item" @click="noAnimate">无动画</div>
        </div>
        <popup :visible="visible" :placement="placement" :animate="animate" :onClose="toggle">
            <div style="height: 286px;" class="w-full">
                <button @click="toggle">关闭</button>
            </div>
        </popup>
    </div>
</template>
<script type="text/ecmascript-6">
import { Popup } from 'mov';

export default {
    components: {
        Popup
    },

    props: {},

    data() {
        return {
            visible: false,
            animate: true
        };
    },

    methods: {
        bottom() {
            this.placement = 'bottom';
            this.animate = true;
            this.toggle();
        },
        top() {
            this.placement = 'top';
            this.animate = true;
            this.toggle();
        },
        right() {
            this.placement = 'right';
            this.animate = true;
            this.toggle();
        },
        noAnimate() {
            this.placement = 'bottom';
            this.animate = false;
            this.toggle();
        },
        toggle() {
            this.visible = !this.visible;
        }
    },
};

</script>


```



### PickerSelect（滚动选择器）

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| keyType | 数据源的类型(key-value对应[{},{}]，value对应[,,]) | String | key-value |
| nameKey | 当数据源为key-value时的显示用的key | String | name |
| valueKey | 当数据源为key-value时的取值用的key | String | value |
| source | 数据源 | Array | [] |
| defaultValue | 默认值 | String|Number | null |
| onChange | 确认时回调函数 | Function | null |
| onClose | 关闭时的回调函数 | Function | null |
| visible | 控制显示 | Boolean | false |

#### DEMO

```
<template>
    <div class="demo h-full">
        <picker-view :source="source" keyType="value" :defaultValue="year" :onChange="getValue"></picker-view>
    </div>
</template>
<script type="text/ecmascript-6">
import { PickerView } from 'mov';

export default {
    components: {
        'picker-view': PickerView
    },

    data() {
        return {
            year: '2018年'
        };
    },

    methods: {
        getValue(val) {
            console.log(val);
        }
    },

    created() {
        this.source = [];
        for (let i = 0; i < 100; i++) {
            this.source.push(2000 + i + '年');
        }
    },
};

</script>

```


### ModalSelect（弹层选择器）
ModalSelect.config(options)
#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| source | 数据源列表 | Array | []  |
| isKV | source的item的类型是否为json | Boolean | true |
| defaultValue | 默认值 | 所有数据类型 | null |
| nameKey | 显示用的key，isKV为true时传（非必填） | String | 'name' |
| valueKey | 真实值用的key，isKV为true时传（非必填） | String | 'value' |
| onOk(data) | 确认时的回调 | Function | null |
| onCancel() | 取消时的回调 | Function | null |

#### DEMO

```
<template>
    <div>
        <div class="d-f picker-select">
            <div class="key">简单数组数据源</div>
            <div class="flex-1 text-right value" @click="open">{{value || '请点击选择 >'}}</div>
        </div>
        <div class="d-f picker-select">
            <div class="key">json数组数据源</div>
            <div class="flex-1 text-right value" @click="open2">{{value2.n || '请点击选择 >'}}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { ModalSelect } from 'mov';

    export default {
        data () {
            return {
                value: '',
                value2: {},
            };
        },
        methods: {
            open () {
                ModalSelect.config({
                    source: [1, 2, 3, 4, 5],
                    defaultValue: this.value,
                    isKV: false,
                    onOk: (data) => {
                        this.value = data;
                    },
                    onCancel: () => {
                        console.log('cancel');
                    },
                });
            },
            open2 () {
                ModalSelect.config({
                    source: [{
                        n: '测试1', v: 1,
                    }, {
                        n: '测试2', v: 2,
                    }, {
                        n: '测试3', v: 3,
                    }, {
                        n: '测试4', v: 4,
                    }, {
                        n: '测试5', v: 5,
                    }, {
                        n: '测试6', v: 6,
                    }],
                    defaultValue: this.value2, // 或者ths.value2.v
                    nameKey: 'n', // 默认 name
                    valueKey: 'v', // 默认 value
                    onOk: (data) => {
                        this.value2 = data;
                    },
                    onCancel: () => {
                        console.log('cancel');
                    },
                });
            },
        },
    };

</script>

```



### DatePicker（时间选择器）

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 显示的粒度（year|month|day|hour|minute|second） | String | second  |
| date | 默认值（13位时间戳） | Number | 当前 |
| onOk(time) | 确认时的回调，参数为13位时间戳 | Function | null |
| onCancel() | 取消时的回调 | Function | null |

#### DEMO

```
<template>
    <div class="d-f picker-select">
        <div class="key">滚动弹层选择器</div>
        <div class="flex-1 text-right value" @click="open">{{value||'请点击选择 >'}}</div>
    </div>
</template>
<script type="text/ecmascript-6">
import { DatePicker } from 'mov';
import Util from 'core/util';

export default {
    name: 'date-picker',

    data() {
        return {
            value: ''
        };
    },

    methods: {
        open() {
            let defaultDate = Util.moment(this.value).valueOf();

            DatePicker.config({
                format: 'second',
                date: defaultDate,
                onOk: (data) => {
                    this.value = Util.moment(data).format('YYYY-MM-DD HH:mm:ss');
                }
            });
        }
    },
};

</script>

```



### DatePickerRange（时间区间选择器）

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 显示的粒度（year|month|day） | String | day  |
| date | 默认值 | Object:{start:Time, end:Time} | 当前(13位时间戳) |
| onOk(time) | 确认时的回调，参数为Object | Function | null |
| onCancel() | 取消时的回调 | Function | null |

#### DEMO

```
<template>
    <div class="d-f picker-select">
        <div class="key">滚动弹层选择器</div>
        <div class="flex-1 text-right value" @click="open">{{start}} 至 {{end}}</div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { DatePickerRange } from 'mov';
    import Util from 'core/util';

    export default {
        name: 'date-picker',

        data () {
            return {
                start: '',
                end: '',
            };
        },

        methods: {
            open () {
                let start = Util.moment(this.start).valueOf();
                let end = Util.moment(this.end).valueOf();

                DatePickerRange.config({
                    date: {
                        start: start,
                        end: end,
                    },
                    onOk: (data) => {
                        this.start = Util.moment(data.start).format('YYYY-MM-DD');
                        this.end = Util.moment(data.end).format('YYYY-MM-DD');
                    },
                });
            },
        },
    };

</script>


```


### ListView（下拉加载上拉刷新的容器）

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 顶部加载显示的高度 | Number | 40 |
| bottomEmit | 距离底部多少触发加载 | Number | 100 |
| enableInfinite | 是否允许触底加载 | Boolean | true |
| enableRefresh | 是否允许下拉刷新 | Boolean | true |
| onRefresh(done) | 下拉刷新的回调，刷新结束需要手动回调done()通知组件已经刷新完毕 | Function | null |
| onInfinite(done) | 触底加载的回调，刷新结束需要手动回调done()通知组件已经加载完毕 | Function | null |
| onMove(e) | touchmove时的回调 | Function | null |
| isEnd | 通知组件是否已经不能在触底加载 | Boolean | false |


#### DEMO

```
<template>
    <div>
        <list-view :on-refresh="onRefresh" :on-infinite="onInfinite" :on-move="onMove" :isEnd="isEnd">
            <div class="list-view-group">
                <div class="list-view-item flex-center-y" v-for="(item, index) in this.list">
                    <div class="avatar r-circle"></div>
                    <div class="info flex-1">放克</div>
                </div>
            </div>
        </list-view>
        <div class="pos-f list-view-to-top r-circle" v-if="showToTop"></div>
    </div>
</template>
<script type="text/javascript">
import { ListView } from 'mov';

export default {
    components: {
        ListView,
    },

    data() {
        return {
            list: [],
            isEnd: false,
            showToTop: false,
        };
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            this.getList();
        },
        getList() {
            this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 4, 5];
        },
        onRefresh(done) {
            setTimeout(() => {
                this.getList();
                this.isEnd = this.list.length > 20;
                done(); // call done
            }, 500);
        },
        onInfinite(done) {
            setTimeout(() => {
                this.list = this.list.concat([11, 12, 13, 14, 15, 16, 17, 18]);
                this.isEnd = this.list.length > 40;
                done();
            }, 500);
        },
        onMove(scrollTop) {
            this.showToTop = scrollTop > 500;
        },
    },

};

</script>

```



### MountRoot（在body跟节点下创建节点的容器）

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否创建 | Boolean | false |
| onMounted | 节点挂载完后的回调 | Function | null |
| onDestroyed | 节点卸载完后的回调 | Function | null |
| closeDelay | 延迟几秒卸载节点 | Number | 0 |


#### DEMO

```
// 在<body>节点下动态创建子节点，有问题请联系作者
<template>
    <mount-root :visible="show" class="mov-toast flex-center pos-f pos-f-full">
		<div class="mov-toast-content pos-f">
			{{message}}
		</div>
    </mount-root>
</template>
<script>

```


### row、column（布局组件）

#### API-row

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| justify | 水平方向布局 | String | '' |
| gutter | 排版间隔 | String | '' |
| align | 垂直方向布局 | String | '' |
| direction | 支持column,默认row | String | '' |

#### API-column

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格 | Number | '' |


#### DEMO

```
// 有问题请@放克
<template>
    <div>
        <row justify="center">24栅格布局</row>
        <row class="group" justify="center">
            <column class="item" :span="12">12</column>
            <column class="item" :span="12">12</column>
        </row>
        <row class="group">
            <column class="item" :span="8">8</column>
            <column class="item" :span="8">8</column>
            <column class="item" :span="8">8</column>
        </row>
        <row class="group">
            <column class="item" :span="6">6</column>
            <column class="item" :span="6">6</column>
            <column class="item" :span="6">6</column>
            <column class="item" :span="6">6</column>
        </row>

        <div>gutter空隙排版</div>
        <row class="group" gutter="10px">
            <column :span="8">
                <div class="item">8</div>
            </column>
            <column :span="8">
                <div class="item">8</div>
            </column>
            <column :span="8">
                <div class="item">8</div>
            </column>
        </row>
        <div>垂直排版</div>
        <row class="group" direction="column" justify="end" align="center" style="height: 150px;">
            <column class="item" :span="6">6</column>
            <column class="item" :span="6">6</column>
            <column class="item" :span="6">6</column>
            <column class="item" :span="6">6</column>
        </row>
        <div>row可以放其他的子节点，不一定要column</div>
        <row class="group" justify="end" align="center">
            row可以放其他的子节点，不一定要column
        </row>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Row, Column } from 'mov';

    export default {
        components: {
            Row,
            Column,
        },
    };

</script>



```

### Carousel （跑马灯组件）

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoplay | 是否自动轮播 | Boolean | true |
| loop | 是否无缝循环 | Boolean | false |
| itemWidth | 滚动区域的宽度 | Number | null |
| defaultIndex | 默认定位第几屏的下标 | Number | 0 |
| autoplayInterval | 自动轮播的时间间隔 | Number | 3000 |
| dots | 是否展示下标dots | Boolean | true |
| canPan | 是否支持手势滑动 | Boolean | true |
| beforeChange | 切屏开始前的回调 | Function | null |
| afterChange | 切屏结束后的回调 | Function | null |


#### DEMO

```
<template>
    <div>
        <div style="margin: 20px 0;">循环播放</div>
        <div class="flex-center-x w-full">
            <div class="carousel-pannel w-full">
                <carousel class="" :afterChange="afterChange" :defaultIndex="0" :loop="true" :childWidth="300">
                    <carousel-item style="padding: 3px 10px;">
                        <img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
                    </carousel-item>
                    <carousel-item style="padding: 3px 10px;">
                        <img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
                    </carousel-item>
                    <carousel-item style="padding: 3px 10px;">
                        <img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
                    </carousel-item>
                </carousel>
            </div>
        </div>
        <div style="margin: 20px 0;">不循环播放</div>
        <div class="flex-center-x w-full">
            <div class="carousel-pannel w-full">
                <carousel :afterChange="afterChange" :defaultIndex="0">
                    <carousel-item>
                        <img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_1j6a0f30hcc36k464ikhakj0cbaeg_1350x578.jpg" />
                    </carousel-item>
                    <carousel-item>
                        <img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_41l88h92fl116bk0kdl4lklk6d0ia_1350x578.jpg" />
                    </carousel-item>
                    <carousel-item>
                        <img class="full" src="https://s10.mogucdn.com/mlcdn/c45406/170804_46glh9ch5l7afde25485e5a8k76jf_1350x578.jpg" />
                    </carousel-item>
                </carousel>
            </div>
        </div>
        <div style="margin: 20px 0;">循环pannel</div>
        <div class="flex-center-x w-full">
            <div class="carousel-pannel-1 w-full">
                <carousel :afterChange="afterChange" :defaultIndex="0" :dots="false" :loop="true" :autoplay="false">
                    <carousel-item>
                        <div class="pannel full">
                            <div>第一屏，左右滑动试试吧</div>
                            <div>{{name}}</div>
                            <button class="option" @click="test">操作</button>
                        </div>
                    </carousel-item>
                    <carousel-item>
                        <div class="pannel full">第二屏，左右滑动试试吧</div>
                    </carousel-item>
                    <carousel-item>
                        <div class="pannel full">第三屏，左右滑动试试吧</div>
                    </carousel-item>
                    <carousel-item>
                        <div class="pannel full">第四屏，左右滑动试试吧</div>
                    </carousel-item>
                </carousel>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Carousel, Tool } from 'mov';

    const CarouselItem = Carousel.Item;

    export default {
        components: {
            Carousel,
            CarouselItem,
        },

        data () {
            return {
                name: 'fff',
            };
        },
        methods: {
            afterChange (index) {
                console.log(index);
            },
            open () {
                Tool.info('操作');
            },
            test () {
                this.name += 'dddd';
            },
        },
    };

</script>

```


### Tabs （切换pannel） 支持自定义header

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabs | 头部导航条(若不传则隐藏头部header，可自定义切换栏) | Array | null |
| defaultIndex | 默认定位第几屏的下标 | Number | 0 |
| canPan | 是否支持手势滑动 | Boolean | true |
| beforeChange | 切屏开始前的回调 | Function | null |
| afterChange | 切屏结束后的回调 | Function | null |


#### DEMO

```
<template>
    <div class="full">
        <tabs :tabs="tabs" ref="tabs" :defaultIndex="2" :afterChange="afterChange" class="tabs-pannel full">
            <tabs-item>
                <div class="h-full item">
                    <button style="height: 50px" @click="exchange(1)">切换wrap</button>
                </div>
            </tabs-item>
            <tabs-item>
                <list-view></list-view>
            </tabs-item>
            <tabs-item>
                <div class="h-full item">
                    <button style="height: 50px" @click="exchange(1)">切换wrap</button>
                </div>
            </tabs-item>
        </tabs>
    </div>
</template>
<script type="text/ecmascript-6">
    import { Tabs } from 'mov';
    import ListView from '../list-view/App.vue';
    import '../list-view/main.pcss';

    const TabsItem = Tabs.Item;

    export default {
        components: {
            Tabs,
            TabsItem,
            ListView,
        },

        data () {
            return {
                tabs: [
                    {title: '1 Tab'},
                    {title: '2 Tab'},
                    {title: '3 Tab'},
                ],
            };
        },
        methods: {
            afterChange (index) {
                console.log(index);
            },
            exchange (index) {
                this.$refs.tabs.changeIndex(index); // 切换wrap的方法
            },
        },
    };

</script>



```
