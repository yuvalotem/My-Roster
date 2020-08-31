class Render{
    constructor(data){
        this.data = data
    }
    
    renderData(){
        $('#players').empty()
        const source = $('#players-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(this.data)
        $('#players').append(newHTML)
    }
}