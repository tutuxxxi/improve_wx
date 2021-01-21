const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//通过传入的长度返回一个当天确定的唯一序列
const getNums = (length, userid) =>{


  //根据用户的id获取乘数
  const userIds = userid.split("");
  var userNum = 0;
  var count = 0;
  for(var i=0; i<userIds.length && count != 5; i++){
    if(!isNaN(userIds[i])){
      userNum = userNum * 10 + 1 * userIds[i];
      count++;
    }
  }

  //获取随机数字
  const date = new Date();
  const day = date.getDate() * date.getFullYear() * (date.getMonth() + 1) * userNum;
  const nums = day.toString().split("");

  //去重
  for(var i=0; i<nums.length; i++){
    for(var j=i+1; j<nums.length; j++){
      if(nums[i]==nums[j]){
        nums.splice(j,1);
        j--;
      }
    }
  }

  //转换
  for(var i=0; i<nums.length; i++){
    nums[i] = 1 * nums[i];
  }

  //填充
  if(nums.length < length){
    const exist = new Array(10);
    for(var i = 0; i < nums.length; i++){
      exist[nums[i]] = true;
    }

    var index = 0;
    while(nums.length < length){
      if(exist[index] != true){
        nums.push(index);
      }
      index++;
    }
  }

  return nums;
}

module.exports = {
  formatTime: formatTime,
  getNums: getNums
}