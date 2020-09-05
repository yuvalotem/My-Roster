const express = require('express')
const urllib = require('urllib')
const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
let data 

urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, response) {
     data = JSON.parse(response).league.standard;
})

router.get('/teams/:teamName', (req, res) => {
    const team = req.params.teamName
    const players = data
        .filter(p => p.teamId == teamToIDs[team] && p.isActive)
        .map(p => {
            return {
                name: `${p.firstName} ${p.lastName}`,
                jersy: p.jersey,
                position: p.teamSitesOnly.posFull,
                img: `http://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`,
                dreamTeam: false
            }
        })
    res.send(players)
})

router.get('/playerStats/:player', (req, res) => {
    const player = req.params.player.split(" ")
    urllib.request(`https://nba-players.herokuapp.com/players-stats/${player[1]}/${player[0]}`, function (err, response) {
        if (response.toString() == "Sorry, that player was not found. Please check the spelling.") {
            res.send()
        } else {
            const stats = JSON.parse(response)
            const shortStats = {}
            shortStats.assist = stats.assists_per_game
            shortStats.blocks = stats.blocks_per_game
            shortStats.points = stats.points_per_game
            shortStats.rebounds = stats.rebounds_per_game
            shortStats.steals = stats.steals_per_game
            res.send(shortStats)
        }
    })

})

router.put('/team', function(req, res) {
    const teamName = req.body.teamName.name 
    const teamId = req.body.teamId.id
    teamToIDs[teamName] = teamId
    res.send(teamToIDs)
})

let dreamTeam = []
router.get('/dreamTeam', function(req, res) {
    res.send(dreamTeam)
})

router.post('/roster', function(req, res) {
    const player = req.body
    dreamTeam.push(player)
    res.end()
})

router.delete('/roster/:name', function (req, res) {
    const playerName = req.params.name
    dreamTeam = dreamTeam.filter(p => p.name != playerName)
    res.send(dreamTeam)
})

router.post('/roster')

module.exports = router