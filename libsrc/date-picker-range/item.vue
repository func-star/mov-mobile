<template>
    <div class="mona-date-picker-range-con d-f">
        <div class="year h-full" v-if="options.yearVisible">
            <picker-view :source="years" :defaultValue="year" :onChange="this.getVal.bind(this, 'year')"></picker-view>
        </div>
        <div class="flex-1 h-full" v-if="options.monthVisible">
            <picker-view :source="months" :defaultValue="month" :onChange="this.getVal.bind(this, 'month')"></picker-view>
        </div>
        <div class="flex-1 h-full" v-if="options.dayVisible">
            <picker-view :source="days" :defaultValue="day" :onChange="this.getVal.bind(this, 'day')" ref="day"></picker-view>
        </div>
    </div>
</template>
<script>
    import Generate from './generate';
    import PickerView from '../picker-view';

    export default {
        components: {
            'picker-view': PickerView,
        },
        props: {
            defaultOpt: {
                type: Object,
                default: {},
            },
            itemKey: String,
        },
        data () {
            return {
                options: {},
                visible: false,
                years: [],
                months: [],
                days: [],
                year: '',
                month: '',
                day: '',
            };
        },

        created () {
            this.setOptions();
        },

        methods: {
            setOptions () {
                let ctrl = Generate.generateCtrl(this.defaultOpt.format);
                this.options = Object.assign({}, this.defaultOpt, ctrl);

                let date = (this.defaultOpt.date && this.defaultOpt.date[this.itemKey]) ? new Date(this.defaultOpt.date[this.itemKey]) : new Date();
                this.year = date.getFullYear();
                this.month = Generate.pad(date.getMonth() + 1, 2);
                this.day = Generate.pad(date.getDate(), 2);

                this.years = this.options.years ? this.options.years : Generate.years(15);
                this.months = this.options.months ? this.options.months : Generate.months();
                this.days = Generate.days(this.year, this.month);
            },
            getVal (type, val) {
                this[type] = val.value;
                if (this.options.dayVisible && (type === 'year' || type === 'month')) {
                    let days = Generate.days(this.year, this.month);
                    this.$refs.day.setData(days);
                }
            },
            getValue () {
                return {
                    year: this.year,
                    month: this.month,
                    day: this.day,
                };
            },
        },
    };

</script>
