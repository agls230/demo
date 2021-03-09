<template>
    <!--    返回顶部标签-->
    <div class="position-fixed text-secondary border d-flex align-items-center justify-content-center top"
         title="返回顶部" v-if="seen" @click="btn">
        <i class="fa fa-arrow-up"></i>
    </div>
</template>

<script>
    export default {
        name: "ToTop",
        data() {
            return {
                seen: false,
            }
        },
        methods: {
            // 距离顶部高度
            height() {
                this.seen = pageYOffset > 0;
            },
            btn() {
                const stop_top = setInterval(() => {
                    let height = document.documentElement.scrollTop || document.body.scrollTop;
                    if (height > 0) {
                        document.documentElement.scrollTop = document.body.scrollTop = height - height / 10;
                    } else {
                        clearInterval(stop_top);
                    }
                }, 10);
            }
        },
        mounted() {
            // 监听滚轮事件
            window.addEventListener("scroll", this.height)
        },
        destroyed() {
            window.removeEventListener("scroll", this.height)
        }
    }
</script>

<style scoped>
    .top {
        width: 40px;
        height: 40px;
        bottom: 30px;
        right: 30px;
        border-radius: 5px;
        font-size: 18px;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 9999;
        cursor: pointer;
    }
</style>