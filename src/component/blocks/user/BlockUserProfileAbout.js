import {
    jsx,
    jsxFrag,
    Variable,
    stringToHtml
} from '@betarost/cemjs';
import { ProfileAboutMe } from '@component/element/user/ProfileAboutMe.js';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { numberFixWithSpaces } from '@src/functions.js';
import { getDateFormat } from '@src/functions.js'
import { If } from '@component/helpers/All.js'

const BlockUserProfileAbout = function ({ lang, myInfo, userInfo, data }) {


    const ListInterests = Object.keys(userInfo.interest).map(function (key) {
        return (
            <div id={userInfo.interest[key]._id}>
                <b>{userInfo.interest[key].title}<img data-action="editInterest" class="editbigblockinfo" style="display: none;" src={svg['pencil']}/></b>
                <span>{userInfo.interest[key].description}</span>
            </div>
        )
    })

    const ListWorks = Object.keys(userInfo.work).map(function (key) {
        return (
            <div id={userInfo.work[key]._id} class="work_and_education_block">
                <span>{userInfo.work[key].title} <img class="editworkinfo" style="display: none;" data-action="editWork" src={svg['pencil']} /></span>
                <span>{userInfo.work[key].period}</span>
                <span>{userInfo.work[key].description}</span>
            </div>    
        )
    })

    //userInfo.information.about = "test"
    let tmp = '<p class="gggg"><span>fhhhfhf</span></p>'
    return (
        <div data-touchmove="userProfileSlide" data-touchstart="userProfileSlideStart" data-touchend="userProfileSlideEnd" class="bl_one" id="UserInfoAbout">
            <h2>{lang.h.personalInfo}</h2>
            <div class="about_user">
                <div class="about_user_section-1 about_user_section-row_type-2">
                    <div class="about_user_section-row_type-3">
                        <div class="about_user_section">
                                <If
                                    data={myInfo._id == userInfo._id}
                                    dataIf={
                                        <div class="about_user_section_inner">
                                            <p>{lang.p.aboutMe}</p>
                                            <span class="about_me_block">{userInfo.information.about ? userInfo.information.about : ''}</span><img class="edit_about_me" data-action="editAboutMe" src={svg['pencil']} />
                                            <div class="user_grid_info-1">
                                                <div class="user_short_info_row">
                                                    <span>{lang.label.name}</span>
                                                    <div><img class="editblockinfo" data-action="editInfoStart" src={svg['pencil']} /><input id="fullname" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.fullname}/></div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{lang.label.speciality}</span>
                                                    <div><img class="editblockinfo" data-action="editInfoStart" src={svg['pencil']} /><input id="speciality" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.information.speciality}/></div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{lang.label.country}</span>
                                                    <div><input id="country" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.country.eng_name}/></div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{lang.label.city}</span>
                                                    <div><img class="editblockinfo" data-action="editInfoStart" src={svg['pencil']} /><input id="city" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.information.city}/></div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{lang.label.birthDate}</span>
                                                    <div><img class="editblockinfo" data-action="editInfoStart" src={svg['pencil']} /><input type="date" id="birthday" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.information.birthday ? getDateFormat(userInfo.information.birthday) : ''}/></div>
                                                </div>
                                                <div class="user_short_info_row">
                                                    <span>{lang.span.regDate}</span>
                                                    <div><input type="date" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={getDateFormat(userInfo.information.dateCreate)} /></div>
                                                </div>
                                            </div>
                                            <div class="about_user_section_points_container">
                                                <img class="about_user_section_points" data-action="aboutUserEditMenu" src={svg['points']}/>
                                                <div class="about_user_section_points_menu">
                                                    <div class="about_user_section_points_menu_item about_user_edit_handler" data-action="aboutMeEditShow">{lang.text.edit}</div>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                    dataElse={
                                        <div class="about_user_section_inner">
                                            <p>{lang.p.aboutMe}</p>
                                            <If
                                                data={userInfo.information.about}
                                                dataIf={
                                                    <span class="about_me_block">{userInfo.information.about}</span>
                                                }
                                            />
                                            <div class="user_grid_info-1">
                                                <If
                                                    data={userInfo.fullname}
                                                    dataIf={
                                                        <div class="user_short_info_row">
                                                            <span>{lang.label.name}</span>
                                                            <div><input id="fullname" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.fullname}/></div>
                                                        </div>
                                                    }
                                                />
                                                <If
                                                    data={userInfo.information.speciality}
                                                    dataIf={
                                                        <div class="user_short_info_row">
                                                            <span>{lang.label.speciality}</span>
                                                            <div><input id="speciality" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.information.speciality}/></div>
                                                        </div>
                                                    }
                                                />
                                                <If
                                                    data={userInfo.country.eng_name}
                                                    dataIf={
                                                        <div class="user_short_info_row">
                                                            <span>{lang.label.country}</span>
                                                            <div><input id="country" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.country.eng_name}/></div>
                                                        </div>
                                                    }
                                                />
                                                <If
                                                    data={userInfo.information.city}
                                                    dataIf={
                                                        <div class="user_short_info_row">
                                                            <span>{lang.label.city}</span>
                                                            <div><input id="city" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={userInfo.information.city}/></div>
                                                        </div>
                                                    }
                                                />
                                                <If
                                                    data={userInfo.information.birthday}
                                                    dataIf={
                                                        <div class="user_short_info_row">
                                                            <span>{lang.label.birthDate}</span>
                                                            <div><input type="date" id="birthDate" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={getDateFormat(userInfo.information.birthday)}/></div>
                                                        </div>
                                                    }
                                                />
                                                <If
                                                    data={userInfo.information.dateCreate}
                                                    dataIf={
                                                        <div class="user_short_info_row">
                                                            <span>{lang.span.regDate}</span>
                                                            <div><input type="date" class="userinfoinput" data-keyup="saveInfoByEnter" readonly value={getDateFormat(userInfo.information.dateCreate)} /></div>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    }
                                />
                        </div>
                    </div>
                </div>
                <div class="about_user_section-1 about_user_section-row_type-2">
                    <div class="about_user_section-row_type-3">
                        <div class="about_user_section">
                            <div class="about_user_section_inner interests_block">
                                <p>{lang.p.interests}</p>
                                <If
                                    data={myInfo._id == userInfo._id}
                                    dataIf={
                                        <div class="about_user_section_points_container">
                                            <img class="about_user_section_points" data-action="aboutUserEditMenu" src={svg['points']}/>
                                            <div class="about_user_section_points_menu">
                                                <div id="addNewInterests" data-action="newInterestShow" class="about_user_section_points_menu_item">{lang.button.add}</div>
                                                <If
                                                    data={userInfo.interest.length != 0}
                                                    dataIf={
                                                        <div class="about_user_section_points_menu_item about_user_edit_handler" data-action="aboutMeEditShow">{lang.button.edit}</div>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    }
                                />
                                {ListInterests}
                            </div>
                        </div>
                    </div>
                    <div class="about_user_section-row_type-3">
                        <div class="about_user_section">
                            <div class="about_user_section_inner work_block">
                                <p>{lang.p.work}</p>
                                <div class="work_and_education">   
                                </div>
                                <If
                                    data={myInfo._id == userInfo._id}
                                    dataIf={
                                        <div class="about_user_section_points_container">
                                            <img class="about_user_section_points" data-action="aboutUserEditMenu" src={svg['points']}/>
                                            <div class="about_user_section_points_menu">
                                                <div id="addNewWork" data-action="newWorkShow" class="about_user_section_points_menu_item about_user_add_handler">{lang.button.add}</div>
                                                <If
                                                    data={userInfo.work.length != 0}
                                                    dataIf={
                                                        <div class="about_user_section_points_menu_item about_user_edit_handler" data-action="aboutMeEditShow">{lang.button.edit}</div>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    }
                                />
                                {ListWorks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export { BlockUserProfileAbout };