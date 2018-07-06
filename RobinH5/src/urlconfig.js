export const obj = getUrlConfig();

/*
* 动态配置正式环境和预生产环境的接口访问路径
*/
function getUrlConfig() {
  
    /******************************** 路径配置 ******************************/
    let url = {
        defaultsUrl: 'http://182.254.223.136:8887', // 测试的默认url (rest)
    };

    return url;
}
