import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import superagent from 'superagent';
import dotenv from 'dotenv';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:false}))

app.use('/league',(request, response) => {
  superagent
    .get(`https://api.football-data.org/v2/competitions/${request.query.league}/standings`)
    .set('X-Auth-Token', process.env.API_FOOTBALL_TOKEN)
    .set('accept', 'json')
    .end((err, res) => {
      if (err) {
        return response.json('houve um erro ao buscar o campeonato'+err)
      }

      const competition = JSON.parse(res.text)

      return response.json(competition)
    });
})

app.use('/matches',(request, response) => {
  superagent
    .get(`https://api.football-data.org/v2/competitions/${request.query.league}/matches?matchday=${request.query.matchday}`)
    .set('X-Auth-Token', process.env.API_FOOTBALL_TOKEN)
    .set('accept', 'json')
    .end((err, res) => {
      if (err) {
        return response.json('houve um erro ao buscar os jogos'+err)
      }

      const matches = JSON.parse(res.text)

      return response.json(matches)
    });
})

app.use('/scorers',(request, response) => {
  superagent
    .get(`https://api.football-data.org/v2/competitions/${request.query.league}/scorers?limit=5`)
    .set('X-Auth-Token', process.env.API_FOOTBALL_TOKEN)
    .set('accept', 'json')
    .end((err, res) => {
      if (err) {
        return response.json('houve um erro ao buscar os artilheiros'+err)
      }

      const scorers = JSON.parse(res.text)

      return response.json(scorers)
    });
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
});