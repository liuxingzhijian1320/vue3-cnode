export function friendlyFormatTime(stringTime) {
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let week = day * 7;
  let month = day * 30;
  let time1 = new Date().getTime(); //当前的时间戳
  let time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
  let time = time1 - time2;

  let result = null;
  if (time < 0) {
    result = "刚刚";
  } else if (time / month >= 1) {
    result = parseInt(time / month) + "月前";
  } else if (time / week >= 1) {
    result = parseInt(time / week) + "周前";
  } else if (time / day >= 1) {
    result = parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
    result = parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
    result = parseInt(time / minute) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}

export function pad(num, n) {
  var i = (num + "").length;
  while (i++ < n) num = "0" + num;
  return num;
}

// 日期
export function formatDate(time, type = "") {
  let date = new Date(time);

  let year = date.getFullYear(),
    month = pad(pad(date.getMonth() + 1), 2), // 月份是从0开始的
    day = pad(date.getDate(), 2),
    hour = pad(date.getHours(), 2),
    min = pad(date.getMinutes(), 2),
    sec = pad(date.getSeconds(), 2);

  if (type == "YYYY/MM/DD hh:mm:ss") {
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`;
  }

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

// 默认数据
export function defaultSetNavsFuc(type) {
  const navs = [
    {
      title: "全部",
      type: "all"
    },
    {
      title: "精华",
      type: "good"
    },
    {
      title: "问答",
      type: "ask"
    },
    {
      title: "分享",
      type: "share"
    },
    {
      title: "招聘",
      type: "job"
    },
    {
      title: "测试",
      type: "dev"
    }
  ];
  if (!type) {
    return navs;
  } else {
    return navs.find(code => code.type == type) || {};
  }
}
