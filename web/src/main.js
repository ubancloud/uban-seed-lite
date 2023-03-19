import Vue from 'vue'
import App from './App.vue'

import ConfigAxios from "@/config/config.axios";
import ConfigDefault from "@/config/config.default";
import ConfigMenu from "@/config/config.menu";
import ConfigUrl from "@/config/config.url";

import ClapVueCoreLite from "@clapjs/vue-core-lite";

Vue.use(ClapVueCoreLite,{...ConfigDefault,axios:ConfigAxios,url:ConfigUrl,menu:ConfigMenu})

import i18n from "@/lib/i18n";
import router from "@/lib/router";
import store from "@/lib/store";
import bootstrap from './bootstrap'

Vue.config.productionTip = false;

new Vue({router, store, i18n, created: bootstrap, render: h => h(App)}).$mount('#app');
