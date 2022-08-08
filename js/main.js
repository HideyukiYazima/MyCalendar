'use strict';

console.clear();

{
  let year = 2020;
  let month = 4; // 5月は4で表現することに注意

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
  function clearCalendar() {
    const tbody = document.querySelector('tbody'); // クリックするたびにカレンダーが増えるのを回避する配列
  
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title =`${year}/${String(month + 1).padStart(2, '0')}`; // 月の切り替えをタイトル部分に反映させる配列
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7; // 一週間は7日

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0,7)); // 先頭から7個分を抽出する
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        
        td.textContent = date.date; // これで日付が入る
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
    //

    // console.log(dates);
    // console.log(weeks);
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }
  //

  // 月の前後移動機能を実装
  // prev設定
  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) { // 年を跨ぐのでyearから1引いて12月(11)に戻すことも必要
      year--;
      month = 11;
    }

    createCalendar();
    });
  
  // next
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) { // 12月を超えるのは11より大きくなったらと書く
      year++;
      month = 0; // 1月に戻すにはここを0にする
    }

    createCalendar();
    });

  createCalendar();

  // getCalendarHead();
  // getCalendarBody();
  // getCalendarTail();
}

