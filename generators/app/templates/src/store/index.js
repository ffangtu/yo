import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')),
    },
    mutations: {
        changelogin(state, data) {
            state.user = data;
        }
    }
});