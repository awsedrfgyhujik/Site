var canvas, context, hw, aw, ah, map, ow, col, url;
window.charmap;
window.numToGen;
function plot(y, x) //Treat grid as a 5x5
{
    x = Math.floor(x * s);
    y = Math.floor(y * s);
    context.moveTo(x, y);
    context.beginPath();
    context.rect(x, y, s, s);
    context.fillStyle = pickColor();
    context.fill();
}
function erase(){
  context.clearRect(0,0,aw, ah);
}
function updateListen(){
      ow = hw;
      hw = hex_md5($('#gen').val());
      if(ow==hw)
        return;
      massPlot();
}
function pickColor(){
  var col = "#00ff00";
  return col;
}
function genRandom(){
    $('#gen').val(Math.random() * 69);
    console.log("Last value: " + $('#gen').val());
    updateListen();
}
function massPlot(){
  erase();
  var dup = 0;
  var max = Math.ceil(map[0].length / 2.0);
  var num = 0;
  for(var j = 0; j < max; j++)
  {
    for(var i = 0; i < map.length; i++)
    {
      num = i + map.length * j;
      if(parseInt("0x" + hw.substring(num * 2, num * 2+2), 16) % 2 == 1)
      {
        dup = 1 + (max - j);
        plot(i, j);
        plot(i, dup);
      }
    }
  }
}
$(function(){
    aw = ah = 480;
    s = aw / 5;
    map = new Array(5);
    for(var i = 0; i < map.length; i++){
      map[i] = new Array(5)
      for(var j = 0; j < map[0].length; j++)
        map[i][j] = 0;
    }
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    genRandom();
      hw = hex_md5($('#gen').val());
      ow = hw = "";    
      updateListen();
    $('#gen').change(function(){updateListen()}).click(function(){updateListen()}).keyup(function(){updateListen()});    
});
