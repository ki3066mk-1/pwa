var weather = {
  API_KEY : 'adb4ca1e108fb90c8012e985cb3e660a',
  CITY : 'Osaka'
}
weather.onchange = function (city) {
  weather.CITY = city;
  weather.getData();
}
/**
 * 天気予報データを取得します。
 */
weather.getData = function () {
  weather.URL = 'https://api.openweathermap.org/data/2.5/weather?q='
                    + weather.CITY
                    + ',jp&units=metric&APPID='
                    + weather.API_KEY;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        var response = JSON.parse(request.response);
        weather.createHtml(response);
      } else {
        console.log('error')
      }
    }
  };
  request.open('GET', weather.URL);
  request.send();
}
/**
 * 天気を表示する HTML を作成します。
 */
weather.createHtml = function (data) {
  var s = '<p>1. 現在の天気（'+data.name+'）</p>';
  s += '<ul><li>';
  s += get_date_string(data.dt)+'<br>';
  s += '気温：'+round_val(data.main.temp)+'℃<br>';
  s += '風向：'+get_deg_string(data.wind.deg)+'<br>';
  s += '風速：'+round_val(data.wind.speed)+'m/s<br>';
  for (var i in data.weather) {
    var icon = data.weather[i].icon;
    s += '天気：'+get_weather_string(icon)+'<br>';
    s += '<img src="https://openweathermap.org/img/w/'+icon+'.png"><br>';
    break;
  }
  s += '</li></ul>';
  document.getElementById('weather_disp').innerHTML = s;
};
var get_deg_string = function(deg) {
  var r = '北';
  if (deg>=11.25) r = '北北東';
  if (deg>=33.75) r = '北東';
  if (deg>=56.25) r = '東北東';
  if (deg>=78.75) r = '東';
  if (deg>=101.25) r = '東南東';
  if (deg>=123.75) r = '南東';
  if (deg>=146.25) r = '南南東';
  if (deg>=168.75) r = '南';
  if (deg>=191.25) r = '南南西';
  if (deg>=213.75) r = '南西';
  if (deg>=236.25) r = '西南西';
  if (deg>=258.75) r = '西';
  if (deg>=281.25) r = '西北西';
  if (deg>=303.75) r = '北西';
  if (deg>=326.25) r = '北北西';
  return r+'の風';
};

var get_date_string = function(dt) {
  var date = new Date(dt*1000);
  var week = ['日','月','火','水','木','金','土'];
  var s = date.getFullYear()+'年';
  s += date.getMonth()+1+'月';
  s += date.getDate()+'日';
  s += '（'+week[date.getDay()]+'）';
  return s;
};

var round_val = function(n) {
  return Math.round(n*10)/10;
};

var get_weather_string = function(s) {
  if (/^01/.test(s)) return '晴れ';
  if (/^0[234]/.test(s)) return '曇り';
  if (/^(09|10)/.test(s)) return '雨';
  if (/^13/.test(s)) return '雪';
  if (/^11/.test(s)) return '雷';
  if (/^50/.test(s)) return '霧';
  return '';
};
