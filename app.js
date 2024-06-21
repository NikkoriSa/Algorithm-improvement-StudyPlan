'use strict';
// import mojul.
const fs = require('node:fs');
const readline = require('node:readline');

//file.
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs });//stream権限.

//key = 都道府県 value:集計データのオブジェクト
const prefectureDataMap = new Map();


rl.on('line', lineString => {
  //console.log(lineString);
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    if(year === 2016 || year === 2021){
        /*//ah sokai

        console.log(year);
        console.log(prefecture);
        console.log(popu);
        */
       let value = null;
    if (prefectureDataMap.has(prefecture)) {
      value = prefectureDataMap.get(prefecture);
    } else {
      value = {
        before: 0,
        after: 0,
        change: null
      };
    }
    if (year === 2016) {
      value.before = popu;
    }
    if (year === 2021) {
      value.after = popu;
    }
    prefectureDataMap.set(prefecture, value);
    }
    
    
});


rl.on('close',()=>{
    for(const[key,value] of prefectureDataMap){
        value.change = value.after/value.before;
    }

    const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
        return pair2[1].change - pair1[1].change;
      });
      console.log(rankingArray);


    //console.log(prefectureDataMap);
});