<template>
    <popup :visible="visible" placement="bottom" :onClose="cancel">
        <div class="mov-date-picker w-full">
            <div class="mov-date-picker-header d-f">
                <div class="flex-1 item flex-center-y" @click="cancel">取消</div>
                <div class="flex-1 item flex-center-y flex-right-x" @click="confirm">确定</div>
            </div>
            <div class="mov-date-picker-con d-f">
                <div class="flex-1 h-full" v-if="options.yearVisible">
                    <picker-view :source="years" :defaultValue="year" :onChange="this.getVal.bind(this, 'year')"></picker-view>
                </div>
                <div class="flex-1 h-full" v-if="options.monthVisible">
                    <picker-view :source="months" :defaultValue="month" :onChange="this.getVal.bind(this, 'month')"></picker-view>
                </div>
                <div class="flex-1 h-full" v-if="options.dayVisible">
                    <picker-view :source="days" :defaultValue="day" :onChange="this.getVal.bind(this, 'day')" ref="day"></picker-view>
                </div>
                <div class="flex-1 h-full" v-if="options.hourVisible">
                    <picker-view :source="hours" :defaultValue="hour" :onChange="this.getVal.bind(this, 'hour')"></picker-view>
                </div>
                <div class="flex-1 h-full" v-if="options.minuteVisible">
                    <picker-view :source="minutes" :defaultValue="minute" :onChange="this.getVal.bind(this, 'minute')"></picker-view>
                </div>
                <div class="flex-1 h-full" v-if="options.secondVisible">
                    <picker-view :source="seconds" :defaultValue="second" :onChange="this.getVal.bind(this, 'second')"></picker-view>
                </div>
            </div>
        </div>
    </popup>
</template>
<script>
    import MainServer from './index.js';
    import Generate from './generate';
    import PickerView from '../picker-view';
    import Popup from '../popup';

    export default {
        components: {
            'popup': Popup,
            'picker-view': PickerView,
        },
        data () {
            return {
                defaultOpt: {},
                options: {},
                visible: false,
                years: [],
                months: [],
                days: [],
                minutes: [],
                seconds: [],
            };
        },

        methods: {
            setOptions (options) {
                let ctrl = Generate.generateCtrl(options.format);
                this.options = Object.assign({}, this.defaultOpt, options, ctrl);

                let date = options.date ? new Date(options.date) : new Date();
                this.year = date.getFullYear();
                this.month = Generate.pad(date.getMonth() + 1, 2);
                this.day = Generate.pad(date.getDate(), 2);
                this.hour = Generate.pad(date.getHours(), 2);
                this.minute = Generate.pad(date.getMinutes(), 2);
                this.second = Generate.pad(date.getSeconds(), 2);

                this.years = this.options.years ? this.options.years : Generate.years(15);
                this.months = this.options.months ? this.options.months : Generate.months();
                this.days = Generate.days(this.year, this.month);
                this.hours = this.options.hours ? this.options.hours : Generate.hours();
                this.minutes = this.options.minutes ? this.options.minutes : Generate.minutes();
                this.seconds = this.options.seconds ? this.options.seconds : Generate.seconds();
            },
            getVal (type, val) {
                this[type] = val.value;
                if (this.options.dayVisible && (type === 'year' || type === 'month')) {
                    let days = Generate.days(this.year, this.month);
                    this.$refs.day.setData(days);
                }
            },
            show () {
                this.visible = true;
            },
            hide () {
                this.visible = false;
                MainServer.hide();
            },
            onClean () {
                this.options.onClean && this.options.onClean();
                this.hide();
            },
            cancel () {
                this.options.onCancel && this.options.onCancel();
                this.hide();
            },
            confirm () {
                const {yearVisible, monthVisible, dayVisible, hourVisible, minuteVisible, secondVisible} = this.options;
                let {year, month} = this;
                let day = dayVisible ? this.day : '01';
                let hour = hourVisible ? this.hour : '00';
                let minute = minuteVisible ? this.minute : '00';
                let second = secondVisible ? this.second : '00';
                let date = new Date(year, month - 1, day, hour, minute, second).getTime();

                this.options.onOk && this.options.onOk(date);
                this.hide();
            },
        },
    };

</script>
