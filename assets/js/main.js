function localWeatherHtml(data,isitSearch) {
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
    if(isitSearch){
    $(".local-weather").empty();
    $(".local-weather").append(html);
    }
    else{$(".local-weather").append(html);};
}

function next3Days(data,isitSearch) {
    var d = new Date().getDay() +1;
    
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    var dayIndex=7;
    if(isitSearch){
        $(".nextdays").empty();}
    for (let i = 0; i < 3; i++) {
        
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
        var html='<div class="col-md-4 col-4 pb-5">';
        html+=templogo;
        html+='<p class=" font-weight-bold text-body ">'+days[d]+'</p>';
        html+='<div class="col-md-12 text-body">'+data.list[dayIndex].main.temp_min+'°</div>';
        html+='<div class="col-md-12 text-body">'+data.list[dayIndex].main.temp_max+'°</div>';
        html+='</div>';
        
            $(".nextdays").append(html);
       

     dayIndex+=8;   
     d++;
     if(d>6){d=0};
    }




}


function nearbyHtml(string) {
    $.getJSON("https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.openweathermap.org%2Fdata%2F2.5%2Fweather%3Fq%3D"+string+"%26APPID%3D5aa0b464d8b65bb638a100b878c0fe9f%26units%3Dmetric",function (data) {
        var html='<div class="hover-color clearfix marginClear paddingClear" onclick=ventusky("'+string+'")>';
        html+='<h6 class="text-uppercase float-left font-weight-bold " style="width: 50%"> '+data.name+'</h6>';
        html+='<h6 class="float-right " style="width:50%"> '+data.main.temp+'°C</h6>';
        html+='</div>';
        $("#Nearby").append(html);
    
    })
    
}



function ventusky(string) {

    $.getJSON("https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.openweathermap.org%2Fdata%2F2.5%2Fweather%3Fq%3D"+string+"%26APPID%3D5aa0b464d8b65bb638a100b878c0fe9f%26units%3Dmetric",function (data) {


    $("#ventusky").html('<iframe style="width:100% ; height:100%"src="https://www.ventusky.com/?p='+data.coord.lat+';'+data.coord.lon+';5&l=temperature-2m"></iframe>');

}
)}


function weatherData(string) {
    $.getJSON("https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.openweathermap.org%2Fdata%2F2.5%2Fforecast%3Fq%3D"+string+"%26APPID%3D5aa0b464d8b65bb638a100b878c0fe9f%26units%3Dmetric",function (data) {
        localWeatherHtml(data, true);
        next3Days(data, true);
        }); 
}


$.getJSON("https://jsonp.afeld.me/?url=http%3A%2F%2Fapi.openweathermap.org%2Fdata%2F2.5%2Fforecast%3Fq%3Dtunis%26APPID%3D5aa0b464d8b65bb638a100b878c0fe9f%26units%3Dmetric",function (data) {
localWeatherHtml(data,false);
next3Days(data,false);
});

nearbyHtml("washington");
nearbyHtml("sydney");
nearbyHtml("Paris");
nearbyHtml("osaka");
ventusky("tunis");




