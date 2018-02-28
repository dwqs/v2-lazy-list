<template>
    <div class='v2-lazy-list-wrap' ref="wrap" v-bind:style="{
        height: viewportHeight + 'px'
    }">
        <ul class='v2-lazy-list' ref="content" v-bind:style="{marginTop: contentMarginTop + 'px'}">
            <li class='lazy-list-item' 
                v-bind:style="{
                    height: ih + 'px'
                }" 
                v-for="(item, index) in renderList" v-bind:key="index">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    import './list.less';

    import ScrollBar from './scrollbar/index.js';

    const VOEWPORT_MIN_HEIGHT = 320;
    const ITEM_MIN_HEIGHT = 20;

    export default {
        name: 'v2-lazy-list',
        props: {
            data: {
                type: Array,
                default: () => []
            },

            height: {
                type: [Number, String],
                default: VOEWPORT_MIN_HEIGHT
            },

            itemHeight: {
                type: [Number, String],
                default: ITEM_MIN_HEIGHT * 2
            }
        },

        data () {
            const ch = Number.parseInt(this.height);
            const ih = Number.parseInt(this.itemHeight);

            return {
                renderList: [], // on-demand render the list 
                scrollTop: 0,

                // outside viewport
                viewportWith: 0,
                viewportHeight: (Number.isNaN(ch) || ch < VOEWPORT_MIN_HEIGHT) ? VOEWPORT_MIN_HEIGHT : ch,
                ih: (Number.isNaN(ih) || ih < ITEM_MIN_HEIGHT) ? ITEM_MIN_HEIGHT : ih,

                // inner content
                contentWidth: NaN,
                contentHeight: NaN,
                contentMarginTop: 0,

                scrollbar: null
            };
        },

        watch: {
            data (val) {
                this.initRenderList();
                if (this.scrollbar) {
                    this.scrollbar.updateContentHeight(this.contentHeight);
                }
            },

            scrollTop (val) {
                this.updateRenderList();
            }
        },

        provide () {
            return {
                list: this
            };
        },

        methods: {
            initRenderList () {
                this.contentHeight = Math.ceil(this.data.length * this.ih);
                this.renderList = this.getRenderList();
            },

            updateRenderList () {
                this.renderList = this.getRenderList();
            },

            getRenderList () {
                const list = [];

                const from = Math.floor(this.scrollTop / this.ih); 
                const to = Math.floor((this.scrollTop + this.viewportHeight) / this.ih);

                for(let i = from; i <= to; i++) {
                    if (!!this.data[i]) {
                        list.push(this.data[i]);
                    }
                }
                this.contentMarginTop = from * this.ih;
                return list;
            },

            updateScrollVal ({ scrollLeft, scrollTop }) {
                this.scrollTop = scrollTop;
            }
        },

        mounted () {
            this.viewportWith = this.$el.clientWidth;

            this.initRenderList();
            this.$nextTick(() => {
                this.scrollbar = new ScrollBar(this.$el, {
                    contentWidth: this.contentWidth, //this.$refs.content.scrollWidth,
                    contentHeight: this.contentHeight, // this.$refs.content.scrollHeight,
                    callBack: this.updateScrollVal
                });
            });
        }
    };
</script>
