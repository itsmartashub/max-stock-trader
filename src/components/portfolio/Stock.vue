<template>
	<div class="col-sm-6 col-md-4">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h3 class="panel-title">
					{{ stockP.name }}
					<small>(Price: {{ stockP.price }} | Quantaty: {{ stockP.quantity }})</small>
				</h3>
			</div>

			<div class="panel-body">
				<div class="pull-left">
					<input type="number" class="form-control" placeholder="Quantity" v-model="kolicina" :class="{border_red: nedovoljnoKvantiteta }"/>
				</div>

				<div class="pull-right">
					<button class="btn btn-danger" @click="sellStock" :disabled="nedovoljnoKvantiteta || kolicina <= 0 ">{{ nedovoljnoKvantiteta ? 'Not enough Stocks' : 'Sell' }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	props: ['stockP'],

	data() {
		return {
			kolicina: 0
		}
	},

	computed: {
		nedovoljnoKvantiteta() {
			return this.kolicina > this.stockP.quantity // cekiramo da li je kolicina iz inputa koje smo uneli vece iz one kolicine koje imamo u nizu akcije u nasem portfoliu, drugim recima proveravamo da li zelimo da prodamo vise nego sto imamo, sto je realno nemoguce je l hhh
		}
	},

	methods: {
		...mapActions([
			'sellAkcije' // ovo ime ne sme biti isto kao ime ovog dole metoda,m a ako vec jeste, onda bolje umesto ovog arraya da koristimo objekat sa key: value parom
		]),

		sellStock() {
			const order = {
				stockID: this.stockP.id,
				stockPrice: this.stockP.price,
				quantity: this.kolicina
			}
			this.sellAkcije(order)
			this.kolicina = 0
			console.log(stockP);
		}
	}

}
</script>

<style scoped>
	.border_red {
		border: 1px solid red;
	}
</style>