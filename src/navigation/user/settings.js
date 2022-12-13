import {
    jsx,
    jsxFrag,
    init,
    Variable,
    initReload,
    sendApi
} from "@betarost/cemjs";
import { fn } from '@src/functions/index.js';
import svg from "@assets/svg/index.js";


import { BlockUserSettingsPage, BlockUserStartupPage} from '@component/blocks/index.js';
import { NotFound } from "@component/element/index.js";

import { Avatar } from '@component/element/Avatar.js';


const deleteUserFromBlacklist = async (user) => {
    let response = await fn.restApi.setUsers.blackList({ _id: user })
    //let response = await api({ type: "set", action: "setUsers", short: true, data })
    return response
}

const getUserBlackList = async (count = 0) => {
    let response = await fn.restApi.getUsers({ select: { blackList: 1 }, filter: { _id: Variable.myInfo._id } })
    //api({ type: "get", action: "getUsers", short: true, select: {blackList: 1}, filter: {_id: Variable.myInfo._id} })
    return response
}

const start = function (data, ID) {
    let [Static] = fn.GetParams({ data, ID })

    let settingsPage
    let blackList
    let startUP

    let StartUPData
    let Ticker
    let Title
    let BlNetwork
    let TotalTOken
    let Evaluation
    let MarketCap
    let Ido
    let Price
    let Allocation
    let Logo
    let WebSite
    let Socials
    let ShortDesc
    let Desc
    let RoadMap
    let Team


    Static.StartUPData = {}
    Static.StartUPData.Title = ""
    Static.StartUPData.Ticker = ""
    Static.StartUPData.BlNetwork = ""
    Static.StartUPData.TotalTOken = ""
    Static.StartUPData.Evaluation = ""
    Static.StartUPData.MarketCap = ""
    Static.StartUPData.Ido = ""
    Static.StartUPData.Price = ""
    Static.StartUPData.Allocation = ""
    Static.StartUPData.Logo = ""
    Static.StartUPData.WebSite = ""
    Static.StartUPData.Socials = {network:""}
    Static.StartUPData.ShortDesc = ""
    Static.StartUPData.Desc = ""
    Static.StartUPData.RoadMap = ""
    Static.StartUPData.Team = ""

      

    let activeGroup, elSocial, elCategory, elStartup;

    Variable.Static.HeaderShow = true
    Variable.Static.FooterShow = true
    Variable.Static.showUserMenu = false


    const userBlackList = function () {
        let BlackListBlock
        if (blackList && blackList.list_records && blackList.list_records.length && blackList.list_records[0].blackList && blackList.list_records[0].blackList.length) {
            BlackListBlock = Object.keys(blackList.list_records[0].blackList).map(function (key) {
                return (
                    <li style="justify-content: space-between" class="settings_blackuser friend">
                        <Avatar
                            author={blackList.list_records[0].blackList[key]}
                        // nickName={item.author.nickname} 
                        // dateShow={true}
                        />
                        <div onclick={deleteFromBlacklist} data-id={blackList.list_records[0].blackList[key]._id} class="settings_deleteuser">{Variable.lang.text.deleteFromBlacklist}</div>
                    </li>
                )
            })
        } else {
            BlackListBlock = NotFound()
        }

        return (
            <ul class="settings_blacklist">
                {BlackListBlock}
            </ul>
        )
    }

 const StartUpMenu= function(data)
 {


   

let start
let menuItem =[{settingsPage:"startUP",itemMenu:"мой стартап",item:true},
{settingsPage:"editstartUP",itemMenu:"Редактировать",item:true},
{settingsPage:"createstartUP",itemMenu:"создать стартап",item:false}]

start = menuItem.map(function (key) {

    if(key.item === data){
       
       return( <div
        class={[
            "settings_list_subcategory",
            settingsPage == key.settingsPage ? "settings_list_subcategory--active" : null
        ]}
        onclick={() => {
         
            if (settingsPage == key.settingsPage) {
         
                Static.settingsPage = key.settingsPage

            }
            settingsPage = key.settingsPage
            initReload()
        }}
    >
        <p>{key.itemMenu}</p>
    </div>)
    }
 
})
    return (start)
 }

 
    


    const deleteFromBlacklist = async function () {
        await deleteUserFromBlacklist(this.dataset.id)
        blackList = await getUserBlackList()
        initReload()
    }


    init(
        async () => {
            blackList = await getUserBlackList()
            
            Static.startUP = false
            if(!Static.startUP)
            {
                Static.StartUPData.settings = "createstartUP"
            }
         
            settingsPage = "security";
    
        },
        () => {
            return (
                <div class={[
                    "settings_container",
                    Variable.Static.HeaderShow ? "c-main__body" : "c-main__body--noheader",
                ]}
                >
                    {/* <h4 class="settings_title">{Variable.lang.text.socialNetwork}</h4> */}
                    <div class="settings">
                        <div class="settings_list_block">
                            <div class="settings_list">
                                <div
                                    class={[
                                        'settings_list_item',
                                        activeGroup == Static.elSocial ? 'settings_list_item_active' : null
                                    ]}
                                    data-active="true"
                                    Element={($el) => {
                                        Static.elSocial = $el
                                    }}
                                >
                                    <p
                                        class="settings_list_title"
                                        onClick={() => {
                                            activeGroup = Static.elSocial
                                            // console.log('=034949=',activeGroup)
                                            if (Static.elSocial.dataset.active == "true") {
                                                console.log('=c15202=', "not active")
                                                Static.elSocial.dataset.active = false;
                                                Static.elSocial.classList.remove("settings_list_item_active")
                                            } else {
                                                console.log('=9ca0c2=', "active")
                                                Static.elSocial.dataset.active = true;
                                                Static.elSocial.classList.add("settings_list_item_active")
                                            }
                                        }}
                                    >
                                        {Variable.lang.text.socialNetwork}
                                        {/* <img style="padding: 3px 0;position: absolute; top:23px;right:20px;" src={svg['settings_active_category_line']} /> */}
                                    </p>
                                    <div
                                        class={[
                                            "settings_list_subcategory",
                                            settingsPage == "security" ? "settings_list_subcategory--active" : null
                                        ]}
                                        onclick={() => {
                                            if (settingsPage == "security") {
                                                return
                                            }
                                            settingsPage = "security"
                                            initReload()
                                        }}
                                    >
                                        <p>{Variable.lang.text.security}</p>
                                    </div>
                                    <div
                                        class={[
                                            "settings_list_subcategory",
                                            settingsPage == "blackList" ? "settings_list_subcategory--active" : null
                                        ]}
                                        onClick={() => {
                                            if (settingsPage == "blackList") {
                                                return
                                            }
                                            settingsPage = "blackList"
                                            initReload()
                                        }}
                                    >
                                        <p>{Variable.lang.text.blackList}</p>
                                    </div>
                                    <div class="settings_gradient_line"></div>
                                </div>
                                <div
                                    class={[
                                        'settings_list_item',
                                        activeGroup == Static.elCategory ? '' : null
                                    ]}
                                    data-active="false"
                                    Element={($el) => {
                                        Static.elCategory = $el
                                    }}
                                >
                                    <p
                                        class="settings_list_title"
                                        onClick={() => {
                                            activeGroup = Static.elCategory
                                            // console.log('=f1cab4=',activeGroup)
                                            if (Static.elCategory.dataset.active == "true") {
                                                console.log('=c15202=', "not active 2")
                                                Static.elCategory.dataset.active = false;
                                                Static.elCategory.classList.remove("settings_list_item_active")
                                            } else {
                                                console.log('=9ca0c2=', "active 2")
                                                Static.elCategory.dataset.active = true;
                                                Static.elCategory.classList.add("settings_list_item_active")
                                            }
                                        }}
                                    >
                                        Еще категория
                                    </p>
                                    
                                    <div class="settings_gradient_line"></div>
                                </div>
                                {/*<div
                                    class={[
                                        'settings_list_item',
                                        activeGroup == Static.elStartup ? '' : null
                                    ]}
                                    data-active="false"
                                    Element={($el) => {
                                        Static.elStartup = $el
                                    }}
                                >
                                    <p
                                        class="settings_list_title"
                                        onClick={() => {
                                            activeGroup = Static.elStartup
                                            // console.log('=f1cab4=',activeGroup)
                                            if (Static.elStartup.dataset.active == "true") {
                                                console.log('=c15202=', "not active 2")
                                                Static.elStartup.dataset.active = false;
                                                Static.elStartup.classList.remove("settings_list_item_active")
                                            } else {
                                                console.log('=9ca0c2=', "active 2")
                                                Static.elStartup.dataset.active = true;
                                                Static.elStartup.classList.add("settings_list_item_active")
                                            }
                                        }}
                                    >
                                        Стартап
                                    </p>
                                 
                                    
                                    {StartUpMenu(Static.startUP)}
                                  
                      
                                    <div class="settings_gradient_line"></div>
                                    </div>*/}
                            </div>
                        </div>

                        <div class="settings_body">
                            <BlockUserSettingsPage.security
                                settingsPage={settingsPage}
                                
                            />


                            <div style={settingsPage == 'blackList' ? '' : 'display: none;'} data-type="blackList" class="settings_body_item">
                                <div class="setting_body_item_chapter">
                                    {userBlackList()}
                                </div>
                            </div>
                              {/*         
                            <div style={settingsPage == 'startUP' || settingsPage == 'editstartUP' || settingsPage == 'createstartUP' ? '' : 'display: none;'} data-type="blackList" class="settings_body_item">
                                <div class="setting_body_item_chapter">
                                <BlockUserStartupPage  settingsPage={settingsPage} Static={Static} />
                                </div>
                                    </div>*/} 
                           

                      


                        </div>
                    </div>
                </div>
            )
        }, ID
    )
};

export default start;