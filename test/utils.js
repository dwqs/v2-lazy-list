import Vue from 'vue';
import V2LazyList from 'main/index';

Vue.use(V2LazyList);

export const createVM = (opts) => {
    return new Vue(opts).$mount();
};

export const destroyVM = (vm) => {
    vm.$destroy && vm.$destroy();
    vm.$el &&
    vm.$el.parentNode &&
    vm.$el.parentNode.removeChild(vm.$el);
};
