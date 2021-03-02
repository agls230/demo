<template>
    <div>
        <nav-bars/>
        <div class="d-md-flex justify-content-center">
            <!--            修改权限-->
            <div class="mt-5 mb-5 table-responsive-md col-12 col-md-8">
                <div class="col-12 mb-3">
                    修改权限信息：
                </div>
                <table class="table table-hover text-secondary small col-12">
                    <thead>
                    <tr>
                        <th>权限id</th>
                        <th>权限名</th>
                        <th>标识符</th>
                        <th>路径</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="text" v-model="id" disabled></td>
                        <td><input type="text" ref="name" v-model="name"></td>
                        <td><input type="text" ref="sign" v-model="sign"></td>
                        <td><input type="text" ref="uri" v-model="uri"></td>
                    </tr>
                    </tbody>
                </table>
                <div class="col-12 text-right">
                    <button class="btn btn-success" @click="submit">完成</button>
                </div>
            </div>
        </div>
        <div>
        </div>
        <foot class="foot"></foot>
        <to-top/>
    </div>
</template>

<script>
    import ToTop from "../components/ToTop";
    import Foot from "../components/Foot";
    import NavBars from "../components/NavBars";
    import {request} from "../network/request";
    import {error, success} from "../util/promptBox";
    import {delayedBack} from "../util/delayedBack";

    export default {
        name: "PermissionUpdate",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                id: '',
                name: '',
                sign: '',
                uri: ''
            }
        },
        methods: {
            // 提交修改sign的信息
            submit() {
                if (this.name === '没有修改权限' && this.uri === '没有修改权限') {
                    request({
                        method: 'post',
                        url: '/permission/changePermissionSign',
                        params: {
                            id: this.id,
                            sign: this.sign
                        }
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            success()
                            delayedBack()
                        } else {
                            error()
                        }
                    }).catch(err => {
                        console.log(err)
                        error()
                    })
                } else if (this.name === '没有修改权限') {
                    request({
                        method: 'post',
                        url: '/permission/changePermissionSignAndUri',
                        params: {
                            id: this.id,
                            sign: this.sign,
                            uri: this.uri
                        }
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            success()
                            delayedBack()
                        } else {
                            error()
                        }
                    }).catch(err => {
                        console.log(err)
                        error()
                    })
                } else {
                    request({
                        method: 'post',
                        url: '/permission/changePermissionAll',
                        params: {
                            id: this.id,
                            name: this.name,
                            sign: this.sign,
                            uri: this.uri
                        }
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            success()
                            delayedBack()
                        } else {
                            error()
                        }
                    }).catch(err => {
                        console.log(err)
                        error()
                    })
                }
            }
        },
        mounted() {
            this.id = this.$route.query.id
            if (this.$route.query.names) {
                this.name = this.$route.query.names
            } else {
                this.name = '没有修改权限'
                this.$refs.name.setAttribute('disabled', 'true')
            }
            if (this.$route.query.signs) {
                this.sign = this.$route.query.signs
            } else {
                this.sign = '没有修改权限'
                this.$refs.sign.setAttribute('disabled', 'true')
            }
            if (this.$route.query.uris) {
                this.uri = this.$route.query.uris
            } else {
                this.uri = '没有修改权限'
                this.$refs.uri.setAttribute('disabled', 'true')
            }
        }
    }
</script>

<style scoped>
    input {
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        border: none;
    }

    /*.foot {*/
    /*    position: fixed;*/
    /*    bottom: 0;*/
    /*    width: 100%;*/
    /*}*/

    th, td {
        white-space: nowrap;
    }
</style>