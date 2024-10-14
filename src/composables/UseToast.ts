import { reactive, watch } from 'vue';

export type ToastType = 'success' | 'warning' | 'error';

export interface Toast {
    title?: string;
    description?: string;
    type?: ToastType;
}

export const toastStatus = reactive({
    open: false,
    title: '',
    description: '',
    type: 'success' as ToastType,
    timeoutId: null as number | null,
});

export const useToast = (info?: Toast) => {
    if (toastStatus.timeoutId !== null) {
        clearTimeout(toastStatus.timeoutId);
        toastStatus.timeoutId = null;
    }

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
    toastStatus.open = true;

    toastStatus.timeoutId = setTimeout(() => {
        toastStatus.open = false;
        toastStatus.timeoutId = null;
    }, 3000) as unknown as number;
};

const resetToast = () => {
    if (toastStatus.timeoutId !== null) {
        clearTimeout(toastStatus.timeoutId);
        toastStatus.timeoutId = null;
    }
    toastStatus.title = '';
    toastStatus.description = '';
    toastStatus.type = 'success';
};

watch(
    () => toastStatus.open,
    (newValue) => {
        if (!newValue) {
            setTimeout(resetToast, 300);
        }
    },
);
