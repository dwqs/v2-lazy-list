<template>
    <div class='v2-lazy-list-wrap' ref="wrap" v-bind:style="{
        height: containerHeight + 'px'
    }">
        <ul class='v2-lazy-list' ref="content">
            <li class='lazy-list-item' v-for="(item, index) in data" v-bind:key="index">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    import './list.less';

    import ScrollBar from './scrollbar/index.js';

    const CONTAINER_MIN_HEIGHT = 320;
    const ITEM_MIN_HEIGHT = 20;

    export default {
        name: 'v2-lazy-list',
        props: {
            data: {
                type: Array,
                default: () => []
            },

            height: {
                type: Number,
                default: CONTAINER_MIN_HEIGHT
            },

            itemHeight: {
                type: Number,
                default: ITEM_MIN_HEIGHT * 2
            }
        },

        data () {
            const ch = Number.parseInt(this.height);
            const ih = Number.parseInt(this.itemHeight);

            return {
                renderList: [],
                isRenderAll: false,
                scrollTop: 0,

                containerWith: 0,
                containerHeight: (Number.isNaN(ch) || ch < CONTAINER_MIN_HEIGHT) ? CONTAINER_MIN_HEIGHT : ch,
                ih: (Number.isNaN(ih) || ih < ITEM_MIN_HEIGHT) ? ITEM_MIN_HEIGHT : ih,

                scrollbar: null
            };
        },

        watch: {
            data (val) {
                this.initRenderList();
            },

            scrollTop (val) {
                if (this.isRenderAll) {
                    return;
                }

            }
        },

        provide () {
            return {
                list: this
            };
        },

        methods: {
            initRenderList () {
                this.isRenderAll = this.renderList.length === this.data.length;
                if (this.isRenderAll) {
                    return;
                }

                const initCount = Math.ceil(this.containerHeight / this.ih) + 1;
                this.renderList = initCount < this.data.length ? [].concat(this.data.slice(0, initCount)) : [].concat(this.data);
            },

            updateRenderList () {

            },

            updateScrollVal ({ scrollLeft, scrollTop }) {
                console.log('scrollTop', scrollTop);
                this.scrollTop = scrollTop;
            }
        },

        mounted () {
            this.containerWith = this.$el.clientWidth;
            // this.containerHeight = this.$el.clientHeight;

            console.log('wwww', this.containerHeight);
            this.initRenderList();
            this.$nextTick(() => {
                this.scrollbar = new ScrollBar(this.$el, {
                    contentWidth: this.$refs.content.scrollWidth,
                    contentHeight: Math.ceil(this.data.length * this.ih), //this.$refs.content.scrollHeight,
                    callBack: this.updateScrollVal
                })
            });
        }
    };
</script>
