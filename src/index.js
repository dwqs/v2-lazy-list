import LazyList from './lazy-list.vue';

function install (Vue) {
    if (Vue.version < 2.2) {
        throw new Error('Only adapted to Vue 2.2.0 or higher');
    }
    Vue.component(LazyList.name, LazyList);
}

const V2LazyList = {
    install
};

export default V2LazyList;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(V2LazyList);
};
