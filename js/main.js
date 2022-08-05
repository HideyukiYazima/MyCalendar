'use strict';

console.clear();

{
  const year = 2020;
  const month = 4; // 5月は4で表現することに注意

  //前月分の日付を取得するための配列
  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      // 30はdそのもの
      // 29, 30はd - 1
      // 28, 29, 30はd -2
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true, // 先月分の日付は薄くしたいのでtrue
      });
    }

    return dates;
  }
  //


  function getCalendarBody() {
    const dates = []; // javascriptではdate: 日付、day: 曜日となっていることに注意
    const lastDate = new Date(year, month + 1, 0).getDate(); // 末日は翌月1日の１日前という配列を使う

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    return dates;
  }
  
  // 翌月分の日付を取得するための配列
  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay(); // 末日はその翌月の0日目という設定でOK。その上で週の何日目かはgetDayで取得する。

    for (let i = 1; i < 7 - lastDay; i++) { // 1から7に満たないまでのループ + 曜日感覚も意識
      dates.push({
        date: i,
        isToday: false, // 翌月には入ってこないのでfalse
        isDisabled: true, // 薄くするためにtrue
      });
    }

    return dates;
  }
  //

  // 作成したカレンダーの日付を統合し、描画する配列
  function createCalendar() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    console.log(dates);
  }

  createCalendar();

  // getCalendarHead();
  // getCalendarBody();
  // getCalendarTail();
}

