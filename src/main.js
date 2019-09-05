import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import App from './App.vue'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(VueResource) // nakon ovoga mzemo koristiti http req
Vue.http.options.root = 'https://stock-trader-max.firebaseio.com/' // dakle ovim kazemo da ce svi rikvestovi biti upuceni na ovaj link


Vue.filter('valuta', (value) => {
	return `$ ${value.toLocaleString()}` // toLocaleString() omogucava nice looking valutu, u zavisnosti od toga gde zivimo, od lokala, tj da li ce biti tacka ili zarez i to, tipa 10.000 ili 10,000? I sa ovim filterom sada mogu da idem u Header.vue i tamo gde je funds printan da dodamo pajp (pipe iliti |) i da ispisemo pored valuta, i u Home.vue takodje
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
