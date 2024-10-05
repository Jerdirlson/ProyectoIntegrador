import {reactive, watch} from "vue";

export interface Alert {
    title?: string;
    description?: string;
}

export const alertStatus = reactive({
    open: true,
    title: '',
    description: ''
})

export const useAlert = (info?: Alert) => {
    alertStatus.title = info.title ?? ''
    alertStatus.description = info.description ?? ''

    alertStatus.open = true
}

const resetAlert = () => {
    alertStatus.title = ''
    alertStatus.description = ''
}

watch(
    () => alertStatus.open,
    () => {
        if(!alertStatus.open){
            resetAlert()
        }else {
            setTimeout(() => {
                alertStatus.open = false
            }, 2000)
        }
    }
)
