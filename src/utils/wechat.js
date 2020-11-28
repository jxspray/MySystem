import WechatJSSDK from "wechat-jssdk/dist/client.umd";
import { getWechatConfig, wechatAuth,share_save } from "@utils/api";
import { parseQuery } from "@utils";
import cookie from "vue-cookies";
import store from "@store/store";
import dayjs from "dayjs";

const STATE_KEY = "wx_authorize_state";
const WX_AUTH = "wx_auth";
const BACK_URL = "login_back_url";
let instance;
let wechatObj;
 
export default function wechat() {
  return new Promise((resolve, reject) => {
    if (instance) return resolve(instance);
    getWechatConfig()
      .then(res => {
        const _wx = WechatJSSDK(res.data);
        wechatObj = _wx;
        _wx.initialize()
          .then(() => {
            instance = _wx.wx;
            instance.initConfig = res.data;
            resolve(instance);
          })
          .catch(reject);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function clearAuthStatus() {
  cookie.remove(WX_AUTH);
  cookie.remove(STATE_KEY);
}

export function oAuth() {
  if (cookie.isKey(WX_AUTH) && store.state.token) return;
  const { code } = parseQuery();
  if (!code) return toAuth();
}

export function auth(code) {
  return new Promise((resolve, reject) => {
    wechatAuth(code, parseInt(store.state.tjcode))
      .then(({ data }) => {
        const expires_time = dayjs(data.expires_time);
        const newTime = Math.round(new Date() / 1000);
        store.commit("LOGIN", data.token, expires_time - newTime);
        cookie.set(WX_AUTH, code, expires_time);
        cookie.remove(STATE_KEY);
        resolve();
      })
      .catch(reject);
  });
}

export function toAuth() {
  getWechatConfig().then(res => {
    location.href = getAuthUrl(res.data.appId);
  });
}

function getAuthUrl(appId) {
  const redirect_uri = encodeURIComponent(
    `${location.origin}/auth?url=` +
      encodeURIComponent(
        encodeURIComponent(
          cookie.isKey(BACK_URL)
            ? cookie.get(BACK_URL)
            : location.pathname + location.search
        )
      )
  );
  cookie.remove(BACK_URL);
  const state = encodeURIComponent(
    ("" + Math.random()).split(".")[1] + "authorizestate"
  );
  cookie.set(STATE_KEY, state);
  // return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;//独立公众号链接
  return `http://cmf.528k.cn/jovo/wx/index?appid=wxc971096f5c3e767f&appsecret=e817f4fcd4d575b16edfa6bfb8a02862&scope=&backurl=${redirect_uri}&state=${state}`;
}

function toPromise(fn, config = {}) {
  return new Promise((resolve, reject) => {
    fn({
      ...config,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete(err) {
        reject(err);
      },
      cancel(err) {
        reject(err);
      }
    });
  });
}

export function pay(config) {
  return toPromise(instance.chooseWXPay, config);
}

export function openAddress() {
  return toPromise(instance.openAddress);
}

export function openShareAll(config) {
  config || {};
  config.type = config.type == undefined ? "link" : config.type;
  return new Promise(resolve => {
    getWechatConfig().then(res => {
      wechatObj.signSignature({
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        timestamp: res.data.timestamp
      });
      instance = wechatObj.getOriginalWx();
      instance.ready(() => {
        instance.updateAppMessageShareData(config);
        instance.updateTimelineShareData(config);
        resolve();
      });
    });
  });
}

export function openShareAppMessage(config) {
  // instance.updateAppMessageShareData(config);
  // instance.onMenuShareAppMessage && instance.onMenuShareAppMessage(config);
  instance.onMenuShareAppMessage(config);
}

export function openShareTimeline(config) {
  // instance.updateTimelineShareData(config);
  // instance.onMenuShareTimeline && instance.onMenuShareTimeline(config);
  instance.onMenuShareTimeline(config);
}

export function wechatEvevt(name, config) {
  return new Promise((resolve, reject) => {
    let wx;
    let configDefault = {
      fail(res) {
        console.log(res);
        if (wx) return reject({ is_ready: true, wx: wx });
        getWechatConfig().then(res => {
          wechatObj.signSignature({
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            timestamp: res.data.timestamp
          });
          wx = wechatObj.getOriginalWx();
          reject({ is_ready: true, wx: wx });
        });
      },
      success(res) {
        resolve(res);
      }
    };
    Object.assign(configDefault, config);
    if (typeof instance !== "undefined") {
      instance.ready(() => {
        if (typeof name === "object") {
          name.forEach(item => {
            instance[item] && instance[item](configDefault);
          });
        } else instance[name] && instance[name](configDefault);
      });
    } else {
      getWechatConfig().then(res => {
        const _wx = WechatJSSDK(res.data);
        _wx.initialize().then(() => {
          instance = _wx.getOriginalWx();
          instance.ready(() => {
            if (typeof name === "object") {
              name.forEach(item => {
                instance[item] && instance[item](configDefault);
              });
            } else instance[name] && instance[name](configDefault);
          });
        });
      });
    }
  });
}

export function ready() {
  return new Promise(resolve => {
    if (typeof instance !== "undefined") {
      instance.ready(() => {
        resolve(instance);
      });
    } else {
      getWechatConfig().then(res => {
        const _wx = WechatJSSDK(res.data);
        _wx.initialize().then(() => {
          instance = _wx.wx;
          instance.ready(() => {
            resolve(instance);
          });
        });
      });
    }
  });
}
