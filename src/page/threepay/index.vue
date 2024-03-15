<template>
    <div>
        <Tabs v-model="curTab" >
            <!--
            <TabPane :label="'发起转账'" name="Transfer">
                <Transfer ref="transfer" v-if="curTab === 'Transfer'"></Transfer>
            </TabPane>-->
            <TabPane :label="i18n_lang.threePay0" name="Record">
                <Record ref="record" v-if="curTab === 'Record'"></Record>
            </TabPane>
            <TabPane :label="i18n_lang.threePay1" name="ThreePay">
                <ThreePay ref="threePay" v-if="curTab === 'ThreePay'"></ThreePay>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>

import Record from './Record.vue'
import ThreePay from './ThreePay.vue'
import Transfer from './Transfer.vue'

export default {
    name:'',
    components:{
        Record,
        ThreePay,
        Transfer
    },
    data(){
        const i18n_lang = this.$t('threePay');
        return{
            i18n_lang:i18n_lang,
            curTab:"Record"
        }
    }
}
</script>
