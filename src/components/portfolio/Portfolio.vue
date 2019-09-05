<template>
	<div>
		<app-stock v-for="akcijaP in akcijeP" :key="akcijaP.id" :stockP="akcijaP"></app-stock>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Stock from './Stock.vue'

export default {
	computed: {
		...mapGetters({
			akcijeP: 'akcijePortfolio'
		})
	},

	components: {
		appStock: Stock
	}
}
</script>