import Vue from 'vue'
import router from '@clapjs/vue-core-lite/lib/router'
import NProgress from 'nprogress'

router.addRoute('index',{path: '/dash', name: 'dash', component: {template: `<a-result status="success" title="欢迎使用clap.js"></a-result>`,}})

router.beforeEach( (to, from, next) => {
    NProgress.start();
    const checkLogin=()=>{
        return (process.env.IS_ELECTRON?Vue.ls:Vue.$cookies).get('ACCESS_TOKEN')!==null
    }
    if(!checkLogin()&&['login','register'].indexOf(to.name)<0){
        router.replace({name: 'login'})
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
});

router.onReady( () => {

});

export default router
