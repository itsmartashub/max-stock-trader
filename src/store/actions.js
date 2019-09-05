import  Vue from 'vue'

export const loadData = ({commit}) => {
	Vue.http.get('podaci.json')
		.then(response => response.json())
		.then(data => {
			if(data) {
				const akcije = data.stocks
				const funds = data.funds
				const akcijeP = data.stockPortfolio

				const portfolio = { // ovo je takodje state koji smo setovali u portfolio.js (funds, arrAkcijePortfolio)
					akcijeP,
					funds
				}

				commit('SET_STOCKS', akcije)
				commit('SET_PORTFOLIO', portfolio)
			}
		})
}