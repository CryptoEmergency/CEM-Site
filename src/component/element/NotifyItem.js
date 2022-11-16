import {
    jsx,
    jsxFrag,
    Variable
} from '@betarost/cemjs';
import { fn } from '@src/functions/index.js';
import svg from '@assets/svg/index.js';

const NotifyItem = function ({ data, type }) {
    return (
        <div>
            {data.map((item, index) => {
                // console.log('=38e227=', item, index)
                let iconName
                if (item.notify.name == "reciveAwards") {
                    iconName = svg["badge/" + item.notify.icon.split(".")[0]]

                } else {
                    iconName = svg[item.notify.icon.split(".")[0]]
                }
                // console.log('=38e227=', item, index, iconName)
                return (
                    <div class="notifications_list_item">
                        {/* {{#if url}} */}
                        {
                            item.url
                                ?
                                <a onclick={fn.siteLink} href={`/${item.url}/show/${item.urlId}`}>
                                    <img class="notifications_open_questions" src={iconName} />
                                    <p>{Variable.lang.notify[item.notify.name]}</p>
                                    <span>
                                        {
                                            item.type
                                                ?
                                                `${Variable.lang.notify[item.notify.description + "-" + item.type]}`
                                                :
                                                Variable.lang.notify[item.notify.description]
                                        }
                                    </span>
                                </a>
                                :
                                <div>
                                    <img class="notifications_open_questions" src={iconName} />
                                    <p>{Variable.lang.notify[item.notify.name]}</p>
                                    <span>
                                        {
                                            item.type
                                                ?
                                                `${Variable.lang.notify[item.notify.description + "-" + item.type]}`
                                                :
                                                Variable.lang.notify[item.notify.description]
                                        }
                                    </span>
                                </div>
                        }

                        {
                            item.nickName
                                ?
                                <span class="notifyNickname">{Variable.lang.text.user}: <a data-action="link" href={`/user/${item.nickName}`}>{item.nickName}</a></span>
                                :
                                null
                        }

                        <span>{fn.getDateFormat(item.dateCreate, "now")}</span>
                    </div>
                )
            })}
        </div>
    )
}
export { NotifyItem };