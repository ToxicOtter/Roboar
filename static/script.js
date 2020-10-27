function ajax(){
    $.ajax ({
        url: '/_get_data/',
        type: 'POST',
        success: function(resp){
            $('div#response').append(resp.data);
        }
    })
}