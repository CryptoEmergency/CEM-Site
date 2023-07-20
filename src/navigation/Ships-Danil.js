import {
    jsx,
    jsxFrag,
    initReload,
    load,
    setStorage,
    getStorage,
    CEM
} from "@betarost/cemserver/cem.js";    // Стандартные библиотеки
const { images, svg, fn } = CEM // подключение картинок и функций

let prostoArr = []
for (let i = 0; i < 100; i++) { // выведет 0, затем 1, затем 2
    prostoArr.push(i % 10)
}


// Значения на игровом поле (-1 - поле не занято, 1 - поставили крестик, 0 - поставили нолик)
let arrGame = [[-1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, 1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]
let bords = {
    fourbords: [1, 1, 1, 1],
    triplebords: [2, 2, 2],
    doublebords: [3, 3],
    onebords: [4]
}
let MyShips = {
    s4: 1,
    s3: 2,
    s2: 3,
    s1: 4
}
let count = 0  // Сколько раз походили
let startGame = 1 //1-Игра идет, 0 - Игра остановлена
let whoWay = 1 // чей ход (1 - ходит крестик, 0 - ходит нолик)  
let elError = null // Ссылка на элемент (Окно сообщения)
let textError = ""  // Переменная с текстом в окне сообщения
let iplay = 1       //1-крест 0-ноль
let changeFigure = {
    krest: "X", //отображение фигуры за которую играешь 
    null: "O"
}
let staticRounds = {
    win: 0,
    lose: 0,
    draw: 0
}   // Переменные со значением побед, пор, ничьи
let ship;
let ships = [1, 2, 3, 4]
let positionShip, field;
let positionShip_1, positionShip_2, positionShip_3, positionShip_4;

function dtest(ev) {
    console.log('=217ecd=', 123, ev)
    ev.dataTransfer.setData("Test", ev.target.id);
}


function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
}


// var ship = document.getElementById(images['train/result']);
// all.onmousedown = function(e) { 


//     var coords = getCoords(ship);
//     var shiftX = e.pageX - coords.left;
//     var shiftY = e.pageY - coords.top;

//     ship.style.position = 'absolute';
//     document.body.appendChild(ship);
//     moveAt(e);

//     ship.style.zIndex = 1000; // над другими элементами

//     function moveAt(e) {
//       ship.style.left = e.pageX - shiftX + 'px';
//       ship.style.top = e.pageY - shiftY + 'px';
//     }

//     document.onmousemove = function(e) {
//       moveAt(e);
//     };

//     ship.onmouseup = function() {
//       document.onmousemove = null;
//       ship.onmouseup = null;
//     };

//   }

//   ship.ondragstart = function() {
//     return false;
//   };

//   function getCoords(elem) {   // кроме IE8-
//     var box = elem.getBoundingClientRect();
//     return {
//       top: box.top + pageYOffset,
//       left: box.left + pageXOffset
//     };
//     }
const parallelepiped = document.querySelector('#field');
let locationX = 0;
let locationY = 0;

function moveShip(event) {
    return
    let left = event.clientX - locationX;
    let top = event.clientY - locationY;
    if (left < 0) {
        // выходит за границу параллелепипеда слева, останавливаем
        left = 0;
    }
    if (left > parallelepiped.scrollWidth - ship.scrollWidth) {
        // выходит за границу параллелепипеда справа, останавливаем
        left = parallelepiped.scrollWidth - ship.scrollWidth;
    }
    ship.style.left = left + 'px';
    // с top нужно сделать аналогично
    ship.style.top = top + 'px';
}

// ship.addEventListener('mousedown', function(event) {
//   if(ship.style.left){
//      locationX = event.pageX - ship.style.left.replace('px', '');
//   }else{
//      locationX = event.pageX - 20;
//   }
//   if(ship.style.top){
//      locationY = event.pageY - ship.style.top.replace('px', '');
//   }else{
//      locationY = event.pageY - 20;
//   }
//   moveship(event)
//   // добавляем отслеживание события перемещения
//   document.addEventListener('mousemove', moveship);
// });

document.addEventListener('mouseup', function (event) {
    // убираем отслеживание события перемещения
    // document.removeEventListener('mousemove', moveship);
});

let whatIDrop = ""
let count1 = 0;
let tmppOneRaz = false
const start = function (data, ID) {


    load({
        ID,
        fn: () => {
            <div class="block_size_sea_war"
            id={count1++}
            Element={($el) => {

                
                tmppOneRaz = true
                

                $el.addEventListener("drop", function (e) {
                    //arrGame[index][index2] = 1
                    //let indexField = ((index + 1) * (index2 + 1)) - 1
                    // console.log('=4e694c=',arrGame)
                    //let testId = this.id - 100;
                    this.classList.add("colorbackall")

                    console.log('=cb163c=',testId)
                    console.log('=drop=', "Строка => ", index + 1, "Столбец => ", index2 + 1)
                    e.preventDefault();
                   //
                   const id = e.dataTransfer.getData(1);
                   const draggableElement = document.getElementById(id);
                   
                });


                $el.addEventListener("dragover", (e) => {
                    console.log('=837db3!!!!!!!=',positionShip)
                    // console.log('=dragover=', "Строка => ", index + 1, "Столбец => ", index2 + 1)
                    e.preventDefault();
                });
               

            }}
         ></div>

            return (
                <div class='c-main__body'>
                    <div class="conteiner-game">
                        <div class="start__pr">
                            Практическая работа в Crypto Emergency
                        </div>
                        <div class="start__game">
                            Морской бой
                        </div>
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
                            <div>

                                <button class="btn_change_way"
                                    onclick={() => {

                                    }
                                    }

                                > Смена хода </button>
                                {/* <div>Играете за - {changeFigure}</div> */}
                            </div>


                            <table
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        console.log('=43c63d=', "drag start 4")
                                        whatIDrop = "4 палубы"
                                    });

                                    $el.addEventListener("drop", () => {
                                        
                                        
                                        //найти get
                                        // var data = e.dataTransfer.getData("colorbackall");
                                        // e.target.appendChild(document.getElementById(data));  

                                    });
                                    

                                }}
                                id="ship4" class="ship-4" draggable="true" >

                                {bords.fourbords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war"
                                            ondragover={() => {
                                                positionShip_4 = i + 1
                                                // console.log('=6ebc65=', positionShip)
                                            }}
                                        ></div>
                                    )

                                })}


                                {/* <div class="block_size_sea_war" id="exzample2"></div>
                                <div class="block_size_sea_war" id="exzample3"></div>
                                <div class="block_size_sea_war" id="exzample4"></div> */}
                            </table>

                            <table
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        console.log('=43c63d=', "drag start 4")
                                        whatIDrop = "3 палубы"
                                    });
                                    

                                }}
                                id="ship3" class="" draggable="true" >
                                {bords.triplebords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war" id="exzample2"
                                            ondragover={() => {
                                                positionShip_3 = i + 1
                                                // console.log('=6ebc65=', positionShip)
                                            }}
                                        >

                                        </div>
                                    )
                                })}
                            </table>
                            <table
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        console.log('=43c63d=', "drag start 4")
                                        whatIDrop = "3 палубы"
                                    });
                                }}
                                id="ship2" class="" draggable="true" >
                                {bords.doublebords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war" id="exzample3"
                                            ondragover={() => {
                                                positionShip_2 = i + 1
                                                // console.log('=6ebc65=', positionShip)
                                            }}
                                        >

                                        </div>
                                    )
                                })}
                            </table>
                            <table
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        console.log('=43c63d=', "drag start 4")
                                        whatIDrop = "3 палубы"
                                    });
                                }}
                                id="ship1" class="" draggable="true" >
                                {bords.doublebords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war" id="exzample4"
                                            ondragover={() => {
                                                positionShip_1 = i + 1
                                                // console.log('=6ebc65=', positionShip)
                                            }}
                                        >

                                        </div>
                                    )
                                })}
                            </table>

                        </div>

                        <div class="one_game_sea_war ">

                            <table id="field_sea_war" class=""
                                Element={($el) => {
                                    field = $el
                                }}>
                                {prostoArr.map((item, index) => {
                                    return (
                                        <div class={["block_size_sea_war", arrGame[Math.floor(index / 10)][item] != -1 ? "colorbackall" : null]} >{arrGame[Math.floor(index / 10)][item]}</div>
                                    )
                                })}
                            </table>
                            {/* <table
                                id="field_sea_war" class=""
                                onmousemove={(e) => {
                                    // ship.style.position = 'fixed'
                                    // ship.style.left = e.clientX + -20 + 'px'
                                    // ship.style.top = e.clientY + -30 + 'px'
                                    // moveShip()


                                }}
                            >

                                <div
                                    class="ship"
                                    Element={($el) => {
                                        ship = $el;
                                    }}

                                >
                                    <img src={images['train/result']}></img>
                                </div>
                                {ttt}

                            </table> */}

                        </div>
                        <div class="wi_lo">
                            {/* <div>Выйграл-{ }</div>
                            <div>Проиграл-{ }</div> */}
                        </div>
                        <div class="restart_game">

                            <button class="btn_reset_gm"
                                onclick={() => {
                                    console.log('=fade39=', ship)
                                }}
                            >

                                Заново ;)
                            </button>
                        </div>
                    </div>
                    <div Element={($el) => {
                        elError = $el
                    }} class="c-modal c-modal--open" id="modalsetin" style={"display:none;"}>
                        <section class="c-modal__dialog">
                            {textError}
                        </section>
                    </div>
                </div>
            );
        },
    });
};

export default start;