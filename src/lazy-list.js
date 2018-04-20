import BeautifyScrollbar from 'beautify-scrollbar';
import raf from 'raf';

import debounce from './debounce';

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
        },

        mode: {
            type: String,
            default: 'demand',
            validator: val => ['demand', 'lazy'].indexOf(val) > -1
        }
    },

    data () {
        const ih = Number.parseInt(this.itemHeight, 10);
        const isPercent = String(this.height).indexOf('%') > -1;

        let vh = Number.parseInt(this.height, 10);

        if (isPercent) {
            vh = this.height;
        } else {
            vh = (Number.isNaN(vh) || vh < VOEWPORT_MIN_HEIGHT) ? VOEWPORT_MIN_HEIGHT : vh;
        }

        return {
            renderList: [], // on-demand render the list 
            scrollTop: 0,
            isPercent: isPercent,

            // outside viewport
            viewportWith: 0,
            viewportHeight: vh,
            ih: (Number.isNaN(ih) || ih < ITEM_MIN_HEIGHT) ? ITEM_MIN_HEIGHT : ih,

            // inner content
            contentWidth: NaN,
            contentHeight: NaN,
            contentMarginTop: 0,

            scrollbar: null,
            wrapRect: null
        };
    },

    watch: {
        data (val, oldVal) {
            this.initRenderList();
            if (val.length !== oldVal.length) {
                this.updateScrollbar();
            }
        },

        scrollTop (val) {
            this.$emit('scrolling');
            raf(this.updateRenderList);
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
                height: this.isPercent ? this.viewportHeight : this.viewportHeight + 'px'
            }
        }, [children]);
    },

    methods: {
        initRenderList () {
            this.contentHeight = Math.ceil(this.data.length * this.ih);
            if (this.mode === 'demand') {
                this.renderList = this.getDemandList();
            } else if (this.mode === 'lazy') {
                this.renderList = this.getLazyList();
            }
        },

        updateRenderList () {
            if (this.mode === 'demand') {
                this.renderList = this.getDemandList();
            } else if (this.mode === 'lazy') {
                this.renderList = this.getLazyList();
            }
        },

        updateScrollbar () {
            if (this.scrollbar) {
                this.$nextTick(() => {
                    this.scrollbar.update({
                        contentHeight: this.contentHeight
                    });
                });
            }
        },
        
        // get demand list
        getDemandList () {
            const list = [];
            const vh = this.isPercent ? this.wrapRect.height : this.viewportHeight;

            const from = Math.floor(this.scrollTop / this.ih); 
            const to = Math.ceil((this.scrollTop + vh) / this.ih);

            for (let i = from; i < to; i++) {
                if (typeof this.data[i] !== 'undefined') {
                    list.push(
                        this.$h(this.itemTag, {
                            class: {
                                'lazy-list-item': true
                            },
                            style: {
                                height: this.ih + 'px'
                            }
                        }, this.$scopedSlots.default ? this.$scopedSlots.default(this.data[i]) : [i])
                    );
                }
            }
            this.contentMarginTop = from * this.ih;
            return list;
        },

        // get lazy list
        getLazyList () {
            if (this.renderList.length === this.data.length) {
                return this.renderList;
            }
            
            const list = [].concat(this.renderList);
            const vh = this.isPercent ? this.wrapRect.height : this.viewportHeight;            

            const from = list.length; 
            const to = Math.ceil((this.scrollTop + vh) / this.ih);

            for (let i = from; i < to; i++) {
                if (typeof this.data[i] !== 'undefined') {
                    list.push(
                        this.$h(this.itemTag, {
                            class: {
                                'lazy-list-item': true
                            },
                            style: {
                                height: this.ih + 'px'
                            }
                        }, this.$scopedSlots.default ? this.$scopedSlots.default(this.data[i]) : [i])
                    );
                }
            }

            this.contentMarginTop = 0;
            return list;
        },

        scrollStop () {
            this.$emit('scroll-stop');
        },

        updateScrollVal () {
            clearTimeout(this.timer);
            this.scrollTop = this.scrollbar.element.scrollTop;
            this.timer = setTimeout(() => {
                this.scrollStop();
            }, 300);
        },

        reachThreshold () {
            this.$emit('reach-threshold');
        },

        handleWinResize () {
            this.wrapRect = this.$el.getBoundingClientRect();
            if (this.scrollbar.rect.height !== this.wrapRect.height) {
                this.updateRenderList();
                this.updateScrollbar();
            }
        }
    },

    created () {
        this.winResize = debounce(this.handleWinResize);
    },

    mounted () {
        this.viewportWith = this.$el.clientWidth;
        this.wrapRect = this.$el.getBoundingClientRect();

        this.data.length && this.initRenderList();
        this.$nextTick(() => {
            this.scrollbar = new BeautifyScrollbar(this.$el, {
                contentWidth: this.contentWidth,
                contentHeight: this.contentHeight
            });
            this.$el.addEventListener('bs-update-scroll-value', this.updateScrollVal, false);
        });

        window.addEventListener('resize', this.winResize, false);
    },

    beforeDestroy () {
        this.scrollbar && this.scrollbar.destroy();
        this.$el.removeEventListener('bs-update-scroll-value', this.updateScrollVal, false);
        window.removeEventListener('resize', this.winResize, false);
    }
};
