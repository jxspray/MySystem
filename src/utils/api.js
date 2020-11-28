import request from "./request";

/*
 * 首页数据信息
 * */
export function getindex() {
  return request.get("index.php?g=Home&m=Index&a=test", {}, {login: false});
}
/**
 * 会员中心
 * @param data
 */
export function userindex() {
  return request.get("/user/index", {}, {login: true});
}
/**
 * 登录
 * @param data
 */
export function login(data) {
  return request.post("/login/login", data, {login: false})
}
/**
 * 获取微信sdk配置
 * @returns {*}
 */
export function getWechatConfig() {
  return request.get("/login/wxconfig", {url: document.location.href}, {login: false})
}
/**
 * 获取微信sdk配置
 * @returns {*}
 */
export function wechatAuth(code, spread) {
  return request.get("/login/auth", {
    code,
    spread
  }, {login: false})
}
//微信支付
export function wechatPay(data) {
  return request.get("/Pay/getcode", data, {login: false})
}
//发送验证码
export function mobile_yzm(data) {
  return request.get("/user/mobile_yzm", data, {login: false})
}
//文件下载_加载
export function path_load(data) {
  return request.get("/user/path_load", data, {login: false})
}
//============老师==========
//老师列表_页面加载
export function teach_load(data) {
  return request.get("/index/teach_load", data, {login: true})
}
//老师列表_列表加载
export function teach_list(data) {
  return request.get("/index/teach_list", data, {login: true})
}
//老师详情_页面加载
export function teachinfo_load(data) {
  return request.get("/index/teachinfo_load", data, {login: false})
}
//============用户==========
//用户分享_设置
export function share_save(data) {
  return request.get("/user/share_save", data, {login: false})
}
//签到海报_生成
export function create_sign(data) {
  return request.get("/user/create_sign", data, {login: true})
}
//分享海报_生成
export function create_haibao(data) {
  return request.get("/user/create_haibao", data, {login: true})
}
//课程/题库海报_生成
export function create_haiinfo(data) {
  return request.get("/user/create_haiinfo", data, {login: true})
}
//签到福利_加载
export function fuli_load(data) {
  return request.get("/user/fuli_load", data, {login: true})
}
//个人设置_加载
export function setting_load(data) {
  return request.get("/user/setting_load", data, {login: true})
}
//个人设置_保存
export function setting_save(data) {
  return request.get("/user/setting_save", data, {login: true})
}
//添加收藏
export function collect(data) {
  return request.get("/user/collect", data, {login: true})
}
//用户签到_保存xiao
export function sign_save(data) {
  return request.get("/user/sign_save", data, {login: true})
}
//我的收藏_列表xiao
export function collect_list(data) {
  return request.get("/user/collect_list", data, {login: true})
}
//我的下载_列表xiao
export function down_list(data) {
  return request.get("/user/down_list", data, {login: true})
}
//我的优币_加载xiao
export function point_load(data) {
  return request.get("/user/point_load", data, {login: true})
}
//我的优币_列表xiao
export function point_list(data) {
  return request.get("/user/point_list", data, {login: true})
}
//我的报名_列表xiao
export function baolist_list(data) {
  return request.get("/user/baolist_list", data, {login: true})
}
//报名详情_加载xiao
export function baoinfo_load(data) {
  return request.get("/user/baoinfo_load", data, {login: true})
}

//============题库==========
//题库列表_页面加载
export function tklist_load() {
  return request.get("/tk/tklist_load", {}, {login: false})
}
//题库列表_列表加载
export function tklist_list(data) {
  return request.get("/tk/tklist_list", data, {login: false})
}
//题库详情_页面加载
export function tkinfo_load(data) {
  return request.get("/tk/tkinfo_load", data, {login: false})
}
//题库详情_资料下载
export function tkinfo_down(data) {
  return request.get("/tk/tkinfo_down", data, {login: true})
}
//============考试==========
//考试详情_页面加载
export function ksinfo_load(data) {
  return request.get("/ks/ksinfo_load", data, {login: false})
}
//考试详情_立即报名
export function ksinfo_save(data) {
  return request.get("/ks/ksinfo_save", data, {login: true})
}
//============课程==========
// 课程列表_页面加载
export function kc_load() {
  return request.get("/kc/kc_load", {}, {login: false})
}
//课程列表_列表加载
export function kc_list(data) {
  return request.get("/kc/kc_list", data, {login: false})
}
//课程详情_页面加载
export function kcinfo_load(data) {
  return request.get("/kc/kcinfo_load", data, {login: false})
}
//课程详情_立即报名
export function kcinfo_save(data) {
  return request.get("/kc/kcinfo_save", data, {login: true})
}
//============订单==========
//订单提交_加载
export function order_load(data) {
  return request.get("/user/order_load", data, {login: true})
}
//订单提交_提交
export function order_save(data) {
  return request.get("/user/order_save", data, {login: true})
}
//订单取消
export function order_cancel(data) {
  return request.get("/user/order_cancel", data, {login: true})
}
//订单结果_加载
export function payres_load(data) {
  return request.get("/user/payres_load", data, {login: true})
}


//优币充值_加载xiao
export function joinpoint_load(data) {
  return request.get("/user/joinpoint_load", data, {login: true})
}
//优币充值_下单xiao
export function joinpoint_save(data) {
  return request.get("/user/joinpoint_save", data, {login: true})
}
//VIP充值_加载xiao
export function joinuser_load(data) {
  return request.get("/user/joinuser_load", data, {login: true})
}
//VIP充值_下单xiao
export function joinuser_save(data) {
  return request.get("/user/joinuser_save", data, {login: true})
}
//VIP充值_列表xiao
export function joinuser_list(data) {
  return request.get("/user/joinuser_list", data, {login: true})
}
//领券中心_加载
export function ling_load(data) {
  return request.get("/coupons/ling_load", data, {login: true})
}
//获取可领取的优惠券
export function get_issue_coupon_list(data){
  return request.get("/coupons/get_issue_coupon_list", data, {login: true})
}
//领取优惠券
export function user_get_coupon(data){
  return request.get("/coupons/user_get_coupon", data, {login: true})
}
//获取用户指定类型的优惠券
export function get_use_coupons(data){
  return request.get("/coupons/get_use_coupons", data, {login: true})
}
//我的优惠券_加载
export function you_load(data) {
  return request.get("/coupons/you_load", data, {login: true})
}