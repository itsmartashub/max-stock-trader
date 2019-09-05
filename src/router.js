import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Portfolio from './components/portfolio/Portfolio.vue'
import Stocks from './components/stocks/Stocks.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
	{
		path: '/',
		name: 'home',
		component: Home
	},

	{
		path: '/portfolio',
		name: 'portfolio',
		component: Portfolio
	},

	{
		path: '/stocks',
		name: 'stock',
		component: Stocks
	},





















	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	}
	]
})
