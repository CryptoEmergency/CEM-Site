import {
    jsx,
    jsxFrag,
    Variable,
    CEM
} from '@betarost/cemserver/cem.js';

const { images, svg, fn } = CEM

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
                if (item.url) {
                    return (
                        <div class="notifications_list_item"
                            data-href={`/${item.url}/show/${item.urlId}`}
                            onclick={(e) => {

                                fn.siteLinkModal(e, { title: Variable.lang.notify[item.notify.name], style: 'background: #1D2029;' })
                                fn.modals.close(0)
                            }}
                        >


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


                            {
                                item.nickName
                                    ?
                                    <span class="notifyNickname">{Variable.lang.text.user}: <a
                                        href={`/user/${item.nickName}`}
                                        onclick={(e) => {
                                            fn.siteLinkModal(e, { title: item.nickName, style: 'background: #1D2029;', items: fn.itemsMenu.userProfile(item) })
                                            fn.modals.close(0)
                                        }}
                                    >{item.nickName}</a></span>
                                    :
                                    null
                            }

                            <span>{fn.getDateFormat(item.dateCreate, "now")}</span>
                        </div>
                    )
                }
                return (
                    <div class="notifications_list_item">

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


                        {
                            item.nickName
                                ?
                                <span class="notifyNickname">{Variable.lang.text.user}: <a
                                    href={`/user/${item.nickName}`}
                                    onclick={(e) => {
                                        fn.siteLinkModal(e, { title: item.nickName, style: 'background: #1D2029;' })
                                        fn.modals.close(0)
                                    }}
                                >{item.nickName}</a></span>
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