import LazyList from './lazy-list.vue';

function install (Vue) {
    Vue.component(LazyList.name, LazyList);
}

const V2LazyList = {
    install
};

export default V2LazyList;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(V2LazyList);
};
