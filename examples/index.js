import Vue from 'vue';

import V2LazyList from '../src/index';

import App from './app';

Vue.use(V2LazyList);

new Vue({
    el: '#app',
    render: (h) => h(App)
});
