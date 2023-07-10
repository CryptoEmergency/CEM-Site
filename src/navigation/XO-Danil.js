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
let arrGame = [-1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1,-1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1,-1]  
let bords = {
    fourbords: [1,1,1,1],
    triplebords:[2,2,2],
    doublebords:[3,3],
    onebords:[4]
}
let count = 0  // Сколько раз походили
let startGame = 1 //1-Игра идет, 0 - Игра остановлена
let whoWay = 1 // чей ход (1 - ходит крестик, 0 - ходит нолик)  
let elError = null // Ссылка на элемент (Окно сообщения)
let textError = ""  // Переменная с текстом в окне сообщения
let iplay = 1       //1-крест 0-ноль
let changeFigure = {
 krest: "X", //отображение фигуры за которую играешь 
 null : "O"
}
let staticRounds = {
    win: 0,
    lose: 0,
    draw: 0
}   // Переменные со значением побед, пор, ничьи


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
                            <div>Играете за - {changeFigure}</div>
                            </div>
                        </div>
                        <div class="one_game_sea_war ">

                            <table id="field_sea_war" class="" >
                                {arrGame.map((item, index) => {

                                    
                                    return (
                                        
                                        <div
                                            class="block_size_sea_war"
                                            onclick={() => {
                                                
                                        }}
                                        >
                                            {/* {item == 1 ? 'x' : item == 0 ? "0" : null}  */}

                                            {/* <img class="diz-gm" src={item == 1 ? svg['train/krest_2'] : item == 0 ? svg['train/null'] : ""} style="fill:red"> </img> */}

                                        </div>
                                    )

                                }
                                )}
                                
                            </table>
                            <table id="field_sea_war" class="" >
                                {arrGame.map((item, index) => {

                                    
                                    return (
                                        
                                        <div
                                            class="block_size_sea_war"
                                            onclick={() => {
                                                
                                        }}
                                        >
                                            {/* {item == 1 ? 'x' : item == 0 ? "0" : null}  */}

                                            {/* <img class="diz-gm" src={item == 1 ? svg['train/krest_2'] : item == 0 ? svg['train/null'] : ""} style="fill:red"> </img> */}

                                        </div>
                                    )

                                }
                                )}
                                
                            </table>

                        </div>
                        <div class="wi_lo">
                            {/* <div>Выйграл-{ }</div>
                            <div>Проиграл-{ }</div> */}
                        </div>
                        <div class="restart_game">

                            <button class="btn_reset_gm"
                                onclick={() => {
                                    
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