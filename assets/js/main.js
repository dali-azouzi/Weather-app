function localWeatherHtml(data) {
    var html='<p> Your local weather</p>';
    html+='<h4 class="font-weight-bold text-uppercase"> '+data.city.name+'</h4>';
    html+='<h1 id="Temp-local">'+data.list[0].main.temp+'°</h1>';
    var templogo="";
    var main=data.list[0].weather[0].main;

   
    

    switch (main) {
        case "Clear":
        templogo='<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
            
            break;
    
        case "Clouds" :
            templogo= '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>'; 
        break;

        case "Rain" :
            templogo='<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
        break;

        case "Drizzle" :
            templogo='<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
        break;

        case "Snow" :
            templogo='<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';
        break;
        default:
        templogo='<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';
        
    }
    html+=templogo;
    html+='<h4>Sunny day</h4>';
    $(".local-weather").append(html);
   
}

function next3Days(data) {
    var d = new Date().getDay() +1;
    
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var templogo="";
    var dayIndex=7;
    for (var i = 0; i < 3; i++) {
        
        switch (data.list[dayIndex].weather[0].main) {
            case ("Clear"):
            templogo='<div class="icon sunny" style="font-size: .5em"><div class="sun"><div class="rays"></div></div></div>';
                
                break;
        
            case ("Clouds") :
                templogo= '<div class="icon cloudy" style="font-size: .5em"><div class="cloud"></div><div class="cloud"></div></div>'; 
            break;
    
            case ("Rain") :
                templogo='<div class="icon rainy" style="font-size: .5em"><div class="cloud"></div><div class="rain"></div></div>';
            break;
    
            case ("Drizzle") :
                templogo='<div class="icon rainy" style="font-size: .5em"><div class="cloud"></div><div class="rain"></div></div>';
            break;
    
            case ("Snow") :
                templogo='<div class="icon flurries" style="font-size: .5em"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';
            break;
            default:
            templogo='<div class="icon sun-shower" style="font-size: .5em"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';
            break;
        }
        var html='<div class="col-md-4 ">';
        html+=templogo;
        html+='<p class=" font-weight-bold text-body ">'+days[d]+'</p>';
        html+='<div class="col-md-12 text-body">'+data.list[dayIndex].main.temp_min+'°</div>';
        html+='<div class="col-md-12 text-body">'+data.list[dayIndex].main.temp_max+'°</div>';
        html+='</div>';
        $(".nextdays").append(html);
     dayIndex+=8;   
     d++;
     if(d>6){d=0;}
    }




}


function nearbyHtml(string) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+string+"&APPID=5aa0b464d8b65bb638a100b878c0fe9f&units=metric",function (data) {
        var html='<div class="hover-color" onclick=ventusky("'+string+'")>';
        html+='<h6 class="text-uppercase float-left font-weight-bold " style="width: 50%"> '+data.name+'</h6>';
        html+='<h6 class="float-right " style="width:50%"> '+data.main.temp+'°C</h6>';
        html+='</div>';
        $("#Nearby").append(html);
    
    });}



function ventusky(string) {

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+string+"&APPID=5aa0b464d8b65bb638a100b878c0fe9f&units=metric",function (data) {


    $("#ventusky").html('<iframe style="width:100% ; height:100%"src="https://www.ventusky.com/?p='+data.coord.lat+';'+data.coord.lon+';5&l=temperature-2m"></iframe>');

}
             );}


$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=tunis,tn&APPID=5aa0b464d8b65bb638a100b878c0fe9f&units=metric",function (data) {
localWeatherHtml(data);
next3Days(data);

});
nearbyHtml("new york");
nearbyHtml("germany");
nearbyHtml("Paris");
nearbyHtml("osaka");
ventusky("tunis");


