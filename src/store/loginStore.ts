import {defineStore} from "pinia";

export const useLoginStore = defineStore('login', {
    state() {
        return {
            user: null,
            error: null,
        };
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        isLogged(state) {
            return !!state.user;
        }
    },
});
