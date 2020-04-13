// 接口域名管理
const region = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")).region : "";
const base = {
  baseUrl:'http://wannian.jinjieyihua.com/'
  // baseUrl:'http://wanniantest.jinjieyihua.com/'
}
export default base;
