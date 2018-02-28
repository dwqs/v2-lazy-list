import Vue from 'vue';

import { destroyVM, createVM } from './utils';

const getTestData = function (total) {
    const t = [];
    for (let i = 1; i <= total; i++) {
        t.push(i);
    }
    return t;
};

describe('v2-lazy-list', () => {
    describe('rendering data is correct', () => {
        const vm = createVM({
            template: `
                <v2-lazy-list :data="testData" height="320" ref="list" item-height="50"></v2-lazy-list>
            `,

            created () {
                this.testData = getTestData(10);
            }
        });

        it('item length in viewport', done => {
            setTimeout(() => {
                expect(vm.$el.querySelectorAll('.lazy-list-item')).to.have.lengthOf(Math.ceil(320 / 50));
                done();
            }, 10);
        });

        it('content height & viewport height', done => {
            setTimeout(() => {
                expect(vm.$refs.list.contentHeight).to.eql(vm.testData.length * 50);
                expect(vm.$refs.list.viewportHeight).to.eql(320);
                done();
            }, 10);
        });

        it('scrollTop', done => {
            setTimeout(() => {
                expect(vm.$refs.list.scrollTop).to.eql(0);
                vm.$refs.list.scrollTop = 120;
                expect(vm.$refs.list.scrollTop).to.eql(120);
                expect(vm.$el.querySelectorAll('.lazy-list-item')).to.have.lengthOf(Math.ceil(320 / 50));
                done();
            }, 10);
        });
    });
});
