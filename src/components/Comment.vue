<template>
    <div class="clo-12 col-md-10 offset-md-1 position-relative">
        <div style="height: 300px;overflow-y: scroll">
            <div v-for="(list,index) in allInfo">
                <div class="d-inline-block w-75">标题：{{list.subject}}</div>
                <div class="d-inline-block w-25"><i class="bi-star-fill text-warning"></i>{{list.star}}
                </div>
                <div class="text-secondary small">评论：{{list.content}}</div>
                <hr>
            </div>
        </div>
        <!--        撰写评论-->
        <div class="position-relative w-75" style="bottom: 0;transform: translateX(-50%);left: 50%">
            <div class="commentShow" ref="commentShow">
                <div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text">主题</span>
                    </div>
                    <input v-model="sub" type="text" class="form-control" placeholder="评论标题">
                </div>
                <div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text">打分</span>
                    </div>
                    <input v-model="star" type="text" class="form-control" placeholder="用户评分">
                </div>
                <div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text">评论</span>
                    </div>
                    <input v-model="con" type="text" class="form-control" placeholder="评论内容">
                </div>
                <div class="m-3 text-right">
                    <button class="btn btn-outline-primary btn-sm" type="button" @click="commitInfo">发布
                    </button>
                </div>
            </div>
            <div class="m-3 text-right" ref="tip">
                <button class="btn btn-outline-primary btn-sm" type="button" @click="addComment">评论
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../network/request";
    import {error, success} from "../util/promptBox";
    import {mapMutations} from "vuex";

    export default {
        name: "Commit",
        data() {
            return {
                id: '',
                type: '',
                textState: false,
                commentText: '',
                sub: '',
                star: '',
                con: '',
                allInfo: []
            }
        },
        methods: {
            ...mapMutations(['changeComment']),
            init() {
                this.id = this.$store.state.comment.id
                this.type = this.$store.state.comment.type
                // 查询本店评论
                if (this.type === 'shop') {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            params: {
                                sid: this.id
                            },
                            url: '/evaluation/findEvaluationByShop'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                        this.allInfo = res.data.evaluations
                    })
                } else if (this.type === 'commodity') {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            params: {
                                cid: this.id
                            },
                            url: '/evaluation/findEvaluationByCommodity'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                    })
                } else if (this.type === 'evaluation') {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            params: {
                                sid: this.id
                            },
                            url: '/evaluation/findEvaluationByCommodity'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                    })
                }

            },
            addComment() {
                const commentShow = this.$refs.commentShow
                const tip = this.$refs.tip
                if (this.textState === false) {
                    commentShow.style.height = '185px'
                    commentShow.style.transition = 'all ease 0.3s'
                    tip.style.display = 'none'
                    this.textState = !this.textState
                }
            },
            commitInfo() {
                const commentShow = this.$refs.commentShow
                const tip = this.$refs.tip
                this.textState = !this.textState
                commentShow.style.height = '0'
                commentShow.style.transition = 'all ease 0.3s'
                tip.style.display = 'block'
                if (this.sub && this.star < 6 && this.con) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                id: this.id,
                                type: this.type,
                                evaluationDto: {
                                    subject: this.sub,
                                    star: this.star,
                                    content: this.con
                                }
                            }),
                            url: '/evaluation/create'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            success('发布成功。')
                            this.init()
                        } else {
                            error('发布失败。')
                        }
                    })
                }
            },
            // const _this = this
            // _this.changeComment({id: this.allShop[index].id, type: 'shop'})
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .commentShow {
        overflow: hidden;
        height: 0;
    }

    ::-webkit-scrollbar {
        display: none;
    }
</style>