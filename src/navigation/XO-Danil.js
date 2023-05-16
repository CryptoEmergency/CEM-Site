import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    load,
    CEM
} from "@betarost/cemserver/cem.js";
const { images, svg, fn } = CEM
const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID });
    load({
        ID,
        fn: () => {

            return (
                <div class='c-main__body'>
                    <div class="conteiner-game">
                    <div class="start__pr">
                        Практическое задание
                    </div>
                    <div class="start__game">
                        Крестики-нолики
                    </div>
                    <div>
                        Статистика:
                        <div>поражение: </div>
                        <div> </div>
                    </div>
                    </div>
                </div>
            );
        },
    });
};

export default start;