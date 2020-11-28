import localStorage from "./localStorage";

export {
  localStorage
};

export function trim(str) {
  return String.prototype.trim.call(str);
}

export function isType(arg, type) {
  return Object.prototype.toString.call(arg) === "[object " + type + "]";
}

export function isWeixin() {
  return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
}

export function SplitArray(list, sp) {
  if (typeof list != 'object') return [];
  if (sp === undefined) sp = [];
  for (var i = 0; i < list.length; i++) {
    sp.push(list[i]);
  }
  return sp;
}

export function parseQuery() {
  const res = {};

  const query = (location.href.split("?")[1] || "")
    .trim()
    .replace(/^(\?|#|&)/, "");

  if (!query) {
    return res;
  }
  query.split("&").forEach(param => {
    const parts = param.replace(/\+/g, " ").split("=");
    const key = decodeURIComponent(parts.shift());
    const val = parts.length  > 0 ? decodeURIComponent(parts.join("=")) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}
//注册页面时间
export function regPageAction(page){
    if (page.ajaxlock == 1 || page.ajaxend == true) return;
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
    var windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
    var scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
    if (scrollTop + windowHeight == scrollHeight) {     
      page.AjaxList();
    }
}

const VUE_APP_API_URL = 'http://www.webcms.com/';
//const VUE_APP_API_URL = 'http://www.vueapi.com/wap';
export {
  VUE_APP_API_URL
};
