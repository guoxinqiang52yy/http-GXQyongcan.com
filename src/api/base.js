// 接口域名管理
const region = JSON.parse(localStorage.getItem("userInfo")) ? JSON.parse(localStorage.getItem("userInfo")).region : "";
const base = {
  // baseUrl: 'http://192.168.1.110:90/',
  baseUrl:'http://wannian.jinjieyihua.com/'
}
export default base;
