import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
    // console.log('=23889a=', data, Variable.dataUrl)

    init(
        null,
        () => {
            return (
                <div class="c-aboutcourse c-main__body">
                    <div class="c-aboutcourse__container c-container">
                        <div class="c-aboutcourse__logo">
                            <img src={images[`${data.src}`]} />
                        </div>
                        <section class="c-aboutcourse__forwhom">
                            <h4 class="c-aboutcourse__caption">Для кого предназначен:</h4>
                            <p class="c-aboutcourse__text">{data.for_whom}</p>
                        </section>
                        <section class="c-aboutcourse__modules">
                            <h4 class="c-aboutcourse__caption">Модули:</h4>
                            <ul class="c-aboutcourse__moduleslist">
                                {
                                    data.modules.map(function (module, i) {
                                        return (
                                            <li class="c-aboutcourse__modulesitem">{module.item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </section>
                        <section class="c-aboutcourse__buns">
                            <h4 class="c-aboutcourse__caption">Что входит в курс:</h4>
                            <ul class="c-aboutcourse__bunslist">
                                {
                                    data.content.map(function (content, i) {
                                        return (
                                            <li class="c-aboutcourse__bunsitem">{content.item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </section>
                        <section class="c-aboutcourse__resourse">
                            <h4 class="c-aboutcourse__caption">Ресурс:</h4>
                            <a target="_blank" href={data.resourse}><span>{data.resourse}</span></a>
                        </section>
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK