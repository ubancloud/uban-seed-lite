import store from '@clapjs/vue-core-lite/lib/store'
import app from './store/app'

store.registerModule('app',app)

store.getters.project=(state)=>state.app.project;

export default store
