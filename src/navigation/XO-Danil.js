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
// Значения на игровом поле (-1 - поле не занято, 1 - поставили крестик, 0 - поставили нолик)
let arrGame = [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
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
            let ttt = []
            arrGame.forEach((item, index) => {
                // console.log('=b831ce=', index)
                item.forEach((item2, index2) => {
                    ttt.push(<div
                        class="block_size_sea_war"
                        id={count1++}
                        onclick={() => {
                            // console.log('=a3574a=', "Строка => ", index + 1, "Столбец => ", index2 + 1)
                        }}
                        Element={($el) => {

                            // if (!tmppOneRaz) {
                            tmppOneRaz = true
                            // $el.addEventListener("dragenter", () => {
                            //     // console.log('=dragenter=', "Строка => ", index + 1, "Столбец => ", index2 + 1)

                            // });

                            // $el.addEventListener("dragleave", () => {
                            //     // console.log('=dragleave=', "Строка => ", index + 1, "Столбец => ", index2 + 1)

                            // });

                            $el.addEventListener("drop", function (e) {

                                arrGame[index][index2] = 1
                                let indexField = ((index + 1) * (index2 + 1)) - 1
                                // console.log('=4e694c=',arrGame)
                                let testId = this.id - 100;
                                console.log('=cb163c=',testId)

                                
                                // console.log('=18a32b=',indexField)
                                // console.log('=5d3ebf=', positionShip )
                                if (positionShip == 1) {
                                    field.childNodes[testId].classList.add("colorbackall")
                                    field.childNodes[testId+1].classList.add("colorbackall")
                                    field.childNodes[testId+2].classList.add("colorbackall")
                                    field.childNodes[testId+3].classList.add("colorbackall")   
                                } else if (positionShip == 2) {
                                    field.childNodes[testId].classList.add("colorbackall")
                                    field.childNodes[testId+1].classList.add("colorbackall")
                                    field.childNodes[testId+2].classList.add("colorbackall")
                                    field.childNodes[testId-1].classList.add("colorbackall")
                                }
                                // field.childNodes[index2].classList.add("colorbackall")

                                // console.log('=b12f14=',field.childNodes[indexField].classList.add("colorbackall"))
                                
                                // arrGame.map((index,index2)=>{
                                    
                                // })
                                //var bordssize = function size(arrGame,index,index2,item) {
                                    // this.classList.add("colorbackall")
                                    
                                //    arrGame.map((index2,i) => {
                                //     index2.map((item, i2) => {
                                //         if (this.classList.add("colorbackall"))
                                //         {
                                //             index2 + 1
                                //             console.log('=ee0aaf=',arrGame)
                                //         } else {
                                //             console.log('=fcb4db=',"Что это такое")
                                //         }
                                //     })
                                        
                                //    })
                                // index2.map(item, i) {
                                //     console.log('=7b13e4=',i)
                                // }
                                
                                
                                        //this.classList.add("colorbackall")
                                    
                                //}
                                //this.classList.add("colorbackall")
                                
                                

                                
                                console.log('=drop=', "Строка => ", index + 1, "Столбец => ", index2 + 1)
                                e.preventDefault();
                               //
                               const id = e.dataTransfer.getData('text');
                               const draggableElement = document.getElementById(id);
                               //const dropzone = e.target;
                               //dropzone.appendChild(draggableElement);
                               //e.dataTransfer.clearData();
                            });


                            $el.addEventListener("dragover", (e) => {
                                console.log('=837db3!!!!!!!=',positionShip)
                                // console.log('=dragover=', "Строка => ", index + 1, "Столбец => ", index2 + 1)
                                e.preventDefault();
                            });
                            // }

                        }}
                    >{index2}</div>)
                })
            })

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
                                    
                                    $el.addEventListener("drop",  () => {
                                        
                                        //найти get
                                        // var data = e.dataTransfer.getData("colorbackall");
                                        // e.target.appendChild(document.getElementById(data));  

                                    });
                                    // fourbords.forEach((item, index) => {
                                    //     // console.log('=b831ce=', item)
                                    //     item.forEach((item, index2) => {
                                    //         ttt.push(<div class="block_size_sea_war" id="exzample1"

                                    //             onclick={() => {
                                    //                 console.log('=a3574a=', "Строка => ", index + 1, "Столбец => ", index2 + 1)

                                    //             }}
                                    //         ></div>)
                                    //     })
                                    // })
                                    //<div class="block_size_sea_war" id="exzample1"></div>

                                }}
                                id="ship4" class="ship-4" draggable="true" >
                                    
                                {ships.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war"
                                            ondragover={() => {
                                                positionShip = i+1
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
                                    // fourbords.forEach((item, index) => {
                                    //     // console.log('=b831ce=', item)
                                    //     item.forEach((item, index2) => {
                                    //         ttt.push(<div class="block_size_sea_war" id="exzample1"

                                    //             onclick={() => {
                                    //                 console.log('=a3574a=', "Строка => ", index + 1, "Столбец => ", index2 + 1)

                                    //             }}
                                    //         ></div>)
                                    //     })
                                    // })
                                    //<div class="block_size_sea_war" id="exzample1"></div>

                                }}
                                id="ship3" class="" draggable="true" >
                                {([1, 2, 3]).map(() => {
                                    return (
                                        <div class="block_size_sea_war" id="exzample2"></div>
                                    )
                                })}
                                {/* <div class="block_size_sea_war" id="exzample2"></div>
                                <div class="block_size_sea_war" id="exzample3"></div>
                                <div class="block_size_sea_war" id="exzample4"></div> */}
                            </table>

                        </div>
                        
                        <div class="one_game_sea_war ">

                            <table id="field_sea_war" class=""
                                Element={($el) => {
                                    field = $el
                                }}
                            >
                                {ttt}


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