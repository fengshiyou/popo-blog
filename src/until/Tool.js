const getHeightByRadio = (radio = 1) => {
    //获取浏览器高度
    const client_height = document.documentElement.clientHeight || document.body.clientHeight;
    return client_height * radio;
}
export {getHeightByRadio}

/**
 * 获取配置
 *  配置文件命名规范: 文件所属类型.config.js  例如:request.config.js 就是所有request请求相关的配置
 *  相关文件中的对应配置项命名：开发环境_文件类型_配置命名
 */

export function getConfig(value) {
    //获取基础配置
    const env_config = require("../config/env.config");
    //开发环境 配置
    const dev = env_config.dev;
    //获取配置类型
    const type = getConfigKey(value);
    //引入配置文件
    const type_config =  require("../config/" +type + ".config");
    return type_config[dev +"_" + value]
}
//通过配置值获取配置类型   规范:配置值由 类型_值组成:request_blog_list 是request类型中的blog_list值
const getConfigKey = (value)=> value.split("_")[0]
