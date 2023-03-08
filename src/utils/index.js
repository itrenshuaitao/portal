import store from "@/store/index";
// 按钮级权限
export function hasPermission(permission) {
  const btns = store.state.permission.btnList;
  const result = btns.filter((item) => {
    return item.sourceUrl === permission;
  });
  return result.length === 1;
}
// 防抖
export class Debounce {
  constructor(delay) {
    this.delay = delay ? delay : 500;
    this.timeOut = null;
  }
  debounceEnd() {
    return new Promise((resolve, reject) => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        resolve("success");
      }, this.delay);
    });
  }
}
/**
 * 时间格式话
 * @param {Object} date
 * @param {Object} format
 */
export function FormatDate(format, date) {
  date = new Date(date);
  let args = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let i in args) {
    let n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
      );
  }
  return format;
}
// 封装函数queryURLParams
// @params:url
// @return:参数
export function queryURLParams(url) {
  let askIn = url.indexOf("?"),
    wellIn = url.indexOf("#"),
    askText = "",
    wellText = "";
  // #不存在
  wellIn === -1 ? (wellIn = url.length) : null;
  // ?存在
  askIn >= 0 ? (askText = url.substring(askIn + 1, wellIn)) : null;
  wellText = url.substring(wellIn + 1);
  let result = {};
  wellText !== "" ? (result["HASH"] = wellText) : null;
  if (askText !== "") {
    let ary = askText.split("&");
    ary.forEach((item) => {
      let aryText = item.split("=");
      result[aryText[0]] = aryText[1];
    });
  }
  return result;
}
// 获取内页bannerImg
// 内页banner位置 1:产品 2:解决方案 3:案例分享 4:新闻中心 5:视频中心 6: 企业介绍 7:招聘人才 8:联系我们
export const queryBannerImg = (index)=>store.state.bannerList.length&&store.state.bannerList.filter(item => item.nbannerPlace==index)[0]?.nbannerImg||'https://easyv.assets.dtstack.com/homepage/common/assets/images/market-consultation/search_bg.jpg'