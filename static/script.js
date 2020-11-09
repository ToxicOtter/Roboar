/*function ajax(){
    $.ajax ({
        url: '/_get_data/',
        type: 'POST',
        success: function(resp){
            $('div#response').append(resp.data);
        }
    })
}*/


/* ----------- atualize div ------------------- */
$(function() {
    setTime();
    function setTime() {
       var date = new Date().getTime();
       /*var string = "Timestamp: "+date;*/
       var string = Math.floor(Math.random() * 10);
       var otherstring = Math.floor(Math.random() * 10);
       setTimeout(setTime, 3000);
       $('#data1').html(string);
       $('#data2').html(otherstring);
    }
  });