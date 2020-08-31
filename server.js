const express = require('express')
const app = express()
const urllib = require('urllib')
const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

let players = []
app.get('/teams/:teamName', (req, res) => {
    const team = req.params.teamName
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, response) {
        const data = JSON.parse(response.toString()).league.standard;
        players = data
            .filter(p => p.teamId == teamToIDs[team] && p.isActive)
            .map(p => {
                return {
                    name: `${p.firstName} ${p.lastName}`,
                    jersy: p.jersey,
                    position: p.teamSitesOnly.posFull,
                    img: `http://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`
                }
            })
        res.send(players)
    })
})

const path = require('path')
const { data } = require('jquery')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const port = 3000
app.listen(port, function () {
    console.log(`Server up and running in port ${port}`)
})