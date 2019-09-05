<template>
	<div>
		<app-stock v-for="stock in akcije" :key="stock.id" :akcija="stock"></app-stock>
		<!-- ovaj stock bajndujem i zelim da kao props posaljem u drugu komponentu (Stock.vue) jer nam tamo treba da ispisemo NAME i PRICE koji se nalaze u stocks odn stock -->
	</div>
</template>

<script>
import Stock from './Stock'

export default {
	components: {
		appStock: Stock
	},

	//? ovaj arrStocks smo stavili da bude eksterno tj premestili da bude u data/stocks.js
	// data() {
	// 	return {
	// 		arrStocks: [
	// 			{ id: 1, name: 'BWM', price: 110 },
	// 			{ id: 2, name: 'Google', price: 200 },
	// 			{ id: 3, name: 'Apple', price: 250 },
	// 			{ id: 4, name: 'Twitter', price: 8 }
	// 		]
	// 	}
	// }

	computed: {
		akcije() {
			return this.$store.getters.akcije // mogli smo koristiti mapGetters ali s obz da smo zainteresovani ovde samo za jedan getters, onda cemu
		}
	}
}
</script>