import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemserver/cem.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
    // console.log('=23889a=', data, Variable.dataUrl)

    init(
        null,
        () => {
            return (
                <div class="c-aboutteacher c-main__body">
                    <div class="c-aboutteacher__container c-container">
                        {/* <h1 class="c-aboutteacher__title">Преподаватель</h1> */}
                        <div class="c-aboutteacher__photo">
                            <img src={images[`${data.src}`]} />
                        </div>
                        <h2 class="c-aboutteacher__name">{data.name}</h2>
                        <h3 class="c-aboutteacher__position">{data.position}</h3>
                        <p class="c-aboutteacher__contacts">
                            <h4 class="c-aboutteacher__caption">Контакты:</h4>
                            <span class="c-aboutteacher__contact">E-mail: {data.contacts.email ? data.contacts.email : "---"}</span>
                            <span class="c-aboutteacher__contact">Телефон: {data.contacts.phone ? data.contacts.phone : "---"}</span>
                            <span class="c-aboutteacher__contact">telegram:  {data.contacts.telegram ? data.contacts.telegram : "---"}</span>
                        </p>
                        <section class="c-aboutteacher__biography">
                            <h4 class="c-aboutteacher__caption">Биография</h4>
                            <p class="c-aboutteacher__text">{data.biography}</p>
                        </section>
                        <section class="c-aboutteacher__achievements">
                            <h4 class="c-aboutteacher__caption">Достижения</h4>
                            <p class="c-aboutteacher__text">{data.achievements}</p>
                        </section>
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK