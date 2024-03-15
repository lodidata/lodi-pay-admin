<template>
    <Card dis-hover class="query_box">
        <div class="query_date">
            <div class="item">
                <span>{{ title }}</span>
                <DatePicker type="daterange" :transfer="true" placement="bottom-end" style="width: 200px" :options="options"
                    @on-change="handleChangeDate" :value="dates" />
            </div>
            <ul class="time-btn-left">
                <li @click="getDisputeTotal('1')" :class="{ 'active': disputetype == '1' }">{{ i18n_lang.newhome28 }}</li>
                <li @click="getDisputeTotal('7')" :class="{ 'active': disputetype == '7' }">{{ i18n_lang.newhome29 }}</li>
                <li @click="getDisputeTotal('14')" :class="{ 'active': disputetype == '14' }">{{ i18n_lang.newhome30 }}</li>
                <li @click="getDisputeTotal('30')" :class="{ 'active': disputetype == '30' }">{{ i18n_lang.newhome31 }}</li>
            </ul>
          
        </div>
    </Card>
</template>
<style scoped  lang="less">
.query_box {
    margin-bottom: 0;

    .query_date {
        display: flex;
    }
}

.time-btn-left {
    margin-left: 10px;
    display: inline-block;
    overflow: hidden;

    &>li {
        display: inline-block;
        padding: 5px 10px;
        background: #FFFFFF;
        border-radius: 2px;
        font-size: 14px;
        margin-left: 10px;
        float: left;
        cursor: pointer;

        &.active {
            color: #FBFBFB;
            background: #3080fe;
        }

        &:first-child {
            margin-left: 0;
        }
    }
}
</style>
<script>
export default {
    data() {
        const i18n_lang = this.$t('newhome');
        return {
            disputetype: '',
            i18n_lang,
            selecctDate: this.dates,
            options: {
                disabledDate(date) {
                    return date && date.valueOf() > Date.now()
                }
            },
        }
    },
    watch: {
        dates(val) {
            if (val[0] != '') {
                let type = this.getDays(val[0], val[1])+1
                console.log('type',type)
                if (type == '1') {
                    this.disputetype = '1'
                } else
                    if (type == '7') {
                        this.disputetype ='7'
                    } else
                        if (type == '14') {
                            this.disputetype = '14'
                        } else
                            if (type == '30') {
                                this.disputetype = '30'
                            } else {
                                this.disputetype = ''
                            }
            } else {
                this.disputetype = ''
            }
        }
    },
    props: {
        title: {
            type: String
        },
        dates: {
            type: Array
        }
    },
    created(){
        this.handleChangeDate(this.dates)
    },
    methods: {
        toDtae(i = 0) {
            var date = new Date();
            let newDate = new Date(date.getTime() - i * 24 * 60 * 60 * 1000);

            return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
        },
        getDisputeTotal(type) {

            let from;
            let to = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`

            if (type) {
                this.disputetype = type
            }
            if (type === '1') {
                from = this.toDtae(0)
                this.selecctDate = [from, to]
            }
            if (type === '7') {
                from = this.toDtae(6)
                this.selecctDate = [from, to]
            }
            if (type === '14') {
                from = this.toDtae(13)
                this.selecctDate = [from, to]
            }
            if (type === '30') {
                from = this.toDtae(29)
                this.selecctDate = [from, to]
            }
            this.$emit('update:dates', [this.$dateFormat(this.selecctDate[0]), this.$dateFormat(this.selecctDate[1])])
        },
        getDays(date1, date2) {

            let diffTime = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays;
        },
        handleChangeDate(val) {
            if (val[0] != '') {
                let type = this.getDays(val[0], val[1])+1
                console.log('days', type)
                if (type == '1') {
                    this.disputetype = type
                } else
                    if (type == '7') {
                        this.disputetype = type
                    } else
                        if (type == '14') {
                            this.disputetype = type
                        } else
                            if (type == '30') {
                                this.disputetype = type
                            } else {
                                this.disputetype = ''
                            }
                this.$emit('update:dates', [this.$dateFormat(val[0]), this.$dateFormat(val[1])])
            } else {
                this.disputetype = ''
                this.$emit('update:dates', ['', ''])
            }
        }
    }
}
</script>

