<template>
    <div>
        <Form  ref="addForm" :model="addForm" :label-width="140" style="width:500px;background-color:white" :rules="addRuleValidate">
            <FormItem :label="'第三方支付'" >
                <Input v-model="addForm.name" />
            </FormItem>
            <FormItem :label="'第三方余额'" >
                <Input v-model="addForm.name" />
            </FormItem>
            <FormItem :label="'收款姓名'" >
                <Input v-model="addForm.name" />
            </FormItem>
            <FormItem :label="'收款银行'" >
                <Input v-model="addForm.name" />
            </FormItem>
            <FormItem :label="'收款银行账户'" >
                <Input v-model="addForm.name" />
            </FormItem>
            <FormItem :label="'所属支行'" >
                <Input v-model="addForm.name" />
            </FormItem>
            <FormItem :label="'地区'" >
                <Input v-model="addForm.name" />
            </FormItem>
            <FormItem :label="'转账金额'" >
                <Input v-model="addForm.name" />
            </FormItem>
             <FormItem :label="''" >
                {{'手续费方式，从账户余额中扣除'}}
            </FormItem>
            <Button type="primary" @click="submit()">{{"提交转账"}}</Button>
        </Form>

    </div>
</template>
<script>

export default {
    name:'',
    data(){
        return{
            addForm:{

            },
            
            addRuleValidate:{}
        }
    },
    methods:{
        submit(){

        }
    }
}
</script>
