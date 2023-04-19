import {
    jsx,
    jsxFrag,
    init,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";
// import svg from "@assets/svg/index.js";
// import images from "@assets/images/index.js";

const { images, svg, fn } = CEM

const start = function (data, ID) {
    // console.log('=23489a= vacancy =', data)

    init(
        null,
        () => {
            return (
                <div class="c-vacancy c-main__body">
                    <div class="c-vacancy__container c-container">
                        <section class="c-vacancy__main">
                            <header class="c-vacancy__header">
                                <h1 class="c-vacancy__title">{data.vacancy.vacancy.name}</h1>
                                <date class="c-vacancy__datecreate" datetime="">{data.vacancy.datecreate}</date>
                            </header>
                            <div class="c-vacancy__requirements">
                                <h4 class="c-vacancy__titlerequirements">{Variable.lang.h.requirements}</h4>
                                <ul class="c-vacancy__skillsrequirements">
                                    {
                                        data.vacancy.skills ?
                                            data.vacancy.skills.map((skill) => {
                                                return (
                                                    <li>
                                                        <span>{skill}</span>
                                                    </li>
                                                )
                                            })
                                            : null
                                    }
                                </ul>
                            </div>
                            <div class="c-vacancy__typeemployment">
                                <h4 class="c-vacancy__titletypeemployment">{Variable.lang.h.locationAndTypeOfEmployment}</h4>
                                <ul class="c-vacancy__conditionstypeemployment">
                                    {
                                        data.vacancy.conditions ?
                                            data.vacancy.conditions.map((condition) => {
                                                return (
                                                    <li>
                                                        <span>{condition}</span>
                                                    </li>
                                                )
                                            })
                                            : null
                                    }
                                </ul>
                            </div>
                        </section>

                        <section class="c-vacancy__description">
                            <h3 class="c-vacancy__subtitle">{Variable.lang.h.descriptionVacancy}</h3>
                            {
                                data.vacancy.vacancy.cover ?
                                    <figure class="c-vacancy__cover">
                                        <img src={data.vacancy.vacancy.cover} width="" height="" />
                                    </figure>
                                    : null
                            }
                            {
                                data.vacancy.vacancy.description ?
                                    <div class="c-vacancy__block">
                                        {data.vacancy.vacancy.description}
                                    </div>
                                    : null
                            }
                            {
                                data.vacancy.vacancy.aboutProject ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.aboutProjectVacancy}</h4>
                                        {data.vacancy.vacancy.aboutProject}
                                    </div>
                                    : null
                            }
                            {
                                data.vacancy.vacancy.tools ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.toolsVacancy}</h4>
                                        {data.vacancy.vacancy.tools}
                                    </div>
                                    : null
                            }
                            {

                                data.vacancy.vacancy.responsibilities ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.responsibilitiesVacancy}</h4>
                                        {data.vacancy.vacancy.responsibilities}
                                    </div>
                                    : null
                            }
                            {
                                data.vacancy.vacancy.requirements ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.requirementsVacancy}</h4>
                                        {data.vacancy.vacancy.requirements}
                                    </div>
                                    : null
                            }
                            {
                                data.vacancy.vacancy.willBePlus ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.willBePlusVacancy}</h4>
                                        {data.vacancy.vacancy.willBePlus}
                                    </div>
                                    : null
                            }
                            {
                                data.vacancy.vacancy.bonuses ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.bonusesVacancy}</h4>
                                        {data.vacancy.vacancy.bonuses}
                                    </div>
                                    : null
                            }
                            {
                                data.vacancy.vacancy.additionalInstructions ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.additionalInstructionsVacancy}</h4>
                                        {data.vacancy.vacancy.additionalInstructions}
                                    </div>
                                    : null
                            }
                            {
                                data.vacancy.company.contact ?
                                    <div class="c-vacancy__block">
                                        <h4 class="c-vacancy__subtitle">{Variable.lang.h.contactsVacancy}</h4>
                                        <ul class="c-vacancy__socialicon c-socialicon">
                                            {
                                                data.vacancy.company.contact.telegram ?
                                                    <li class="c-socialicon">
                                                        <a
                                                            href={data.vacancy.company.contact.telegram}
                                                            target="_blank"
                                                            class="c-socialicon__link"
                                                        >
                                                            <img class="c-socialicon__icon" src={svg['telegram-icon']} />
                                                        </a>
                                                    </li>
                                                    : null
                                            }
                                            {
                                                data.vacancy.company.contact.youtube ?
                                                    <li class="c-socialicon">
                                                        <a
                                                            href={data.vacancy.company.contact.youtube}
                                                            target="_blank"
                                                            class="c-socialicon__link"
                                                        >
                                                            <img class="c-socialicon__icon" src={svg['youtube_icon']} />
                                                        </a>
                                                    </li>
                                                    : null
                                            }
                                            {
                                                data.vacancy.company.contact.twitter ?
                                                    <li class="c-socialicon">
                                                        <a
                                                            href={data.vacancy.company.contact.twitter}
                                                            target="_blank"
                                                            class="c-socialicon__link"
                                                        >
                                                            <img class="c-socialicon__icon" src={svg['twitter-icon']} />
                                                        </a>
                                                    </li>
                                                    : null
                                            }
                                            {
                                                data.vacancy.company.contact.discord ?
                                                    <li class="c-socialicon">
                                                        <a
                                                            href={data.vacancy.company.contact.discord}
                                                            target="_blank"
                                                            class="c-socialicon__link"
                                                        >
                                                            <img class="c-socialicon__icon" src={svg['discord-icon']} />
                                                        </a>
                                                    </li>
                                                    : null
                                            }
                                            {
                                                data.vacancy.company.contact.github ?
                                                    <li class="c-socialicon">
                                                        <a
                                                            href="https://github.com/CryptoEmergency"
                                                            target="_blank"
                                                            class="c-socialicon__link"
                                                        >
                                                            <img class="c-socialicon__icon" src={svg['github-icon2']} />
                                                        </a>
                                                    </li>
                                                    : null
                                            }
                                            {
                                                data.vacancy.company.contact.tiktok ?
                                                    <li class="c-socialicon">
                                                        <a
                                                            href={data.vacancy.company.contact.tiktok}
                                                            target="_blank"
                                                            class="c-socialicon__link"
                                                        >
                                                            <img class="c-socialicon__icon" src={svg['tiktok-icon']} />
                                                        </a>
                                                    </li>
                                                    : null
                                            }
                                            {
                                                data.vacancy.company.contact.linkedin ?
                                                    <li class="c-socialicon">
                                                        <a
                                                            href={data.vacancy.company.contact.linkedin}
                                                            target="_blank"
                                                            class="c-socialicon__link"
                                                        >
                                                            <img class="c-socialicon__icon" src={svg['linkedin-icon']} />
                                                        </a>
                                                    </li>
                                                    : null
                                            }
                                        </ul>
                                    </div>
                                    : null
                            }
                        </section>

                        <aside class="c-vacancy__aside">
                            <a href={data.vacancy.company.src} class="c-vacancy__logo">
                                <img src={data.vacancy.logo} width="150" height="150" />
                            </a>
                            <h5 class="c-vacancy__company">{data.vacancy.company.name}</h5>
                        </aside>
                    </div>
                </div>
            );
        }, ID
    );
};
export default start;
  // OK