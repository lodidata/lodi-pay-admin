import { Button, Poptip } from 'iview'

export default function (Vue) {
    const i18n = Vue.$t('systemSetting')
    return [
        {
            title: i18n.systemSetting0,
            type: 'index',
            align: 'center'
        },
        {
            title: i18n.systemSetting1,
            key: 'name',
            align: 'center',

        },
        {
            title: i18n.systemSetting2,
            key: 'key',
            align: 'center'
        },
        {
            title: i18n.systemSetting3,
            key: 'description',
            align: 'center'
        },
        {
            title: i18n.systemSetting4,
            key: 'admin_name',
            align: 'center',
            render(h, { row }) {
                return (
                    <div>
                        {
                            row.content.type === 'number'  ? <div>{row.content.value}</div> : ''
                        }
                        {
                            row.content.type === 'boolean' ?  row.content.value? i18n.systemSetting6 : i18n.systemSetting7 : ''
                        }
                        {
                            row.content.type === 'percent' ? <div>{row.content.value}{row.content.unit}</div> : ''
                        }

                    </div>
                )
            }
        },
        {
            title: i18n.systemSetting5,
            align: 'center',
            render(h, { row }) {
                return (
                    <div>
                        <Button
                            size='small'
                            type='primary'
                            v-auth={13}
                            style='margin-right:5px'
                            on-click={_ => Vue.handleOpenModal(row)}
                        >
                            {i18n.systemSetting8}
                        </Button>

                    </div>
                )
            }
        }
    ]
}
