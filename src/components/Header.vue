<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Stock Trader</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
                    <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
                </ul>

				<strong class="navbar-text navbar-right">Funds: {{ funds | valuta }}</strong>
   
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#" @click="endDay">End Day</a></li>
                    <li class="dropdown" :class="{open: isDropdownOpen}" @click="isDropdownOpen = !isDropdownOpen">
                        <a
                                href="#"
                                class="dropdown-toggle"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false">Save & Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click="saveData">Save Data</a></li>
                            <li><a href="#" @click="loadData">Load Data</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	data(){
		return {
			isDropdownOpen: false
		}
	},

	computed: {
		funds() {
			return this.$store.getters.funds
		}
	},

	methods: {
		...mapActions({
			randomizeStocks: 'randomizeAkcije',
			fetchData: 'loadData'
		}),

		endDay() { // ovde cu pozvati action koju imam u stocks.js, i za to cu da mapujem action jer cu kasnije dodati jos neki action za cuvanje i ucitavanje podataka
			this.randomizeStocks()

		},

		saveData() { // mozemo kreirati objekat ovde, mozemo i da kreiramo action i mutation u vuexu, ali obicno ne setujemo/mutatujemo state tako da to ne zvuci pravilno, jer zasto zvati mutation ako ne menjamo nista? Ono, samo cuvamo podatke
			const podaci = {
				funds: this.$store.getters.funds, 
				stockPortfolio: this.$store.getters.akcijePortfolio,
				stocks: this.$store.getters.akcije
			}
			this.$http.put('podaci.json', podaci) // sa put() rikvestom overvritujemo svaki prethodni, sto nam je trenutno i zelja, ovo podaci.json je ime node-a/cvora koji zelimo da kreiramo u firebase, i za 2.argument stavljamo podaci tj sta saljemo bazi
		},

		//! za loading akcija necemo kao metdo kao saveData jer za loading se desava neka promena, menja se state, tj stari state setujemo u novi koji smo fetchovali iz baze
		loadData() { // za ovo zelim da zaduzim actions u store-u, pravimo actions.js. Treba nam actions jer cemo vrsiti asinhroni rad
			this.fetchData()
		}
	}
}
</script>