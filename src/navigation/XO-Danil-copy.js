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

let arrGame = [-1, -1, -1, -1, -1, -1, -1, -1, -1]  // Значения на игровом поле (-1 - поле не занято, 1 - поставили крестик, 0 - поставили нолик)
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

// Функция отображения окна сообщения
const showError = function (text) {
    textError = text
    elError.style.display = '';
    initReload()
    //Время отображения окна
    setTimeout(() => {
        elError.style.display = 'none';
    }, 3000);
}

const start = function (data, ID) {
    //хранение статистики
    let tmpRound = getStorage("staticRounds")
    if (!tmpRound) {
        setStorage("staticRounds", staticRounds)
    } else {
        staticRounds = tmpRound
    }
    console.log('=4b8e9f=', tmpRound)
    //Проверка победителя
    function isVictory() {
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < combs.length; i++) {
            const [a, b, c] = combs[i];
            if (arrGame[a] != -1 && arrGame[a] == arrGame[b] && arrGame[a] === arrGame[c]) {
                return true
            }
        }
        return false;
    }
    //рандомный ход противника(нолика)
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    //функция обнуления игры
    function restGame() {
        // for(var i = 0; i <= 9; i++){
        //     arrGame[i] =  "-1";
        // }
        arrGame = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        whoWay = 1;
        count = 0;
        showError("Новая игра.Начинайте!")
        initReload()
        if (iplay == 0) {
            autoWay()
        }
    }
    //Комбинация выигрыша (бот-за ноль)
    function wantWin() {
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];


        for (let i = 0; i < combs.length; i++) {
            const [a, b, c] = combs[i];
            // console.log('=83ad4f=', arrGame[a], arrGame[b], arrGame[c])
            if (arrGame[a] == -1 || arrGame[b] == -1 || arrGame[c] == -1) {
                if (arrGame[a] == 0 && arrGame[b] == 0) {
                    return c
                }
                if (arrGame[a] == 0 && arrGame[c] == 0) {
                    return b
                }
                if (arrGame[b] == 0 && arrGame[c] == 0) {
                    return a
                }
            }
        }

        return -1;
    }
    //Комбинация выигрыша (бот-за крест)
    function wantWinForKrest() {
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];


        for (let i = 0; i < combs.length; i++) {
            const [a, b, c] = combs[i];
            // console.log('=83ad4f=', arrGame[a], arrGame[b], arrGame[c])
            if (arrGame[a] == -1 || arrGame[b] == -1 || arrGame[c] == -1) {
                if (arrGame[a] == 1 && arrGame[b] == 1) {
                    return c
                }
                if (arrGame[a] == 1 && arrGame[c] == 1) {
                    return b
                }
                if (arrGame[b] == 1 && arrGame[c] == 1) {
                    return a
                }
            }
        }

        return -1;
    }
    //функция закритие выигрыша
    function needClose() {
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];


        for (let i = 0; i < combs.length; i++) {
            const [a, b, c] = combs[i];
            // console.log('=83ad4f=', arrGame[a], arrGame[b], arrGame[c])
            if (arrGame[a] == -1 || arrGame[b] == -1 || arrGame[c] == -1) {
                if (arrGame[a] == 1 && arrGame[b] == 1) {
                    return c
                }
                if (arrGame[a] == 1 && arrGame[c] == 1) {
                    return b
                }
                if (arrGame[b] == 1 && arrGame[c] == 1) {
                    return a
                }
            }
        }

        return -1;
    }
    function needCloseKrest() {
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];


        for (let i = 0; i < combs.length; i++) {
            const [a, b, c] = combs[i];
            // console.log('=83ad4f=', arrGame[a], arrGame[b], arrGame[c])
            if (arrGame[a] == -1 || arrGame[b] == -1 || arrGame[c] == -1) {
                if (arrGame[a] == 0 && arrGame[b] == 0) {
                    return c
                }
                if (arrGame[a] == 0 && arrGame[c] == 0) {
                    return b
                }
                if (arrGame[b] == 0 && arrGame[c] == 0) {
                    return a
                }
            }
        }

        return -1;
    }
    //функция хода противника
    function autoWay() {
        console.log('=51c3b5=', 123)
        if (iplay == 0 && whoWay == 1) {
            
            if (whoWay == 0) {
                showError("Не твой ход")
                return;
            }
            //ход на рандом
            let rn = getRandomInt(9)

            //нужно выыиграть(комп)-присваивание
            let needWinforKrest = wantWinForKrest()
            console.log('=4ea8e1 needWin=', needWinforKrest)

            if (needWinforKrest != -1) {
                rn = needWinforKrest

            } else {
                //не проиграть(комп)-присваивание       
                let dontLose = needCloseKrest()
                // console.log('=d4137d=', dontLose)
                if (dontLose != -1) {
                    rn = dontLose
                }
            }
            if (count == 9) {
                staticRounds.draw++
                setStorage("staticRounds", staticRounds)
                showError("Ничья, можешь испытать удачу снова!")
                startGame = 0
                
                return;
            }

            // console.log('=02e892=', rn)
            console.log('=asdfa=', 2345)
            if (arrGame[rn] == -1) {
                arrGame[rn] = 1

                let checkWin = isVictory()
                if (checkWin == false) {
                    whoWay = 0
                    count++
                    initReload()
                }
                else if (checkWin == true) {
                    showError("Вы проиграли!")
                    staticRounds.lose++
                    setStorage("staticRounds", staticRounds)
                    startGame = 0
                }
                else {
                    // if(dontLose == false) {
                    whoWay = 0
                    count++
                    initReload()
                    // } 
                }
            }
            else {
                autoWay()
            }
        }
        else if (iplay == 1) {
            if (count >= 9) {
                staticRounds.draw++
                setStorage("staticRounds", staticRounds)
                showError("Ничья, можешь испытать удачу снова!")
                startGame = 0
                return;
            }
            if (whoWay == 1) {
                showError('Не твой ход')
                return;
            }
            //ход на рандом
            let rn = getRandomInt(9)

            //нужно выыиграть(комп)-присваивание
            let needWin = wantWin()
            console.log('=4ea8e1 needWin=', needWin)

            if (needWin != -1) {
                rn = needWin
            } else {
                //не проиграть(комп)-присваивание       
                let dontLose = needClose()
                // console.log('=d4137d=', dontLose)
                if (dontLose != -1) {
                    rn = dontLose
                }
            }
            // console.log('=02e892=', rn)

            if (arrGame[rn] == -1) {
                arrGame[rn] = 0

                let checkWin = isVictory()
                console.log('=autoway__!=', whoWay)
                if (checkWin == false) {
                    whoWay = 1
                    count++
                    initReload()
                }
                else if (checkWin == true) {
                    showError("Вы проиграли!")
                    staticRounds.lose++
                    setStorage("staticRounds", staticRounds)
                    startGame = 0
                }
                else {
                    // if(dontLose == false) {
                    whoWay = 1
                    count++
                    initReload()
                    // } 
                }
            }
            else {
                autoWay()
            }
        }
    }



    //Мой ход за ноль
    function myWayNull (index,item) {
        console.log('sjdflkja mywaynull',item)
    if (startGame == 0) {
        showError("Игра окончена")
        return;
    }
    if (whoWay != 0) {
        showError("Не твой ход")
        return;
    }
    if (item == -1) {
        arrGame[index] = 0;

        let checkWin = isVictory()
        if (checkWin == false) {
            whoWay = 1
            count++

            autoWay()
        }

        else {
            staticRounds.win++
            setStorage("staticRounds", staticRounds)
            showError("Вы выиграли")
            startGame = 0
        }
        initReload()
    }
    else {
        showError("поле занято")

    }
    return arrGame.map((index,item) => {
        return (
            <div
                class={[
                    "diz-gm"
                ]}
                onclick={async () => {
                    myWayNull()
                }}
            >

            </div>
        )
    })
    }


    //Мой ход за крест
    function myWayKrest(index, item) {

        console.log('=fb204a  myWayKrest=', index, item)
        if (iplay == 1) {
            console.log('=34e543=', index)
            if (startGame == 0) {
                showError("Игра окончена")
                return;
            }

            if (whoWay != 1) {
                showError("Не твой ход")
                return;
            }

            if (item == -1) {

                arrGame[index] = 1;

                let checkWin = isVictory()
                if (checkWin == false) {
                    whoWay = 0
                    count++

                    autoWay()
                }

                else {
                    staticRounds.win++
                    setStorage("staticRounds", staticRounds)
                    showError("Вы выиграли")
                    startGame = 0
                }
                initReload()
            }
            else {
                showError("поле занято")
                // alert('поле занято')
            }
            return arrGame.map((index, item) => {
                return (
                    <div
                        class={[
                            "diz-gm"
                        ]}
                        onclick={myWayKrest}
                    >

                    </div>
                )
            })
        }
        // else if (iplay == 0) {
        //     console.log('=sdffsdf=', item)
        //     if (startGame == 0) {

        //         showError("Игра окончена")
        //         return;
        //     }
        //     if (whoWay != 0) {
        //         showError("Не твой ход")
        //         return;
        //     }
        //     if (item == -1) {

        //         arrGame[index] = 0;

        //         let checkWin = isVictory()
        //         if (checkWin == false) {
        //             whoWay = 1
        //             count++

        //             autoWay()
        //         }

        //         else {
        //             staticRounds.win++
        //             setStorage("staticRounds", staticRounds)
        //             showError("Вы выиграли")
        //             startGame = 0
        //         }
        //         initReload()
        //     }
        //     else {
        //         showError("поле занято")

        //     }
        //     return arrGame.map((index, item) => {
        //         return (
        //             <div
        //                 class={[
        //                     "diz-gm"
        //                 ]}
        //                 onclick={async () => {
        //                     myWayKrest()
        //                 }}
        //             >
        //                 <img class="diz-gm" src={item == 1 ? svg['train/krest_2'] : item == 0 ? svg['train/null'] : ""} style="fill:red"> </img>

        //             </div>

        //         )
        //     })
        // }


    }


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
                            Крестики-нолики
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
                                        if(iplay==0){
                                            iplay = 1
                                            startGame = 1
                                            restGame()
                                            myWayKrest()
                                        }else{
                                            iplay = 0
                                            startGame = 1
                                        restGame()
                                        iplay = 0
                                        console.log('=whio=', iplay)
                                        autoWay()
                                        
                                            myWayNull()
                                        
                                        }

                                        // startGame = 1
                                        // restGame()
                                        // iplay = 0
                                        // console.log('=whio=', iplay)
                                        // autoWay()
                                        // if (iplay == 0) {
                                        //     myWayNull()
                                        // }
                                        
                                    }
                                    }
                                   

                                > Смена хода </button>
                                {/* <div>Играете за - {changeFigure.item}</div> */}
                            </div>
                        </div>
                        <div class="one_game ">

                            <table id="field" class="" >
                                {/* {myWayKrest(arrGame)} */}

                                {arrGame.map((item, index) => {


                                    return (

                                        <div
                                            class="block__size__1"
                                            onclick={() => {
                                                if (iplay == 1) {
                                                    myWayKrest(index, item)
                                                }

                                                if (iplay == 0) {

                                                    myWayNull(index,item)
                                                }






                                            }}
                                        >
                                            {/* {item == 1 ? 'x' : item == 0 ? "0" : null}  */}

                                            <img class="diz-gm" src={item == 1 ? svg['train/krest_2'] : item == 0 ? svg['train/null'] : ""} style="fill:red"> </img>

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
                                    startGame = 1
                                    restGame()

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