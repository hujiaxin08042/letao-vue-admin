import { createStore } from 'vuex'
import { login, getinfo } from '~/api/manager'
import { toast } from '~/composables/util'
import { setToken, removeToken } from '~/composables/auth'

const store = createStore({
    state () {
        return {
            // 用户信息
            user: {}
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        }
    },
    actions: {
        // 登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    // 存储token和用户相关信息
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 获取当前登录用户信息
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => { 
                    commit("SET_USERINFO", res)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        logout({ commit }) {
            // 清除cookie里的token
            removeToken()
            // 清除当前用户状态 vuex
            commit("SET_USERINFO", {})
        }
    }
})

export default store