<template>
    <div class="col-12 text-secondary">
        <nav-bar/>
        <top/>
        <!--            当前信息导航-->
        <div class="row m-3">
            <div class="input-group offset-md-4 col-md-4">
                <input type="text" class="form-control" v-model="findById" placeholder="由id搜索">
                <div class="input-group-append">
                    <button class="btn btn-success" @click="searchId" type="button"><i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <!--            表头-->
        <div class="row border-bottom text-dark" style="height: 40px">
            <div class="col-md-1">id</div>
            <div class="col-md-1">用户名</div>
            <div class="col-md-1">密码</div>
            <div class="col-md-1">邮箱</div>
            <div class="col-md-1">真名</div>
            <div class="col-md-1">启用</div>
            <div class="col-md-1">锁定</div>
            <div class="col-md-1">过期</div>
            <div class="col-md-1">凭证过期</div>
            <div class="col-md-1">创建时间</div>
            <!--            <div class="col-md-1">上次登录</div>-->
            <div class="col-md-2 text-center">操作</div>
        </div>
        <div class="hid row border-bottom" v-for="(list,index) in allInfo">
            <div @click="" class="col-md-1">{{list.id}}</div>
            <div @click="" class="col-md-1"><input v-model="list.username" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.password" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.email" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.realName" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.used" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.locked" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.userExpired" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.certificateExpired" disabled></div>
            <div @click="" class="col-md-1">{{list.createTime}}</div>
            <!--            <div @click="userToRole" class="col-md-1">{{list.lastTime}}</div>-->
            <div class="col-md-2">
                <button class="btn btn-sm btn-primary" @click="update(index)">修改</button>
                <button class="btn btn-sm btn-success" @click="updateSuccess(index)">提交</button>
                <button class="btn btn-sm btn-info" @click="userToRole(index)">角色</button>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import Top from '../components/Top';
    import {request} from "../network/request";

    export default {
        name: "User",
        data() {
            return {
                allInfo: [],
                findById: '',
                id: '',
                username: '',
                password: '',
                email: '',
                realName: '',
                isUsed: '',
                isLocked: '',
                userExpired: '',
                certificateExpired: '',
                createTime: '',
                lastTime: ''
            }
        },
        components: {
            NavBar,
            Top
        },
        methods: {
            // 页面初始化显示所有用户
            init() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'get',
                        url: '/user/super/users'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    this.allInfo = []
                    console.log(res.data.users)
                    this.allInfo = res.data.users
                })
            },
            // 由id搜索
            searchId() {
                if (this.findById.length > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/user/simple/user',
                            params: {
                                id: this.findById
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data.user)
                        this.allInfo = []
                        this.allInfo.push(res.data.user)
                        console.log(this.allInfo)
                    })
                }else {
                    this.init()
                }
            },
            // 修改信息
            update(index) {
                let num = index * 8 + 1
                document.getElementsByTagName('input')[num].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 1].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 2].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 3].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 4].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 5].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 6].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 7].removeAttribute('disabled')
            },
            // 提交修改的信息
            updateSuccess(index) {
                let num = index * 8 + 1
                document.getElementsByTagName('input')[num].disabled = true
                document.getElementsByTagName('input')[num + 1].disabled = true
                document.getElementsByTagName('input')[num + 2].disabled = true
                document.getElementsByTagName('input')[num + 3].disabled = true
                document.getElementsByTagName('input')[num + 4].disabled = true
                document.getElementsByTagName('input')[num + 5].disabled = true
                document.getElementsByTagName('input')[num + 6].disabled = true
                document.getElementsByTagName('input')[num + 7].disabled = true
                console.log(this.allInfo[index].username)
                // simple用户信息
                // request({
                //     method: 'post',
                //     url: '/user/simple/changeUser',
                //     params: {
                //         id: this.allInfo[index].id,
                //         username: this.allInfo[index].username,
                //         email: this.allInfo[index].email,
                //         realName: this.allInfo[index].realName
                //     }
                // }).then(res => {
                //     console.log(res)
                // }).catch(err => {
                //     console.log(err)
                // })
                // super状态信息
                // request({
                //     method: 'post',
                //     url: '/user/super/changeUser',
                //     params: {
                //         id: this.allInfo[index].id,
                //         isUsed: this.allInfo[index].used,
                //         isLocked: this.allInfo[index].locked,
                //         userExpired: this.allInfo[index].userExpired,
                //         certificateExpired: this.allInfo[index].certificateExpired
                //     }
                // }).then(res => {
                //     console.log(res)
                // }).catch(err => {
                //     console.log(err)
                // })
                // // 根据id改密码
                request({
                    method: 'post',
                    url: '/user/simple/changePassword',
                    params: {
                        userId: this.allInfo[index].id,
                        password: this.allInfo[index].password
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                // 根据email改密码
                // request({
                //     method: 'post',
                //     url: '/user/simple/findPassword',
                //     params: {
                //         email: this.allInfo[index].email,
                //         password: this.allInfo[index].password
                //     }
                // }).then(res => {
                //     console.log(res)
                // }).catch(err => {
                //     console.log(err)
                // })
            },
            userToRole(index) {
                this.$router.push({
                    name: 'Role',
                    params: {id: this.allInfo[index].id}
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .col-md-1 input {
        border: none;
        outline: none;
        background-color: rgba(255, 255, 255, 0);
    }

    .hid div {
        overflow: hidden;
    }
</style>