<template>
    <div class='v2-lazy-list-wrap'>
        v2-lazy-list-wrap
    </div>
</template>

<script>
    import './list.less';

    export default {
        name: 'v2-lazy-list',
        props: {

        },

        data () {
            return {

            };
        },

        provide () {
            return {
                list: this
            };
        }
    };
</script>
