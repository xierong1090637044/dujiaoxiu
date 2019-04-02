function setStateText (arr){
  var newArr = arr;
  arr.forEach(function(key,value){
    if (key.state =='即将开票'){
      arr[value].state = '预定中';
      arr[value].color = 'jijiang';
    }
    if (key.state == '演出结束') {
      arr[value].state = '已结束';
      arr[value].color = 'jieshu';
    }
    if (key.state == '预售中') {
      arr[value].color = 'yushou';
    }
    if (key.state == '售票中') {
      arr[value].color = 'shoupiao';
    }
    if (key.state == '扫尾票') {
      arr[value].color = 'saopiao';
    }
    if (key.state == '已售罄') {
      arr[value].color = 'shouqin';
    }
  })
  return newArr;
}
function setStatusText(arr) {//衍生品
  var newArr = arr;
  arr.forEach(function (key, value) {
    if (key.state == 1) {
      arr[value].state = '立即购买';
      arr[value].color = 'shoupiao';
    }
    if (key.state == '演出结束') {
      arr[value].state = '已结束';
      arr[value].color = 'jieshu';
    }
    if (key.state == '预售中') {
      arr[value].color = 'yushou';
    }
    if (key.state == '售票中') {
      arr[value].color = 'shoupiao';
    }
    if (key.state == '扫尾票') {
      arr[value].color = 'saopiao';
    }
    if (key.state == '已售罄') {
      arr[value].color = 'shouqin';
    }
  })
  return newArr;
}
module.exports = {
  setState: setStateText,//改变状态文字
  setStatus: setStatusText//改变衍生品的状态
}