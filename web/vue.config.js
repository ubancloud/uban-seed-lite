const createThemeColorReplacerPlugin = require('./config/plugin.config');
const path = require("path");
module.exports = {
    configureWebpack: {
        plugins: [
            createThemeColorReplacerPlugin(),
        ],
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve('src')).set('vue', path.resolve('./node_modules/vue'))
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.iclearjs.develop",
                "productName":"ClearJS",//项目名，也是生成的安装文件名
                "copyright":"ClearJS Copyright © 2021",//版权信息
                "publish": [{
                    "provider": "generic",
                    "url": "http://119.3.37.79/update/"
                }],
                "win":{//win相关配置
                    "icon":"./icon.ico",//图标，当前图标在根目录下，注意这里有两个坑
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": ["x64"]//64位
                        }
                    ]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./icon.ico",// 安装图标
                    "uninstallerIcon": "./icon.ico",//卸载图标
                    "installerHeaderIcon": "./icon.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "ClearJS", // 图标名称
                },
                "mac":{//mac相关配置
                    "icon":"./icon.png",//图标，当前图标在根目录下，注意这里有两个坑
                },
            },
            nodeIntegration: true,
            preload: 'src/background/preload.js',
        }
    },
    lintOnSave: false,
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                lessOptions:{
                    modifyVars: {
                        'font-size-base': '12px',
                    },
                    javascriptEnabled: true
                }
            }
        }
    },
    outputDir: '../server/app/public',
    assetsDir: 'static',
    indexPath: 'index.html',
    runtimeCompiler: true,
    productionSourceMap: false,
    parallel: undefined
};
