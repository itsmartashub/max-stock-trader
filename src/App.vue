<template>
  <div class="container">
		<app-header></app-header>
		<div class="row">
			<div class="col-xs-12">
				<transition name="slide" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
	components: {
		appHeader: Header
	},

	// za sada se app raspada jer nigde nismo inicijalizovali nase sstore podatke i to, a najbolje mesto za inicijalizaciju je kada se nasa App komponenta ucita/inicijalizuje, ali pre renderinga a to je dakle created() lifecycle hook
	created() { 
		this.$store.dispatch('initAkcije') // dispatch otpremanje. Necija posiljka necega ili nekome sa destinacijom ili sa nekom namerom WTF. Sinonimi su sending, posting, mailing itd
	}
}
</script>

<style>
	body {
		padding: 30px;
	}

	.slide-enter-active {
		animation: slide-in 200ms ease-out forwards
	}

	.slide-leave-active {
		animation: slide-out 200ms ease-out forwards
	}

	@keyframes slide-in {
		from {
			transform: translateY(-30px);
			opacity: 0;
		}
		to {
			transform: translateY(0px);
			opacity: 1;
		}
	}
	
	@keyframes slide-out {
		from {
			transform: translateY(0px);
			opacity: 1;
		}
		to {
			transform: translateY(-30px);
			opacity: 0;
		}
	}
</style>
