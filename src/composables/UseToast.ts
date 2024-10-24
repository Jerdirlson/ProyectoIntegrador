import { reactive } from 'vue';

export type ToastType = 'success' | 'warning' | 'error';

export interface Toast {
    title: string;
    description?: string;
    type: ToastType;
    timeoutId: number;
}

export const toastStatus = reactive({
    open: false,
    title: '',
    description: '',
    type: 'success' as ToastType,
    timeoutId: 5000,
});

export const useToast = (info?: Toast) => {
    if (toastStatus.open) {
        toastStatus.open = false;
        setTimeout(() => {
            showNewToast(info);
        }, 300);
    } else {
        showNewToast(info);
    }
};

const showNewToast = (info?: Toast) => {
    toastStatus.title = info?.title ?? '';
    toastStatus.description = info?.description ?? '';
    toastStatus.type = info?.type ?? 'success';
    toastStatus.timeoutId = info?.timeoutId ?? 5000;
    toastStatus.open = true;
};
