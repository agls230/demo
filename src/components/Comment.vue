<template>
    <div class="clo-12 col-md-10 offset-md-1 position-relative">
        <div style="height: 300px;overflow-y: scroll">
            <div v-for="(list,index) in allInfo">
                <div class="d-inline-block w-75">标题：{{list.subject}}</div>
                <div class="d-inline-block w-25"><i class="bi-star-fill text-warning"></i>{{list.star}}
                </div>
                <div class="text-secondary small">评论：{{list.content}}</div>
                <div class="comIndex" id="commentReText">
                    <span class="small more" @click.once="commentNext(index)">查看更多<i
                            class="bi bi-chevron-compact-down"></i></span>&nbsp;&nbsp;
                    <span class="small more" @click="commentRe(index)">回复</span>
                </div>

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
                allInfo: [],
                comments: false,
                commentIndex: 0,
                commRe: [],
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
                        // console.log(res.data)
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
                        // console.log(res.data)
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
                    if (this.comments === false) {
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
                            console.log(res)
                            if (res.data.res === 'ok') {
                                success('发布成功。')
                                this.init()
                            } else {
                                error('发布失败。')
                            }
                        })
                    } else {
                        new Promise((resolve, reject) => {
                            request({
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: JSON.stringify({
                                    id: this.commentIndex,
                                    type: 'evaluation',
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
                            // console.log(res.data)
                            if (res.data.res === 'ok') {
                                success('回复成功。')
                                this.init()
                            } else {
                                error('回复失败。')
                            }
                        })
                        this.comments = false
                    }
                }
            },

            commentNext(index) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {
                            eid: this.allInfo[index].id
                        },
                        url: '/evaluation/findEvaluationByEvaluation'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    // console.log(res.data)
                    if (res.data.res === 'ok') {
                        this.commRe = res.data.evaluations
                        const elements = Array.from(document.getElementsByClassName('comIndex'));
                        const that = elements[index];

                        for (let i = 0; i < this.commRe.length; i++) {
                            const divName = document.createElement('div')
                            divName.style.color = '#6c757d'
                            divName.style.fontSize = '13px'
                            divName.style.marginLeft = '30px'
                            const nodeName = document.createTextNode('标题：' + this.commRe[i].subject)
                            divName.appendChild(nodeName)
                            that.appendChild(divName)

                            const divCon = document.createElement('div')
                            divCon.style.color = '#6c757d'
                            divCon.style.fontSize = '13px'
                            divCon.style.marginLeft = '30px'
                            const nodeCon = document.createTextNode('内容：' + this.commRe[i].content)
                            divCon.appendChild(nodeCon)
                            that.appendChild(divCon)

                            const hr = document.createElement('hr')
                            that.appendChild(hr)
                        }
                    }
                })
            },
            commentRe(index) {
                this.addComment()
                this.comments = true
                this.commentIndex = this.allInfo[index].id
            }
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

    .more:hover {
        color: #007bff;
        cursor: pointer;
    }
</style>