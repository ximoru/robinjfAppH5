export const obj = getUrlConfig();

/*
* 动态配置正式环境和预生产环境的接口访问路径
*/
function getUrlConfig() {
  
    /******************************** 路径配置 ******************************/
    let url = {
        defaultsUrl: 'http://robintestapi.shinn.xin', 
        //defaultsUrl: 'http://118.190.199.183', // 正式ip地址 (rest)
        //defaultsUrl: 'http://182.254.223.136:8887',// 测试的默认url (rest)
        //defaultsUrl: 'http://robintestapi.shinn.xin',//个人信息测试环境2  (rest)
    };

    return url;
}
