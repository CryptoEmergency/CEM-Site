import {
    jsx,
    jsxFrag,
    init,
    Variable,
} from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const start = function (data, ID) {
    console.log('=23889a=', data, Variable.dataUrl)

    init(
        null,
        () => {
            return (
                <div class="c-community c-main__body">
                    <div class="c-community__container c-container">
                        {/* <h1 class="c-community__title">Сообщество</h1> */}
                        <div class="c-community__photo">
                            <img src={images["community/community1"]} />    {/* {images[`${data.src}`]} */}
                        </div>
                        <ul class="c-community__characteristics">
                            <li class="c-community__line">
                                <span class="c-community__caption">Название:</span>
                                <span class="c-community__value c-community__value--name">Anonymous NFT TON</span>  {/* {data.name} */}
                            </li>
                            <li class="c-community__line">
                                <span class="c-community__caption">Описание:</span>
                                <span class="c-community__value">Децентрализованное сообщество людей, объединённых великой целью - стать лучшей версией себя</span>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK