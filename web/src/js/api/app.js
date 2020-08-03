const root = process.env.NODE_ENV;
// 开发环境
const baseURL = {
    /**
     * 以下为容器启动需要配置参数
     */
    DATAURL: "http://10.72.78.125:1337",
    portalPath: "http://10.72.78.125:8090",
    devOpsPath: "http://10.72.78.125:9529",
    elasticearchPath: "http://10.72.78.125:9530",
    microservicePath: "http://10.72.78.125:9528",
    workbenchPath: "http://10.72.78.125:9526"
};
//测试提交
/**
 * 以下代码本地启动需要注释掉
 */

const arr = document.querySelector("html").dataset.promiseBaseUrl.split(";");
arr.forEach(item => {
    const path = item.split("|");
    baseURL[path[0]] = path[1];
});

//****************/
module.exports = baseURL;
//import baseURL from '@/api/app.js';