import {
    jsx,
    jsxFrag,
    Variable,
    init
} from "@betarost/cemjs";

const start = function (data, ID) {
    init(
        null,
        () => {
            return (
                <div class="c-jobs c-main__body">
                    <div class="c-jobs__page">
                        <div class="c-jobs__preview">
                            <div class="c-jobs__textpreview">
                                <h3 class="c-jobs__title">{Variable.lang.h.career_with_us}</h3>
                                <p>{Variable.lang.p.connectTeam}</p>
                                {/* <a href="" class="c-button c-button--primary">
                                    <span class="c-button__text">{Variable.lang.button.our_vacancies}</span>
                                </a> */}
                            </div>
                        </div>

                        <div class="c-jobs__advantages">
                            <h2 class="c-jobs__subtitle">{Variable.lang.h.advantages}</h2>
                            <div class="c-jobs__listadvantages">
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--comand"></div>
                                    <h5>{Variable.lang.p.friendlyTeam}</h5>
                                    <p>{Variable.lang.p.friendlyTeamDesc}</p>
                                </div>
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--company"></div>
                                    <h5>{Variable.lang.p.IntCcompany}</h5>
                                    <p>{Variable.lang.p.IntCcompanyDesc}</p>
                                </div>
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--comfortable"></div>
                                    <h5>{Variable.lang.p.comfortWorking}</h5>
                                    <p>{Variable.lang.p.comfortWorkingDesc}</p>
                                </div>
                                <div class="c-jobs__itemadvantages">
                                    <div class="c-jobs__iconadvantages c-jobs__iconadvantages--contract"></div>
                                    <h5>{Variable.lang.p.employmentStandart}</h5>
                                    <p>{Variable.lang.p.employmentStandartDesc}</p>
                                </div>
                            </div>
                        </div>

                        <div class="c-jobs__profession">
                            <h2 class="c-jobs__subtitle">{Variable.lang.h.profession}</h2>
                            <div class="c-jobs__listprofession">
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--business"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionOne}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--marketing"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionTwo}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--support"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionThree}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--product"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionFour}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--security"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionFive}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--management"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionSix}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--strategic"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionSeven}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--department"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionEight}</span>
                                    </span>
                                </a>
                                <a href="" class="c-jobs__itemprofession">
                                    <span class="c-jobs__wrapprofession">
                                        <i class="c-jobs__iconprofession c-jobs__iconprofession--videoediting"></i>
                                        <span class="c-jobs__textprofession">{Variable.lang.p.professionNine}</span>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div class="c-jobs__how">
                            <h2 class="c-jobs__subtitle">{Variable.lang.h.how_get_job}</h2>
                            <div class="c-jobs__listhow">
                                <div class="c-jobs__itemhow">
                                    <span>01</span>
                                    <p>{Variable.lang.p.stepGetJobOne}</p>
                                </div>
                                <div class="c-jobs__itemhow">
                                    <span>02</span>
                                    <p>{Variable.lang.p.stepGetJobTwo}</p>
                                </div>
                                <div class="c-jobs__itemhow">
                                    <span>03</span>
                                    <p>{Variable.lang.p.stepGetJobThree}</p>
                                </div>
                                <div class="c-jobs__itemhow">
                                    <span>04</span>
                                    <p>{Variable.lang.p.stepGetJobFour}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px"> {/*item*/}
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px"> {/*header*/}
                                    <i style="display: block" class="c-jobs__iconprofession c-jobs__iconprofession--product"></i>
                                    <div>
                                        HTML-верстальщик
                                    </div>
                                    <div>
                                        Активно
                                    </div>
                                </div>
                                <div> {/*main*/}
                                    <p style="margin-bottom: 0">Требуемый опыт работы: 1–3 года</p>
                                    <p>Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="margin-bottom: 5px;">Верстка шаблонов веб-страниц «с нуля»</p>
                                            <p style="margin-bottom: 5px;">Изменение существующих шаблонов сайта</p>
                                            <p style="margin-bottom: 5px;">Взаимодействие с дизайнером, программистом</p>
                                            <p>Тестирование функционала готовых проектов</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="margin-bottom: 5px;">Умение уверенно верстать флексами и гридами, понимать чем одно отличается от другого</p>
                                            <p style="margin-bottom: 5px;">JS-программирование простейшей логики форм будет большим плюсом (валидация, модалки)</p>
                                            <p style="margin-bottom: 5px;">Аккуратность, внимательность, педантичность к своему и чужому коду</p>
                                            <p style="margin-bottom: 5px;">Опыт работы верстальщиком или Front-end разработчиком от 1 года</p>
                                            <p style="margin-bottom: 5px;">Крос-браузерная pixel-perfect верстка и оптимизация под мобильные девайсы</p>
                                            <p style="margin-bottom: 5px;">Отличные знания HTML5, CSS3, SCSS, Figma;</p>
                                            <p style="margin-bottom: 5px;">Знания JavaScript и библиотек (jQuery), DOM;</p>
                                            <p>Навыки редактирования изображений, фотографий, минимальные знания Adobe Photoshop;</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня ( 10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">JavaScript</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">CSS3</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">HTML5</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">jQuery</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">Git</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">Figma</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">Adobe Photoshop</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">Web-дизайн</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; border: 1px solid #353C50; border-radius: 5px">Чувство стиля</div>
                                        <div style="background: #32384B; padding: 5px; border: 1px solid #353C50; border-radius: 5px">Креативность</div>
                                    </div>
                                </div>
                                <div> {/*footer*/}
                                    
                                </div>
                            </div>
                        </div>
                        <div class="c-job__withus">
                            <h2 class="c-jobs__subtitle">{Variable.lang.p.waitYouTeam}</h2>
                        </div>
                    </div>
                </div>
            )
        }, ID
    )
};
export default start;
// OK