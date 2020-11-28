import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'
Vue.use(Cookie)
Vue.use(Vuex)

const LOGIN_KEY = "login_status";


export default new Vuex.Store({
  state: {
    // 定义各种全局变量
    token: Cookie.get(LOGIN_KEY) , 
    tjcode: Cookie.get('tjcode'),
  },
  mutations: {
    LOGIN(state, token, expires_time) {
      state.token = token;
      Cookie.set(LOGIN_KEY, token, expires_time);
    },
    LOGOUT(state) {
      state.token = undefined;
      Cookie.remove(LOGIN_KEY);
    },
    //记录分享ID
    SETSPREAD(state,tjcode){
      state.tjcode = tjcode;
      var newTime = Math.round(new Date() / 1000);
      Cookie.set('tjcode', tjcode, newTime + 86400 * 2);
    }
  }
})