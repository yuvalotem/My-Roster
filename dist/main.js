const display = new Render()

$('#team-button').on('click', function () {
    const input = $('#team-input').val()
    $.get(`/teams/${input}`, function(data){
        display.renderData(data)
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
        img: $div.find('img').attr('src')
    }
    $.post(`/roster`, player, (data) => {})
})

$('#dream-team').on('click', function () {
    $.get(`/dreamTeam`, (data) => {
        display.renderData(data)
    })
})

