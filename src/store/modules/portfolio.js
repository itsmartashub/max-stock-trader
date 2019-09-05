const state = {
	funds: 10000, // novcana sredstva
	arrAkcijePortfolio: [] // ne svi stockovi
}

const mutations = {
	'BUY_STOCK'(state, { stockID, quantity, stockPrice }) {// za drugi argument stavljam destructuring object sa nekim propertijima, a kako znam da cu imati ove propertije? Pa ovo su oni propertiji iz ordera (stock/Stock.vue)
		const zapis = state.arrAkcijePortfolio.find(element => element.id == stockID) // kada za find metod napisemo ovako u jednom redu, a ne ono {} onda moze ovako bez return, al kad bismo pisali sa {} onda bi morali return. //? Ako dobro kontam ovde trazimo poklapanje elementa sa id-em iz onog niza akcija koje korisnik vec poseduje (fazon iz portfolia) sa onim na koje je korisnik kliknuo buy
		if(zapis) { //? ako ima zapisa odnosno ako ima poklapanja stocka iz niza portfolio akcija i ovog na koji je kor kliknuo buy
			zapis.quantity += quantity //? onda za kolicinu tog portfolio stocka dodaj ovu koju je korisnik uneo
		} else { //? a ako korisnik nema tu odredjenu akciju u svom portfoliu, dodamo je
			state.arrAkcijePortfolio.push({
				id: stockID,
				quantity: quantity
			})
		}
		
		// console.log(state.arrAkcijePortfolio[0].kvantitet);

		state.funds -= stockPrice * quantity //? i kada kliknemo na buy, novcana sredstva se smanjuju za cenu akcije puta kolicina

		console.log('Quantity: ' + quantity + ' | zapis.quantity: ' + zapis.quantity);
	},

	'SELL_STOCK'(state, { stockID, quantity, stockPrice }) {
		const zapis = state.arrAkcijePortfolio.find(element => element.id == stockID)
		if (zapis.quantity > quantity) { //? ako je kolicina/vrednost akcije koje korisnik vec ima u portfoliu veca od vrednosti koju je uneo za tu akciju tj za koliko hoce da je prodam onda umanji kvantitet akcije iz portfolia za tu unetu vrednost
		//ako je kolicina koju je korisnik uneo manja od kolicine nzm cega onda smanji stari kvantiten za onoliko koliko je korisnik uneo.....NZM JOS
			zapis.quantity -= quantity // stara kolicina iz portfolia minus kolicina iz order-a
		} else { //? a ako akcija 'kosta' npr 30, a ja dam 50, onda je brisi iz niza, tj 'prodata' je? Tj ako zelim da je prodam za vise ili onoliko koliko je, onda je brisem iz niza portfolio akcija
			state.arrAkcijePortfolio.splice(state.arrAkcijePortfolio.indexOf(zapis), 1) //? brisanje odredjenog/kupljenog stocka iz portfolia jer smo ga prodali
		}
		state.funds += stockPrice * quantity // i naravno, povecavam novcani iznos za cenu akcije puta kvantitet
		console.log('Quantity: ' + quantity + ' | zapis.quantity: ' + zapis.quantity);
	},

	'SET_PORTFOLIO' (state, portfolio) {
		state.funds = portfolio.funds
		state.arrAkcijePortfolio = portfolio.akcijeP ? portfolio.akcijeP : []
	}
}

const actions = {
	sellAkcije({commit}, order) {
		commit('SELL_STOCK', order)
	}
}

const getters = { // za pocetak da vidim okoje podatke zelimo da getujemo, koji podaci nam trebaju. Recimo treba da vidim koje su trenutne akcije u portfoliu, i koja novcana sredstva imam
	akcijePortfolio (state, getters) { // dakle zelim da vidim koliko trenutno imam akcija u portfoliu 
		return state.arrAkcijePortfolio.map(akcija => { // i posto imam samo stockID u ovom arrAkcijePortfolio, treba mi pristup akcijama u stocks.js modulu, zbog toga smo injectovali getere ovde gore, da bismo pronasli ID odn ime ove akcije koju imam u portfoliu. Za to mozemo da koristimo map() array metod, on nam omogucava da transformisemo svaki element u nizu, dakle sa map dohvatamo odredj element i odlucujemo kako hocemo da ga izmenimo
			const zapis = getters.akcije.find(el => el.id == akcija.id ) // (ovo pristupam getters u stock.js-u onom metodu tamo akcije). Dakle dohvatamo preko getters.akcije onaj metod u stock.js za sve akcije, lupujemo kroz te sve akcije, generalno akcije, dakle sve one a ne samo u portfolu dohvatamo njihov id i trazimo poklapanje sa ovom ovde akcijom iz map() i radim neke transformacije tj vracam objekat u koji ce se transformisati svaka akcija
				// console.log(zapis.id);
				return {
					id: zapis.id,
					quantity: zapis.quantity,
					name: zapis.name,
					price: zapis.price
				}
				// dakle u ovom lokalnom nizu akcija imam samo id i kvantitet i zato ih zadrzavam ovde, a onda dohvatam overall niz akcija (onaj sve akcije) da dohvatim ime i cenu, i onda praaavim novi niz gde mapiramo sve ove vrednosti da prosirimo vrednosti u nizu, ne da samo imamo id i kvantitet vec sada i ime i cenu
		})
	},

	funds (state) {
		return state.funds
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}