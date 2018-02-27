<template>
    <div class='v2-list-example'>
        <div class="demo-wrap">
            <v2-lazy-list v-bind:data='list' v-bind:height="520"></v2-lazy-list>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                list: [
                    1,2,3,4,5,6,7,8,9,10,
                    11,12,13,14,15,16,17,18,19,20
                ]
            }
        }
    }
</script>

<style lang="less">
    body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .v2-list-example {
        margin: 0 auto;
        padding-top: 40px;
        padding-bottom: 40px;
        width: 960px;
        background-color: #fff;
    }
    .demo-wrap {
        margin: 0 auto;
        width: 750px;
        height: 520px;
        border: 1px solid #d1d5da;
    }
</style>
