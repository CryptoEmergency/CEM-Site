import {
  jsx,
  jsxFrag,
  initReload,
  load,
  setStorage,
  getStorage,
  CEM,
} from "@betarost/cemserver/cem.js"; // Стандартные библиотеки
const { images, svg, fn } = CEM; // подключение картинок и функций

let staticRounds = {
  win: 0,
  lose: 0,
  draw: 0,
}; // Переменные со значением побед, пор, ничьи

let elError = null; // Ссылка на элемент (Окно сообщения)
let textError = ""; // Переменная с текстом в окне сообщения

let prostoArr = [];
for (let i = 0; i < 100; i++) {
  // выведет 0, затем 1, затем 2
  prostoArr.push(i % 10);
}

// Значения на игровом поле (-1 - поле не занято, 1 - поставили крестик, 0 - поставили нолик)
let arrGame = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
];

let whoWay;
let dropNow;
let onStart = false;
let MyShips = {
  s4: 1,
  s3: 2,
  s2: 3,
  s1: 4,
};

const arrEl = [];

const checkAllowPole = (start, row, whatShip) => {
  let ret = true;
  for (let i = start; i < Number(start) + whatShip; i++) {
    if (arrGame[row][i] != -1) {
      ret = false;
    }
  }
  return ret;
};
function RestPole() {
  arrGame = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  MyShips = {
    s4: 1,
    s3: 2,
    s2: 3,
    s1: 4,
  };
  initReload();
}
function StartGame() {
  if (
    MyShips.s4 == 0 &&
    MyShips.s3 == 0 &&
    MyShips.s2 == 0 &&
    MyShips.s1 == 0
  ) {
    onStart = true;
    initReload();
  } else {
    alert("Расставьте все");
  }
}

function generationShip(index, item, $el) {}

const addListner = function (item, index, $el) {
  if (arrEl[index]) {
    return;
  }
  arrEl[index] = $el;
  $el.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  $el.addEventListener("drop", function (e) {
    // if (!oneAction) {
    console.log("=ba5b23=", Math.floor(index / 10), item, dropNow);

    // generationShip()
    let whatShip = Number(dropNow[1]);
    if (Number(item) + whatShip > 10) {
      alert("низя");
      return;
    }

    if (!checkAllowPole(item, Math.floor(index / 10), whatShip)) {
      alert("тоже низя");
      return;
    }

    for (let i = item; i < Number(item) + whatShip; i++) {
      arrGame[Math.floor(index / 10)][i] = whatShip;
      let pos = "mid";
      if (i == item) {
        pos = "first";
      } else if (i + 1 == Number(item) + whatShip) {
        pos = "last";
      }
      ogranichenRyadom(Math.floor(index / 10), i, whatShip, pos);
    }
    // }
    // oneAction = true
    MyShips[dropNow]--;
    console.log("=83d9f4=", MyShips);
    initReload();
  });
};

const addNull = function (row, col) {
  if (row > 9 || row < 0 || col > 9 || col < 0) {
    return;
  }
  arrGame[row][col] = 0;
  return;
};
const addNull_1 = function (rown, colmn) {
  if (rown > 9 || rown < 0 || colmn > 9 || colmn < 0) {
    return;
  }
  arrGame[rown][colmn] = 0;
  return;
};

const ogranichenRyadom = function (row, col, num, position) {
  if (num == 1) {
    addNull(row - 1, col - 1);
    addNull(row - 1, col);
    addNull(row - 1, col + 1);

    addNull(row + 1, col - 1);
    addNull(row + 1, col);
    addNull(row + 1, col + 1);

    addNull(row, col + 1);
    addNull(row, col - 1);
  } else {
    addNull(row - 1, col - 1);
    addNull(row - 1, col);
    addNull(row - 1, col + 1);

    addNull(row + 1, col - 1);
    addNull(row + 1, col);
    addNull(row + 1, col + 1);
    if (position == "first") {
      addNull(row, col - 1);
    } else if (position == "last") {
      addNull(row, col + 1);
    }
  }
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function autoWayFill(item, index, whatShip) {
  RestPole();

  let r3 = getRandomInt(99);
  let r3_2 = getRandomInt(99);
  let rown_1 = Math.round(r3 / 10) - 1;
  let rown_1_2 = Math.round(r3_2 / 10) - 1;  
  let column_1 = r3 % 10;
  let column_1_2 = r3_2 % 10;  
  if (r3 < 10 || r3_2 < 10) {
    rown_1 = 0;
    rown_1_2 = 0;   
  }

  let vdh = getRandomInt(2);
  console.log("=60c6b8=", vdh, r3);

  let rr = getRandomInt(99);
  let rown = Math.round(rr / 10) - 1;
  let column = rr % 10;
  if (rr < 10) {
    rown = 0;
  }

  console.log("=637d3b=", rr, rown, column);
  if (Number(item) + whatShip > 10) {
    alert("низя");
    return;
  }

  if (!checkAllowPole(item, Math.floor(index / 10), whatShip)) {
    alert("тоже низя");
    return;
  }

  arrGame[rown][column] = 4;
  //if () {}
  if (vdh == 0) {
    if (column <= 6) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown][column + 1] = 4;
        arrGame[rown][column + 2] = 4;
        arrGame[rown][column + 3] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown - 1, column);
        addNull_1(rown - 1, column + 1);

        addNull_1(rown - 1, column + 2);
        addNull_1(rown - 1, column + 3);
        addNull_1(rown - 1, column + 4);

        addNull_1(rown + 1, column - 1);
        addNull_1(rown + 1, column);
        addNull_1(rown + 1, column + 1);

        addNull_1(rown + 1, column + 2);
        addNull_1(rown + 1, column + 3);
        addNull_1(rown + 1, column + 4);

        addNull_1(rown, column + 4);
        addNull_1(rown, column - 1);
      }
    } else if (column == 7) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown][column - 1] = 4;
        arrGame[rown][column + 1] = 4;
        arrGame[rown][column + 2] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown - 1, column);
        addNull_1(rown - 1, column + 1);
        addNull_1(rown - 1, column - 2);

        addNull_1(rown - 1, column + 2);
        addNull_1(rown - 1, column + 3);

        addNull_1(rown + 1, column - 1);
        addNull_1(rown + 1, column);
        addNull_1(rown + 1, column + 1);
        addNull_1(rown + 1, column - 2);

        addNull_1(rown + 1, column + 2);
        addNull_1(rown + 1, column + 3);

        addNull_1(rown, column + 3);
        addNull_1(rown, column - 2);
      }
    } else if (column == 8) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown][column - 2] = 4;
        arrGame[rown][column - 1] = 4;
        arrGame[rown][column + 1] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown - 1, column);
        addNull_1(rown - 1, column + 1);
        addNull_1(rown - 1, column - 2);

        addNull_1(rown - 1, column + 2);
        addNull_1(rown - 1, column - 3);

        addNull_1(rown + 1, column - 1);
        addNull_1(rown + 1, column);
        addNull_1(rown + 1, column + 1);
        addNull_1(rown + 1, column - 2);

        addNull_1(rown + 1, column + 2);
        addNull_1(rown + 1, column - 3);

        addNull_1(rown, column + 2);
        addNull_1(rown, column - 3);
      }
    } else if (column == 9) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown][column - 1] = 4;
        arrGame[rown][column - 2] = 4;
        arrGame[rown][column - 3] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown - 1, column);
        addNull_1(rown - 1, column - 2);
        addNull_1(rown - 1, column - 3);

        addNull_1(rown - 1, column + 2);
        addNull_1(rown - 1, column - 4);

        addNull_1(rown + 1, column - 1);
        addNull_1(rown + 1, column);
        addNull_1(rown + 1, column - 2);
        addNull_1(rown + 1, column - 3);

        addNull_1(rown + 1, column + 2);
        addNull_1(rown + 1, column - 4);

        addNull_1(rown, column + 2);
        addNull_1(rown, column - 4);
      }
    }

    MyShips.s4 = 0;
    initReload();
  } else if (vdh == 1) {
    if (rown <= 6) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown + 1][column] = 4;
        arrGame[rown + 2][column] = 4;
        arrGame[rown + 3][column] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown, column - 1);
        addNull_1(rown + 1, column - 1);

        addNull_1(rown + 2, column - 1);
        addNull_1(rown + 3, column - 1);
        addNull_1(rown + 4, column - 1);

        addNull_1(rown - 1, column + 1);
        addNull_1(rown, column + 1);
        addNull_1(rown + 1, column + 1);

        addNull_1(rown + 2, column + 1);
        addNull_1(rown + 3, column + 1);
        addNull_1(rown + 4, column + 1);

        addNull_1(rown + 4, column);
        addNull_1(rown - 1, column);
      }
    } else if (rown == 7) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown - 1][column] = 4;
        arrGame[rown + 1][column] = 4;
        arrGame[rown + 2][column] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown, column - 1);
        addNull_1(rown + 1, column - 1);
        addNull_1(rown - 2, column - 1);

        addNull_1(rown + 2, column - 1);
        addNull_1(rown + 3, column - 1);

        addNull_1(rown - 1, column + 1);
        addNull_1(rown, column + 1);
        addNull_1(rown + 1, column + 1);
        addNull_1(rown - 2, column + 1);

        addNull_1(rown + 2, column + 1);
        addNull_1(rown + 3, column + 1);

        addNull_1(rown + 3, column);
        addNull_1(rown - 2, column);
      }
    } else if (rown == 8) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown + 1][column] = 4;
        arrGame[rown - 1][column] = 4;
        arrGame[rown - 2][column] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown, column - 1);
        addNull_1(rown + 1, column - 1);
        addNull_1(rown - 2, column - 1);

        addNull_1(rown + 2, column - 1);
        addNull_1(rown - 3, column - 1);

        addNull_1(rown - 1, column + 1);
        addNull_1(rown, column + 1);
        addNull_1(rown + 1, column + 1);
        addNull_1(rown - 2, column + 1);

        addNull_1(rown + 2, column + 1);
        addNull_1(rown - 3, column + 1);

        addNull_1(rown + 2, column);
        addNull_1(rown - 3, column);
      }
    } else if (rown == 9) {
      if ((arrGame[rown][column] = 4)) {
        arrGame[rown - 1][column] = 4;
        arrGame[rown - 2][column] = 4;
        arrGame[rown - 3][column] = 4;

        addNull_1(rown - 1, column - 1);
        addNull_1(rown, column - 1);
        addNull_1(rown - 2, column - 1);
        addNull_1(rown - 3, column - 1);

        addNull_1(rown + 2, column - 1);
        addNull_1(rown - 4, column - 1);

        addNull_1(rown - 1, column + 1);
        addNull_1(rown, column + 1);
        addNull_1(rown - 2, column + 1);
        addNull_1(rown - 3, column + 1);

        addNull_1(rown + 2, column + 1);
        addNull_1(rown - 4, column + 1);

        addNull_1(rown + 2, column);
        addNull_1(rown - 4, column);
      }
    }
    MyShips.s4 = 0;
    initReload();
  } else {  }
          //дОБАВЛЕНИЕ 3 ПАЛУБНОГО
  
  let vdh_2_1 = getRandomInt(2);
  let vdh_2_2 = getRandomInt(2);

  if (vdh_2_1 == 0)
  {
    if (column_1 <= 7)
    {
          arrGame[rown_1][column_1] = 3;
          if (arrGame[rown_1][column_1] == 3) {
            arrGame[rown_1][column_1 + 1] = 3;
            arrGame[rown_1][column_1 + 2] = 3;
          }
    }
    if (column_1 == 8)
    {
          arrGame[rown_1][column_1] = 3;
          if (arrGame[rown_1][column_1] == 3) {
            arrGame[rown_1][column_1 + 1] = 3;
            arrGame[rown_1][column_1 - 1] = 3;
          }
    }
    if (column_1 == 9)
    {
          arrGame[rown_1][column_1] = 3;
          if (arrGame[rown_1][column_1] == 3) {
            arrGame[rown_1][column_1 - 1] = 3;
            arrGame[rown_1][column_1 - 2] = 3;
          }
    }
    MyShips.s3 = 1
  }
  else if (vdh_2_1 == 1)
  {
    if (rown_1 <= 7)
    {
        arrGame[rown_1][column_1] = 3;
        if (arrGame[rown_1][column_1] == 3) {
          arrGame[rown_1 + 1][column_1] = 3;
          arrGame[rown_1 + 2][column_1] = 3;
        }
    }
    if (rown_1 == 8)
    {
        arrGame[rown_1][column_1] = 3;
        if (arrGame[rown_1][column_1] == 3) {
          arrGame[rown_1 + 1][column_1] = 3;
          arrGame[rown_1 -1][column_1] = 3;
        }
    }
    if (rown_1 == 9){
        arrGame[rown_1][column_1] = 3;
        if (arrGame[rown_1][column_1] == 3) {
          arrGame[rown_1 - 1][column_1] = 3;
          arrGame[rown_1 - 2][column_1] = 3;
        }
    }
    MyShips.s3 = 1
  }
  if (vdh_2_2 == 0)
  {
    if (column_1_2 <= 7)
    {
      arrGame[rown_1_2][column_1_2] = 3;
      if (arrGame[rown_1_2][column_1_2] == 3) {
        arrGame[rown_1_2][column_1_2 + 1] = 3;
        arrGame[rown_1_2][column_1_2 + 2] = 3;
      }
    }
    if (column_1_2 == 8)
    {
      arrGame[rown_1_2][column_1_2] = 3;
      if (arrGame[rown_1_2][column_1_2] == 3) {
        arrGame[rown_1_2][column_1_2 + 1] = 3;
        arrGame[rown_1_2][column_1_2 - 1] = 3;
      }
    }
    if (column_1_2 == 9)
    {
      arrGame[rown_1_2][column_1_2] = 3;
      if (arrGame[rown_1_2][column_1_2] == 3) {
        arrGame[rown_1_2][column_1_2 - 1] = 3;
        arrGame[rown_1_2][column_1_2 - 2] = 3;
      }
    }
    MyShips.s3 = 0
  }
  else if (vdh_2_2 == 1)
  {
    if (rown_1_2 <= 7)
    {
      arrGame[rown_1_2][column_1_2] = 3;
      if (arrGame[rown_1_2][column_1_2] == 3) {
        arrGame[rown_1_2 + 1][column_1_2] = 3;
        arrGame[rown_1_2 + 2][column_1_2] = 3;
      }
    }
    if (rown_1_2 == 8)
    {
      arrGame[rown_1_2][column_1_2] = 3;
      if (arrGame[rown_1_2][column_1_2] == 3) {
        arrGame[rown_1_2 + 1][column_1_2] = 3;
        arrGame[rown_1_2 - 1][column_1_2] = 3;
      }
    }
    if (rown_1_2 == 9)
    {
      arrGame[rown_1_2][column_1_2] = 3;
      if (arrGame[rown_1_2][column_1_2] == 3) {
        arrGame[rown_1_2 - 1][column_1_2] = 3;
        arrGame[rown_1_2 - 2][column_1_2] = 3;
      }    
    }
    MyShips.s3 = 0
  }
  
  // if (arrGame[rown][column] == 0 || arrGame[rown][column] == 4) {
  //   //autoWayFill()
  // } else {
    // arrGame[rown_1_2][column_1_2] = 3;
    // if (arrGame[rown_1_2][column_1_2] == 3) {
    //   arrGame[rown_1_2][column_1_2 + 1] = 3;
    //   arrGame[rown_1_2][column_1_2 + 2] = 3;
    // }
  // }



  //   if (arrGame[rown_1][column_1] == 0 || arrGame[rown_1][column_1] == 4)
  //   {
  //     if (column_1 >= 5 && countSH == 1 )
  //     {
  //   arrGame[rown_1][column_1 - 3] = 3
  //     if (arrGame[rown_1][column_1 - 3] == 3)
  //     {
  //       arrGame[rown_1][column_1 - 2] = 3
  //       arrGame[rown_1][column_1 - 1] = 3
  //       countSH = 0
  //     }
  //   }
  //   else if (column_1 <= 4 && countSH == 1)
  //   arrGame[rown_1][column_1 + 3] = 3
  //     if (arrGame[rown_1][column_1 + 3] == 3)
  //       {
  //         arrGame[rown_1][column_1 + 2] = 3
  //         arrGame[rown_1][column_1 + 4] = 3
  //         countSH = 0
  //       }
  //   else if(rown_1 >= 5 && countSH == 1)
  //   {
  //     arrGame[rown_1 - 3][column_1] = 3
  //     if (arrGame[rown_1 - 3][column_1] == 3)
  //       {
  //         arrGame[rown_1 - 2][column_1] = 3
  //         arrGame[rown_1 - 1][column_1] = 3
  //         countSH = 0
  //       }
  //   }
  //   else if(rown_1 <= 4 && countSH == 1)
  //   {
  //     arrGame[rown_1 + 3][column_1] = 3
  //     if (arrGame[rown_1 + 3][column_1] == 3)
  //       {
  //         arrGame[rown_1 + 2][column_1] = 3
  //         arrGame[rown_1 + 4][column_1] = 3
  //         countSH = 0
  //       }
  //   }
  // }
  // else if (countSH == 1) {
  //   arrGame[rown_1][column_1 ] = 3
  //   if (arrGame[rown_1][column_1] == 3)
  //   {
  //     arrGame[rown_1][column_1 + 1] = 3
  //     arrGame[rown_1][column_1 + 2] = 3
  //   }
  // }
  //}
  initReload();
}
const showShip = (key) => {
  if (MyShips[key] < 1) {
    return <div></div>;
  } else {
    let num = key[1];
    let squer = [];
    for (let i = 1; i <= num; i++) {
      squer.push(<div class="block_size_sea_war"></div>);
    }
    return (
      <table
        id={`ship${num}`}
        class={`ship-${num}`}
        draggable="true"
        Element={($el) => {
          $el.addEventListener("dragstart", () => {
            dropNow = key;
          });
        }}
      >
        {squer}
      </table>
    );
  }
};

const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      console.log("=8dbbc3=", arrGame);
      return (
        <div class="c-main__body">
          <div class="conteiner-game">
            <div class="start__pr">Практическая работа в Crypto Emergency</div>
            <div class="start__game">Морской бой</div>
            <div class="stats_main">
              <div class="stats_1">
                Статистика:
                <div class="stats_2">
                  <div>пор:</div>
                  <div>поб:</div>
                  <div>ничья: </div>
                </div>
                <div></div>
                <div class="stats_view_pr">
                  <div class="stats_view"> {staticRounds.lose} </div>
                  <div class="stats_view"> {staticRounds.win} </div>
                  <div class="stats_view"> {staticRounds.draw} </div>
                </div>
              </div>
              {!onStart ? (
                <div style="display:flex;justify-content:space-around;">
                  <button
                    class="btn_change_way"
                    onclick={() => {
                      RestPole();
                    }}
                  >
                    {" "}
                    Сбросить расстановку{" "}
                  </button>
                  <button
                    class="btn_change_way"
                    onclick={() => {
                      autoWayFill();
                    }}
                  >
                    Случайная расстановка
                  </button>
                </div>
              ) : null}
            </div>

            <div class="one_game_sea_war ">
              <div slyler="dislay:grid;grid-template-columns:25% 25% 25% 25%;">
                {showShip("s4")}
                {showShip("s3")}
                {showShip("s2")}
                {showShip("s1")}
              </div>
              <table id="field_sea_war">
                {prostoArr.map((item, index) => {
                  return (
                    <div
                      class={[
                        "block_size_sea_war",
                        arrGame[Math.floor(index / 10)][item] >= 1
                          ? "colorbackall"
                          : !onStart &&
                            arrGame[Math.floor(index / 10)][item] == 0
                          ? "colornull"
                          : null,
                      ]}
                      Element={($el) => {
                        addListner(item, index, $el);
                      }}
                    >
                      {onStart ? null : arrGame[Math.floor(index / 10)][item]}
                    </div>
                  );
                })}
              </table>
              {onStart ? (
                <table id="field_sea_war">
                  {prostoArr.map((item, index) => {
                    return <div class={["block_size_sea_war"]}></div>;
                  })}
                </table>
              ) : null}
            </div>
            <div class="wi_lo">
              {/* <div>Выйграл-{ }</div>
                            <div>Проиграл-{ }</div> */}
            </div>
            <div class="restart_game">
              <button
                class="btn_reset_gm"
                onclick={() => {
                  StartGame();
                }}
              >
                Начать ;)
              </button>
            </div>
          </div>
          <div
            Element={($el) => {
              elError = $el;
            }}
            class="c-modal c-modal--open"
            id="modalsetin"
            style="display:none;"
          >
            <section class="c-modal__dialog">{textError}</section>
          </div>
        </div>
      );
    },
  });
};

export default start;
