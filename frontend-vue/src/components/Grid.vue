<template>
	<div class="container">
		<div class="side-content1">
      <h1 v-if="league">{{league.competition.name}}</h1>
      <h3>Artilheiros:</h3>
      <div v-if="scorers">
        <p v-for="item in scorers.scorers" :key="item.player.id">
          {{item.player.name}} - {{item.numberOfGoals}} Gols
        </p>
      </div>
    </div>
    <div class="side-content2">

      <div v-if="matches">
        <div v-if="loading" class="loading">
          <span class="spinner"></span>
        </div>

        <div v-else>
          <div class="rodada">
            <button @click="fetchMatches(matches.competition.code,Number(matches.filters.matchday) - 1)">
              <
            </button>
            <h3>{{matches.filters.matchday}}° Rodada</h3>
            <button @click="fetchMatches(matches.competition.code,Number(matches.filters.matchday) + 1)">
              >
            </button>
          </div>

          <p v-for="match in matches.matches" :key="match.id">
            {{match.homeTeam.name}} {{match.score.fullTime.homeTeam}} x {{match.score.fullTime.awayTeam}} {{match.awayTeam.name}}
          </p>
        </div>
      </div>
    </div>
    <div class="main-content">
    <table v-if="league">
      <tr>
        <th>Pos.</th>
        <th>Time</th>
        <th>Pts.</th>
        <th>V</th>
        <th>E</th>
        <th>D</th>
      </tr>
      <tr v-for="item in league.standings[0].table" :key="item.position">
        <td>{{item.position}}</td>
        <td>{{item.team.name}}</td>
        <td>{{item.points}}</td>
        <td>{{item.won}}</td>
        <td>{{item.draw}}</td>
        <td>{{item.lost}}</td>
      </tr>
    </table>
    </div>
	</div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    name: 'Grid',

    data(){
      return{
        loading: false
      }
    },

    computed:{
      ...mapState({
        league: state => state.leagueData,
        matches: state => state.matches,
        scorers: state => state.scorers
      })
    },

    methods:{
      fetchMatches(league,matchday){
        this.loading = true

        fetch(`http://localhost:3000/matches?league=${league}&matchday=${matchday}`,{
          method: 'get'
        })
        .then(response => response.json())
        .then(result => {
          this.$store.commit('setMatches',result)
        }).catch(error => {
          alert('ocorreu um erro ao buscar os jogos')
        }).finally(()=>this.loading = false) 
      },
    }

  }

</script>

<style scoped>
	.container{
		display: grid;
		grid-template-columns: repeat(12, [col-start] 1fr);
		gap: 10px;
    flex: 1 0 auto;
	}
	.container > * {
	    grid-column: col-start / span 12;
	}
	.side-content1, .side-content2 {
		  display: flex;
	    flex-direction: column;
	    padding: 10px;
	    font-size: 17px;
		  background-color: #e8e8e8;
      position: relative;
		}
    .side-content1 h1{
      position: relative;
      top: 0px;
      color: #fff;
      background-color: #04AA6D;
      border-radius: 20px;
      margin-bottom: 25px;
    }
    .side-content1 h2, .side-content2 h2{
      color: #000;
      margin-bottom: 20px;
    }
    .side-content2 .rodada{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .side-content2 .rodada button{
      border: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: #fff;
      background-color: #351b46;
      font-weight: bold;
      margin: 5px;
      cursor: pointer;
    }
		.main-content {
		  overflow-x: auto;
		  background-color: #e8e8e8;
		}
		.main-content table {
		  border-collapse: collapse;
		  border-spacing: 0;
		  width: 100%;
		  border: 1px solid #ddd;
		}

		.main-content table th, .main-content table td {
		  text-align: left;
		  padding: 8px;
		}

    .main-content table tr:nth-child(odd){
      background-color: #fff;
    }

		.main-content table tr:nth-child(even){
			background-color: #f2f2f2;
		}

    .main-content table th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
	@media screen and (min-width: 500px) {
		  .side-content1{
		  	grid-column: col-start / span 6;
        	grid-row: 2 / 4;
		  }
		  .side-content2{
		  	grid-column: col-start / span 6;
        	grid-row: 4 / 6;
		  }
		  .main-content {
		    grid-column: col-start 7 / span 6;
		    grid-row: 2 / 6;
		  }
		}
		@media screen and (min-width: 700px) {
		  .side-content1{
		  	grid-column: col-start / span 5;
        	grid-row: 2 / 4;
		  }
		  .side-content2{
		  	grid-column: col-start / span 5;
        	grid-row: 4 / 6;
		  }
		  .main-content {
		    grid-column: col-start 6 / span 7;
		    grid-row: 2 / 6;
		  }
		}
</style>