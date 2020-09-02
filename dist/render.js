class Render{
    constructor(){
    }
    
    renderData(data) {
        $('#players').empty()
        if (data[0] != undefined) {
            const source = $('#players-template').html()
            const template = Handlebars.compile(source)
            const newHTML = template({ data })
            $('#players').append(newHTML)
        } else {
            const newHTML = "<div class='error'> Roster is unavailabe</div>"
            $('#players').append(newHTML)
        }
    }

    renderStats(data, img) {
        if (data) {
            const source = $('#stats-template').html()
            const template = Handlebars.compile(source)
            const newHTML = template(data)
            $(img).closest('div').append(newHTML)
        } else {
            const newHTML = "<div class='stats' style='color:red'> No stats available</div>"
            $(img).closest('div').append(newHTML)
        }
    }

}