import {
    jsx,
    jsxFrag,
    Variable,
    init
} from "@betarost/cemjs";

const start = function (data, ID = "mainBlock") {

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
                                <a href="" class="c-button c-button--primary">
                                    <span class="c-button__text">{Variable.lang.button.our_vacancies}</span>
                                </a>
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