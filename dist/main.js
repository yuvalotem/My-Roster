const display = new Render()
const teams = []
$('#team-button').on('click', function () {
    const input = $('#team-input').val()
    $.get(`/teams/${input}`, function (data) {
        display.renderData(data)
        $('#team-input').val('')
    })
})

$('#players').on('click', 'img', function () {
    const name = $(this).closest('div').find('.playerName').text()
    $.get(`/playerStats/${name}`, (data) => {
        display.renderStats(data, this)
    })
})

$('#players').on('click', '.add-player', function () {
    const $div = $(this).closest('div')
    const player = {
        name: $div.find('.playerName').text(),
        jersy: $div.find('.playerJersy').text(),
        position: $div.find('.playerPosition').text(),
        img: $div.find('img').attr('src'),
        dreamTeam: true
    }
    $.get(`/dreamTeam`, (data) => {
        if (data.some(p => p.name == player.name)) {
            alert("already in the dream team")
        } else {
            $.post(`/roster`, player, (res) => { })
        }
    })
})

$('#dream-team').on('click', function () {
    $.get(`/dreamTeam`, (data) => {
        display.renderData(data)
        display.renderInput()
    })
})

$('#players').on('click', '.remove-player', function () {
    const name = $(this).closest('div').find('.playerName').text()
    $.ajax({
        method: "DELETE",
        url: (`/roster/${name}`),
        success: (data) => { 
            display.renderData(data)
            display.renderInput()
         }
    })
})

$('#players').on('click', '.create', function () {
    const teamName = $(this).closest('div').find('.teamName').val()
    $.get(`/dreamTeam`, (data) => {
        localStorage[teamName] = JSON.stringify(data)
        teams.push(teamName)
        display.renderSaved(teams)
    })
})
$('#showTeam').on('click', function () {
    const teamName = $('#saved-users').val()
    const data = JSON.parse(localStorage[teamName])
    display.renderData(data)
})

for(let i in localStorage){
    if(typeof localStorage[i] === 'string'){
        teams.push(i)
    }
}
display.renderSaved(teams)