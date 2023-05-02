import {
    jsx,
    jsxFrag,
    init,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";
// import { fn } from '@src/functions/index.js';
import { Avatar } from '@elements/element/index.js';

const { images, svg, fn } = CEM

const start = function (data, ID) {
    console.log('=27489a= freelance = ', data)

    init(
        null,
        () => {
            return (
                <div class="c-freelance c-main__body">
                    <div class="c-freelance__container c-container">
                        <div class="c-freelance__main">
                            <header class="c-freelance__header">
                                <h1 class="c-freelance__title">{data.freelance.position}</h1>
                                <div class="c-freelance__wrapper">
                                    <span class="c-freelance__finance">{data.freelance.budget} за заказ</span>
                                    {
                                        data.freelance.urgency ?
                                            <div class="c-careers__resurgency">
                                                <span>{Variable.lang.span.urgently}</span>
                                            </div>
                                            : null
                                    }
                                </div>
                                <div class="c-freelance__wrapper">
                                    <date class="c-freelance__datecreate" datetime="">{data.freelance.date}</date>
                                    <sapn class="c-freelance__views"><span class="c-freelance__viewscount">{data.freelance.views}</span> {Variable.lang.p.views}</sapn>
                                </div>
                            </header>
                            <div class="c-freelance__description">
                                {
                                    () => {
                                        return fn.editText(data.freelance.about, { clear: true, paragraph: true, html: true })
                                    }
                                }
                            </div>
                        </div>
                        <aside class="c-freelance__aside">
                            <Avatar author={data.freelance.applicant} parent={'c-freelance'} nickName={true} />
                            <h5 class="c-freelance__role">{Variable.lang.h.customerFreelance}</h5>
                            <div class="c-freelance__statistic">
                                <h5 class="">{Variable.lang.h.customerStatisticsFreelance}</h5>
                                <ul class="c-freelance__list">
                                    <li>
                                        <div class="c-freelance__row">
                                            <p>Завершенные заказы</p>
                                            <a href="#" class="">1</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-freelance__row">
                                            <p>В поиске исполнителя</p>
                                            <a href="#" class="">1</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-freelance__row">
                                            <p>Отзывы исполнителей</p>
                                            <a href="#" class="">
                                                1 / 0
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="c-freelance__row">
                                            <p>Зарегистрирован</p>
                                            <span>10.08.2008</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="c-freelance__contacts">
                                <h5 class="">{Variable.lang.h.customerContactsFreelance}</h5>
                                <p>{data.freelance.applicant.contacts ? data.freelance.applicant.contacts : Variable.lang.p.noneContactsFreelance}</p>
                            </div>
                        </aside>
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK