import {
    jsx,
    jsxFrag,
    Variable,
    init
} from "@betarost/cemserver/cem.js";

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
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i style="display: block; margin-right: 10px" class="c-jobs__iconprofession c-jobs__iconprofession--product"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        HTML-верстальщик
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Верстка шаблонов веб-страниц «с нуля»</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Изменение существующих шаблонов сайта</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Взаимодействие с дизайнером, программистом</p>
                                            <p style="font-size: 14px; color: #CACACA">Тестирование функционала готовых проектов</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Умение уверенно верстать флексами и гридами, понимать чем одно отличается от другого</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">JS-программирование простейшей логики форм будет большим плюсом (валидация, модалки)</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Аккуратность, внимательность, педантичность к своему и чужому коду</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы верстальщиком или Front-end разработчиком от 1 года</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Крос-браузерная pixel-perfect верстка и оптимизация под мобильные девайсы</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Отличные знания HTML5, CSS3, SCSS, Figma;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Знания JavaScript и библиотек (jQuery), DOM;</p>
                                            <p style="font-size: 14px; color: #CACACA">Навыки редактирования изображений, фотографий, минимальные знания Adobe Photoshop;</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">JavaScript</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">CSS3</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">HTML5</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">jQuery</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Git</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Figma</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Adobe Photoshop</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Web-дизайн</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Чувство стиля</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Креативность</div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i style="display: block; margin-right: 10px" class="c-jobs__iconprofession c-jobs__iconprofession--product"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        Frontend developer
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Поддержка и улучшение существующего продукта</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Разработка и развитие клиентской части проекта на JavaScript;</p>
                                            <p style="font-size: 14px; color: #CACACA">Постоянное улучшение своих знаний в области веб-технологий;</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Отличное знание языка JavaScript;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Навыки работы с GIT.</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Уверенное знание HTML5, CSS3</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Умение предлагать рациональные решения поставленных задач;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Стремление к профессиональному росту‚ обязательность‚ ответственность;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Умение разбираться в чужом коде;</p>
                                            <p style="font-size: 14px; color: #CACACA">Опыт работы с js-фреймворками (Backbone, AngularJS, Vue.js и др.)</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">JavaScript</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Node.js</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Git</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">CSS</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">HTML</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">MongoDB</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">JSX</div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i style="display: block; margin-right: 10px" class="c-jobs__iconprofession c-jobs__iconprofession--product"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        Frontend React developer
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Разработка UI</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Фронтенд разработка нового функционала;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Сопровождение имеющегося кода, его доработка и оптимизация;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Постоянное улучшение своих знаний в области веб-технологий;</p>
                                            <p style="font-size: 14px; color: #CACACA">Умение работать самостоятельно, стремление к саморазвитию, высокая обучаемость, внимательность;</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Отличное знание языка JavaScript;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Знание и умение работать с фреймворками Vue/React</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Навыки работы с GIT.</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Уверенное знание HTML5, CSS3</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Умение предлагать рациональные решения поставленных задач;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Стремление к профессиональному росту‚ обязательность‚ ответственность;</p>
                                            <p style="font-size: 14px; color: #CACACA">Умение разбираться в чужом коде;</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                    <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">JavaScript</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Node.js</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Git</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">CSS</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">HTML</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">MongoDB</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">React</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Vue</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">JSX</div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i class="c-jobs__iconprofession c-jobs__iconprofession--security"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        Backend developer
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Разработка кода backend части web проекта</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Поддержка существующей кодовой базы</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Разрабатывать новые компоненты системы;</p>
                                            <p style="font-size: 14px; color: #CACACA">Участвовать в проработке архитектурных решений</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Глубокие знания Javascript и Node.js;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы с NodeJS в baсkend приложениях</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы с MongoDB</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы с Git</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт использования Redis</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Понимание REST-архитектуры, опыт разработки серверной части REST(REST API);</p>
                                            <p style="font-size: 14px; color: #CACACA">Умение писать чистый, валидный код</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">JavaScript</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Git</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Node.js</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">MongoDB</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">REST</div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i class="c-jobs__iconprofession c-jobs__iconprofession--security"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        DevOps
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Обеспечение бесперебойного функционирования IT–инфраструктуры;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Устранение инцидентов и неисправностей в работе IT-инфраструктуры;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Поддерживать и развивать базовую инфраструктуру (мониторинг, логирование, etc);</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Поддерживать и развивать инфраструктуру проектов (CDN, защита от DDoS, etc);</p>
                                            <p style="font-size: 14px; color: #CACACA">Администрирование удаленных серверов на Linux;</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы с *nix системами, уверенное знание Linux;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Понимание механизма работы сетей (протоколы (в том числе видео), cdn, облака и т.д.);</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы с Nginx;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы с Docker Swarm</p>
                                            <p style="font-size: 14px; color: #CACACA">Навыки программирования на скриптовых языках (bash/Python);</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">CDN</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">DDoS</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Linux</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Nginx</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Docker Swarm</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">bash</div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i style="display: block; margin-right: 10px" class="c-jobs__iconprofession c-jobs__iconprofession--product"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        React native developer
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Разработка кросс платформенных приложений на React Native с нуля;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Поддержка и доработка существующий приложений;</p>
                                            <p style="font-size: 14px; color: #CACACA">Участие в оценке и планировании;</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Отличное знание React Native, его использование на коммерческих проектах</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Понимание концепции работы React Native и встраиваемых модулей;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Понимание концепции работы React Hooks;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Хорошие знания TypeScript</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт работы Firebase</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Знание работы Xcode, Android Studio</p>
                                            <p style="font-size: 14px; color: #CACACA">Наличие практического опыта работы с Google Play и App Store (включая подписи приложений, заливку и публикацию в сторы)</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">React</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">React Native</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">TypeScript</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Firebase</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Xcode</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Android Studio</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Google Play</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">App Store</div>

                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i class="c-jobs__iconprofession c-jobs__iconprofession--security"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        Blockchain developer
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Участвовать в проектировании, разработке и внедрении блокчейн-проектов</p>
                                            <p style="font-size: 14px; color: #CACACA">Разрабатывать, тестировать, анализировать смарт-контракты</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Базовое понимание технологии blockchain</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Базовые знания blockchain-инфраструктуры (NFT-marketplace, DAO, DeFI, DEX, и пр).</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Понимание Blockchain. Знание Solidity, hardhat, web3</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Умение читать и разрабатывать smart-контракты;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Опыт выпуска собственных токенов на Ethereum;</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Будет плюсом опыт создания собственных монет.</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Широкий технический кругозор (знание других языков программирования, инфраструктурных решений, бэкграунд в системном администрировании и DevOps).</p>
                                            <p style="font-size: 14px; color: #CACACA">Опыт разворачивания собственных нод и оракулов</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">blockchain</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">NFT</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">DAO</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">DeFI</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Xcode</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">DEX</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Solidity</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">web3</div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: #2B3040; border: 1px solid #353C50; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px">
                                    <i class="c-jobs__iconprofession c-jobs__iconprofession--marketing"></i>
                                    <div style="font-size: 26px; font-weight: 600">
                                        SEO-специалист
                                    </div>
                                    <div style="text-transform: uppercase; color: #0FB500; font-weight: 800; text-decoration: none; background: linear-gradient(225deg, #72FFB6 0%, #10D194 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                                        Активно
                                    </div>
                                </div>
                                <div>
                                    <p style="margin-bottom: 0; color: #CACACA">Требуемый опыт работы: 1–3 года</p>
                                    <p style="color: #CACACA">Полная занятость, полный день</p>
                                    
                                    <p style="margin-bottom: 0;">Работа исключительно в офисе.</p>
                                    <p>В данный момент ведется разработка нескольких крупных проектов.</p>
                                    
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px; margin-right: 10px">
                                            <p style="font-weight: 600; font-size: 17px">Обязанности:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Работа с информационными статьями репутационного характера</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">SEO-оптимизация сайтов</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Проработка поисковых подсказок</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Фиксация результатов поиска Яндекс и Google</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Анализ результатов поиска в системах Яндекс и Google по запросам</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Регулярный анализ динамики приоритетных запросов</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Подбор и анализ целевых запросов, составление семантического ядра.</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Поиск новых способов продвижения сайта.</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Создавать и публиковать уникальный и интересный контент в Instagram, Telegram, YouTube, ВКонтакте.</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Оформление аккаунтов, ежедневный постинг, копирайтинг / рерайтинг. Посевы в пабликах.</p>
                                            <p style="font-size: 14px; color: #CACACA">Разработка и реализация стратегии SMM для привлечения аудитории, составление контент-плана.</p>
                                        </div>
                                        <div style="background: #32384B; border: 1px solid #353C50; padding: 10px; border-radius: 5px">
                                            <p style="font-weight: 600; font-size: 17px">Требования:</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Хорошее знание принципов и факторов ранжирования в Яндекс и Google</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Умение работать с сервисами: ahrefs, topvisor, checktrust, Google Analytics, Яндекс Метрика и т. д.</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Умение работать в команде, работать с большими объемами информации, быстро принимать решения, воплощать их в жизнь и нести ответственность за результат</p>
                                            <p style="font-size: 14px; margin-bottom: 5px; color: #CACACA">Знаете что такое информационный стиль и пишите соответствующие тексты, без орфографических и пунктуационных ошибок.</p>
                                            <p style="font-size: 14px; color: #CACACA">Постоянно развиваетесь и готовы бесконечно совершенствовать аккаунты и контент.</p> 
                                        </div>
                                    </div>
                                    
                                    <p style="margin-bottom: 0">Рабочая неделя 5/2 c началом рабочего дня (10:00 - 18:00 Мск)</p>
                                    <p>Мы находимся в Новороссийске, можем организовать встречу в офисе.</p>
                                    
                                    <p style="font-weight: 600; font-size: 17px">Ключевые навыки</p>
                                    <div style="display: flex; flex-wrap: wrap">
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">SEO</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Яндекс Метрика</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Google Analytics</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">checktrust</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">topvisor</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">ahrefs</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Instagram</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Telegram</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">YouTube</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">ВКонтакте</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Яндекс</div>
                                        <div style="background: #32384B; padding: 5px; margin-right: 5px; margin-bottom: 5px; border: 1px solid #353C50; border-radius: 5px">Google</div>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        style="padding: 1px; background: linear-gradient(56.57deg, #2973FF 0%, #8846D3 51.56%, #FF22AC 105.28%); border-radius: 5px; cursor: pointer; text-align: center; width: 200px; margin: 0 auto; margin-top: 20px"
                                        onclick={(e) => {
                                            Variable.SetModals({ name: "ModalWorkMessage", data: {} })
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div style="background: #2B3040; border-radius: 5px; line-height: 42px; font-weight: 600">
                                            Откликнуться
                                        </div>
                                    </div>
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