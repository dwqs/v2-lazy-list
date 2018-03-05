import BeautifyScrollbar from 'beautify-scrollbar';

const VOEWPORT_MIN_HEIGHT = 100;
const ITEM_MIN_HEIGHT = 20;

export default {
    name: 'v2-lazy-list',
    props: {
        data: {
            type: Array,
            default: () => [],
            required: true
        },

        height: {
            type: [Number, String],
            default: VOEWPORT_MIN_HEIGHT
        },

        itemHeight: {
            type: [Number, String],
            default: ITEM_MIN_HEIGHT * 2
        },

        tag: {
            type: String,
            default: 'ul'
        },

        itemTag: {
            type: String,
            default: 'li'
        },

        threshold: {
            type: [Number, String],
            default: 0
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
                this.$nextTick(() => {
                    this.scrollbar.update({
                        contentHeight: this.contentHeight
                    });
                });
            }
        },

        scrollTop (val) {
            this.updateRenderList();
            if (this.threshold > 0 && this.contentHeight - this.viewportHeight - val <= this.threshold) {
                this.reachThreshold();
            }
        }
    },

    provide () {
        return {
            list: this
        };
    },
    
    render (h) {
        if (!this.$h) {
            this.$h = h;
        }

        const children = h(this.tag, {
            class: {
                'v2-lazy-list': true
            },
            style: {
                marginTop: this.contentMarginTop + 'px'
            }
        }, this.renderList);

        return h('div', {
            class: {
                'v2-lazy-list-wrap': true
            },
            style: {
                height: this.viewportHeight + 'px'
            }
        }, [children]);
    },

    methods: {
        renderItem () {

        },

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
            const to = Math.ceil((this.scrollTop + this.viewportHeight) / this.ih);

            for (let i = from; i < to; i++) {
                if (typeof this.data[i] !== 'undefined') {
                    list.push(
                        this.$h(this.itemTag, {
                            class: {
                                'lazy-list-item': true
                            },
                            style: {
                                height: this.ih + 'px',
                                lineHeight: this.ih + 'px'
                            }
                        }, this.$scopedSlots.default ? this.$scopedSlots.default(this.data[i]) : [i])
                    );
                }
            }
            this.contentMarginTop = from * this.ih;
            return list;
        },

        updateScrollVal () {
            this.scrollTop = this.scrollbar.element.scrollTop;
        },

        reachThreshold () {
            this.$emit('reach-threshold');
        }
    },

    mounted () {
        this.viewportWith = this.$el.clientWidth;

        this.data.length && this.initRenderList();
        this.$nextTick(() => {
            this.scrollbar = new BeautifyScrollbar(this.$el, {
                contentWidth: this.contentWidth,
                contentHeight: this.contentHeight
            });
            this.$el.addEventListener('bs-update-scroll-value', this.updateScrollVal, false);
        });
    },

    beforeDestroy () {
        this.scrollbar && this.scrollbar.destroy();
        this.$el.removeEventListener('bs-update-scroll-value', this.updateScrollVal, false);
    }
};
