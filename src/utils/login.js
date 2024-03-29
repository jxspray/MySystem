import router from "@/router";
import store from "@store/store";
import cookie from 'vue-cookies';
import { isWeixin } from "@utils";
import { oAuth } from "@utils/wechat";

export default function toLogin(push, backUrl) {
  store.commit("LOGOUT");
  const { fullPath, name } = router.currentRoute;
  cookie.set("login_back_url", backUrl || fullPath);
  if (isWeixin()) {
    oAuth();
  } else {
    if (name !== "Login") {
      push
        ? router.push({ path: "/login" })
        : router.replace({ path: "/login" });
    }
  }
}
