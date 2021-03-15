<template>
    <div class="accordion col-3 col-md-2">
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <a class="card-link" data-toggle="collapse" href="#collapseOne">
                        热门 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="collapseOne" class="collapse" data-parent="#accordion">
                    <div class="card-body border-bottom" @click="shop">
                        火爆商铺>>
                    </div>
                    <div class="card-body border-bottom" @click="shopping">
                        热门商品>>
                    </div>
                    <div class="card-body border-bottom" @click="activity">
                        近期活动>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="card-link" data-toggle="collapse" href="#one">
                        美食 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="one" class="collapse " data-parent="#accordion">
                    <div class="card-body border-bottom">
                        条目1>>
                    </div>
                    <div class="card-body border-bottom">
                        条目2>>
                    </div>
                    <div class="card-body border-bottom">
                        条目3>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
                        娱乐 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="collapseTwo" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree">
                        出行 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="collapseThree" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#two">
                        学习 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="two" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#three">
                        周边 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="three" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#four">
                        医疗 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="four" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#five">
                        教育 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="five" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1>>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <a class="collapsed card-link" data-toggle="collapse" href="#six">
                        信息 <i class="bi-chevron-double-down"></i>
                    </a>
                </div>
                <div id="six" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        条目1>>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Accordion",
        methods: {
            shop() {
                this.$bus.$emit('sign', 'shop')
            },
            shopping() {
                this.$bus.$emit('sign', 'shopping')
            },
            activity() {
                this.$bus.$emit('sign', 'activity')
            }
        }
    }
</script>

<style scoped>
    .card-body {
        font-size: small;
        cursor: pointer;
        padding: 10px;
        text-align: center;
    }

    .card-body:hover {
        text-decoration: underline #6c757d;
    }
</style>