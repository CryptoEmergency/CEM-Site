import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    load,
    CEM
} from "@betarost/cemserver/cem.js";
let rows = 3;
let cols = 3;
let count = 0
let arrGame = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
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
let whoWay = 1
const { images, svg, fn } = CEM
const start = function (data, ID) {
    function isVictory(cells) {
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
        for (let comb of combs) {
            if (
                cells[comb[0]].textContent == cells[comb[1]].textContent &&
                cells[comb[1]].textContent == cells[comb[2]].textContent &&
                cells[comb[0]].textContent != ''
            ) {
                return true;
            }
        }
        return false;
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function autoWay() {
        if (count >=9){
            alert('игра стоп')
            return;
        }
        if (whoWay == 1) {
            alert('Не твой ход')
            return;
        }
        // console.log(getRandomInt(9))

        let rn = getRandomInt(9)
        if (arrGame[rn] == -1) {
             arrGame[rn] = 0
            whoWay = 1
            count++
            initReload()
        }
        else {
             autoWay()
        }
        
        

    }
    let [Static] = fn.GetParams({ data, ID });
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
                                    <div>пор:{ } </div>
                                    <div>поб:{ } </div>
                                    <div>ничья:{ } </div>

                                </div>
                                <div></div>
                                <div class="stats_view_pr">
                                    <div class="stats_view"> число </div>
                                    <div class="stats_view"> число </div>
                                    <div class="stats_view"> число </div>
                                </div>
                            </div>
                            <button class="st-gm"> Показать ряд </button>
                        </div>
                        <div class="one_game ">

                            <table id="field" class="" >
                                {arrGame.map((item, index) => {


                                    return (
                                        <div
                                            class="block__size__1"
                                            onclick={() => {

                                                if (whoWay != 1) {
                                                    alert('Не твой ход')
                                                    return;
                                                }

                                                if (item == -1) {
                                                    arrGame[index] = 1;
                                                    initReload()
                                                    whoWay = 0
                                                    count++
                                                    autoWay()
                                                }
                                                else {
                                                    alert('поле занято')
                                                }
                                            }}>
                                            {/* {item == 1 ? 'x' : item == 0 ? "0" : null}  */}
                                            <img class="diz-gm" src={item == 1 ? svg['train/krest_2'] : item == 0 ? svg['train/null'] : null}>  </img>
                                        </div>
                                    )

                                }
                                )}
                                {/* <div class=""> sdfaj </div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div>wfwsfw</div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div> */}
                            </table>

                        </div>
                        <div class="wi_lo">
                            <div>Выйграл-{ }</div>
                            <div>Проиграл-{ }</div>
                        </div>
                        <div class="restart_game">
                            <button class="btn_reset_gm">
                                Заново ;)
                            </button>
                        </div>
                    </div>
                </div>
            );
        },
    });
};

export default start;