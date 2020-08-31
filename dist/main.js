$('#team-button').on('click', function () {
    const input = $('#team-input').val()
    $.get(`/teams/${input}`, function(data){
        const display = new Render(data)
        display.renderData()
    })
})
