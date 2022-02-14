<template>
	<div class="header">
		<div v-if="loading" class="loading">
			<span class="spinner"></span>
		</div>

		<carousel :perPageCustom="[[768, 2], [1024, 3]]" paginationActiveColor="red">
		  <slide>
		  	<button type="button" @click="fetchLeagueTable('PD')">
		  		<img src="../assets/la-liga.png">
		  	</button>
		  </slide>
		  <slide>
		  	<button type="button" @click="fetchLeagueTable('PL')">
			    <img src="../assets/premier-league.png">
			</button>
		  </slide>
		  <slide>
		  	<button type="button" @click="fetchLeagueTable('FL1')">
			    <img src="../assets/ligue-1.png">
			</button>
		  </slide>
		  <slide>
		  	<button type="button" @click="fetchLeagueTable('BL1')">
			    <img src="../assets/bundesliga.png">
			</button>
		  </slide>
		  <slide>
		  	<button type="button" @click="fetchLeagueTable('SA')">
			    <img src="../assets/serie-a.png">
			</button>
		  </slide>		 
		</carousel>
	</div>
</template>

<script>
	import { Carousel, Slide } from 'vue-carousel';
	export default {

	  data(){
	  	return{
	  		loading: false
	  	}
	  },

	  components: {
	    Carousel,
	    Slide
	  },

	  methods:{
	  	fetchLeagueTable(league){
	  		this.loading = true

	  		fetch(`http://localhost:3000/league?league=${league}`,{
	  			method: 'get'
	  		})
	  		.then(response => response.json())
	  		.then(result => {
	  			this.$store.commit('setLeague',result)
	  			this.fetchMatches(league,result.season.currentMatchday)
	  		}).catch(error => {
	  			this.loading = false
	  			alert('ocorreu um erro ao buscar os dados do campeonato')
			})
	  	},

	  	fetchMatches(league,matchday){
	  		fetch(`http://localhost:3000/matches?league=${league}&matchday=${matchday}`,{
	  			method: 'get'
	  		})
	  		.then(response => response.json())
	  		.then(result => {
	  			this.$store.commit('setMatches',result)
	  			this.fetchScorers(league)
	  		}).catch(error => {
	  			this.loading = false
	  			alert('ocorreu um erro ao buscar os jogos')
			})	
	  	},

	  	fetchScorers(league){
	  		fetch(`http://localhost:3000/scorers?league=${league}`,{
	  			method: 'get'
	  		})
	  		.then(response => response.json())
	  		.then(result => {
	  			this.$store.commit('setScorers',result)
	  		}).catch(error => {
	  			alert('ocorreu um erro ao buscar os artilheiros do campeonato')
			}).finally(()=>this.loading = false)
	  	}
	  }
	}
</script>

<style scoped>
	.header{
		background-color: #60a7ff;
		padding: 25px;
		color: #fff;
		flex-shrink: 0;
	}
	.header img{
		width: 60px;
	}
	.header button{
		cursor: pointer;
	    width: 100px;
	    height: 100px;
	    border: 1px solid #585858;
	    border-radius: 15px;
	    outline: none;
	}
</style>