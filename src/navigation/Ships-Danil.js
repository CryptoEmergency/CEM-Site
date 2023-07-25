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
let dropNow
let MyShips = {
    s4: 1,
    s3: 2,
    s2: 3,
    s1: 4
}
let field
let positionShip_4
let elError = null // Ссылка на элемент (Окно сообщения)
let textError = ""  // Переменная с текстом в окне сообщения
let staticRounds = {
    win: 0,
    lose: 0,
    draw: 0
}   // Переменные со значением побед, пор, ничьи
let ship;

const arrEl = []

const addListner = function (item, index, $el) {
    if (arrEl[index]) {
        return
    }
    arrEl[index] = $el
    $el.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    $el.addEventListener("drop", function (e) {
        // if (!oneAction) {
        console.log('=ba5b23=', Math.floor(index / 10), item, dropNow)
        let whatShip = Number(dropNow[1])
        if(Number(item)+ whatShip > 10 ){
            alert("низя")
            return
        }
        
       
        for (let i = item; i < Number(item) + whatShip; i++) {
            arrGame[Math.floor(index / 10)][i] = whatShip
            let pos = "mid"
            if (i == item) {
                pos = "first"
            } else if (i + 1 == Number(item) + whatShip) {
                pos = "last"
            }
            ogranichenRyadom(Math.floor(index / 10), i, whatShip, pos)
        }
        // }
        // oneAction = true
        MyShips[dropNow]--
        console.log('=83d9f4=', MyShips)
        initReload()

    })
}

const addNull = function (row, col) {
    if (row > 9 || row < 0 || col > 9 || col < 0) {
        return
    }
    arrGame[row][col] = 0
    
    return
}

const ogranichenRyadom = function (row, col, num, position) {
    if (num == 1) {
        addNull(row - 1, col - 1)
        addNull(row - 1, col)
        addNull(row - 1, col + 1)

        addNull(row + 1, col - 1)
        addNull(row + 1, col)
        addNull(row + 1, col + 1)

        addNull(row, col + 1)
        addNull(row, col - 1)
    } else {
        addNull(row - 1, col - 1)
        addNull(row - 1, col)
        addNull(row - 1, col + 1)

        addNull(row + 1, col - 1)
        addNull(row + 1, col)
        addNull(row + 1, col + 1)
        if (position == "first") {
            addNull(row, col - 1)

        } else if (position == "last") {
            addNull(row, col + 1)
        }
    }

}

const start = function (data, ID) {
    load({
        ID,
        fn: () => {
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
                            </div>


                            <table style={MyShips.s4 == 0 ? "display:none" : null} id="ship4" class="ship-4" draggable={MyShips.s4 > 0 ? "true" : "false"}
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        dropNow = "s4"
                                    });
                                }}>
                                {bords.fourbords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war"
                                            ondragover={() => {
                                                //positionShip_4 = i + 1
                                            }}>
                                        </div>
                                    )
                                })}
                            </table>

                            <table style={MyShips.s3 == 0 ? "display:none" : null} id="ship3" class="ship-3" draggable={MyShips.s3 > 0 ? "true" : "false"}
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        dropNow = "s3"
                                    });


                                }}>
                                {bords.triplebords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war"
                                            ondragover={() => {
                                                                                              
                                            }}
                                        >

                                        </div>
                                    )
                                })}
                            </table>
                            <table  style={MyShips.s2 == 0 ? "display:none" : null} id="ship2" class="ship-2" draggable={MyShips.s2 > 0 ? "true" : "false"}
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        dropNow = "s2"
                                    });
                                }}>
                                {bords.doublebords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war" 
                                            ondragover={() => {
                                                // positionShip_2 = i + 1
                                            }}
                                        >

                                        </div>
                                    )
                                })}
                            </table>
                            <table  style={MyShips.s1 == 0 ? "display:none" : null} id="ship1" class="ship-1" draggable={MyShips.s1 > 0 ? "true" : "false"}
                                Element={($el) => {
                                    $el.addEventListener("dragstart", () => {
                                        dropNow = "s1"
                                    });
                                }}>
                                {bords.doublebords.map((item, i) => {
                                    return (
                                        <div class="block_size_sea_war" 
                                            ondragover={() => {
                                                // positionShip_1 = i + 1
                                            }}
                                        >

                                        </div>
                                    )
                                })}
                            </table>
                        </div>

                        <div class="one_game_sea_war ">
                            <table id="field_sea_war" class="" Element={($el) => { field = $el }}>
                                {prostoArr.map((item, index) => {
                                    return (
                                        <div class={["block_size_sea_war", arrGame[Math.floor(index / 10)][item] >= 1 ? "colorbackall" : arrGame[Math.floor(index / 10)][item] == 0 ? "colornull" : null]}
                                            Element={($el) => {
                                                addListner(item, index, $el)
                                            }}
                                        >{arrGame[Math.floor(index / 10)][item]}</div>
                                    )
                                })}
                            </table>
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