import arrStocks from "../../data/stocks";

const state = {
	arrAkcije: []
}

const mutations = {
	'SET_STOCKS' (state, akcije) { // setujemo stocks tj akcije tipa iz baze ili tako nesto, ovde konkretno iz ovog gore array-a, a posle cemo napraviti neki nas dummy data
		state.arrAkcije = akcije
	},

	'RND_STOCKS' (state) { // da random izadje neki stocks
		state.arrAkcije.forEach(akcija => {
			akcija.price = Math.round(akcija.price * (1 + Math.random() - 0.5)) // random() omogucava broj izmedju 0 i 0.9999, nije bas da to zelimo. Zelimo da uzmemo staru cenu i povecamo ili smanjimo malo. Dodajemo ispred Math.random() akcije.price *, i na Math.random() dodamo 1, sada ide br od 1 do 1.9999, a onda stavljamo - 0.5 da bi staru cenu mnozili sa nekim brojem izmedju 0.5 i 1.5. Realno, to je prilicno veliko oscilovanje za jedan dan ali je ok za ovu app. I sada treba ovu promenu da reflektujemo na sve akcije u nasem portfoliu. Zahvaljujuci vuexu ovo je macji kasalj
			console.log(akcija.price);
		})
	}
}

const actions = {
	buyAkcije: ({ commit }, order) => {
		commit('BUY_STOCK', order) // ovde cemo komitovati mutation koji nije u ovom fajlu, vec ce biti u portfolio.js. Ovo je moglo u istom modulu da se stavi, ali je amx namerno hteo da pokaze da je komitovanje moguce i izmedju modula, zahvaljujuci GLOBAL_NAMESPACOVIMA. Takodje je stavio u ovom modulu jer ovaj action treba da se okine u ovom stock.js modulu, gde onda apdejtovanje poprtfolia zaista pripada portfoliu WTF JBT. I sada ovo mozemo da dipatchujemo u stocks/Stock.vue
	},

	initAkcije: ({ commit }) => {
		commit('SET_STOCKS', arrStocks) // ovde komitujemo inicijalizovanje akcija, i prosledjujemo neke podatke ovde. Ali koje podatke i odakle ih dobijamo? Trenutno su ti podaci u stocks/Stocks.vue u arrStocks, sto naravno nije bas najidealnije mesto. TI podaci mogu biti oni sa servera, ili mozemo mi da simuliramo kao tako sto cemo napraviti neki dummy izvor podataka u folderu data
	},

	randomizeAkcije: ({ commit }) => {
		commit('RND_STOCKS')
	}
}

const getters = {
	akcije: state => {
		return state.arrAkcije
	}
}


export default {
	state,
	mutations,
	actions,
	getters
}