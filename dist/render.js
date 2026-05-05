class Render{
    constructor(){
    }
    
    renderData(data) {
        if (data[0] != undefined) {
            const source = $('#players-template').html()
            const template = Handlebars.compile(source)
            const newHTML = template({ data })
            $('#players').empty().append(newHTML)
        } else {
            const newHTML = "<div class='error'> Roster is unavailabe</div>"
            $('#players').empty().append(newHTML)
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

    renderInput(){
        $('#players').append('<div><input class="teamName" placeholder="Enter team name"><button class="create">Create team</button></div>')
    }

    renderSaved(saved){
        if(saved[0] != undefined){
        $('#saved-bar').empty()
        const source = $('#saved-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template(saved)
        $('#saved-bar').append(newHTML)
        }else{
            $('#saved-bar').append(`
            <select name="saved" id="saved-users">
            <option value="noTeam">No team saved yet</option>
            </select>`)
        }
    }

}