<template>
	<div class="col-sm-6 col-md-4">
		<div class="panel panel-success">
			<div class="panel-heading">
				<h3 class="panel-title">
					{{ akcija.name }}
					<small>(Price: {{ akcija.price }})</small>
				</h3>
			</div>

			<div class="panel-body">
				<div class="pull-left">
					<input type="number" class="form-control" placeholder="Quantity" v-model="kolicina" :class="{border_red: nedovoljnoSredstava }"/>
					<!-- Stavljamo klasu u zavisnosti od nedovoljnoSredstava, ako imamo nedovoljno sredstva bajduje se klasa 'border_red' tj border input polja postaje crveno-->
				</div>

				<div class="pull-right">
					<button class="btn btn-success" @click="buyStock" :disabled="nedovoljnoSredstava || kolicina <= 0 ">{{ nedovoljnoSredstava ? 'Insufficient Funds' : 'Buy' }}</button>
					<!-- disejblujemo dugme ako je uneta kolicina manja od nule i ako broj nije ceo. Meni ovaj deo ne radi: || !Number.isInteger(kolicina) kada stavim tj uvek je disejblovano -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['akcija'],

	data() {
		return {
			kolicina: 0
		}
	},

	computed: {
		funds() {
			return this.$store.getters.funds
		},

		nedovoljnoSredstava() {
			return this.kolicina * this.akcija.price > this.funds
		}
	},

	methods: {
		buyStock() {
			const order = {
				stockID: this.akcija.id,
				stockPrice: this.akcija.price,
				quantity: this.kolicina
			}

			console.log(order)
			this.$store.dispatch('buyAkcije', order) // naravno mogla sam da mapujem actions i da pozovem ovaj action, ali radije bih sa dispatch("imeAkcije"). Ovaj action u stock.js modulu je ono gde je mutations u portfolio.js modulu ('BUY_STOCK),mogli su biti u istom modulu, ali je max namerno hteo da pokaze da nam GLOBAL_NAMESPACE pomaze da lako iz jednog modula commitujemo nesto iz drugog modula
			this.kolicina = 0
		}
	}

}
</script>

<style scoped>
	.border_red {
		border: 1px solid red;
	}
</style>