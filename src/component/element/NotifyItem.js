import { jsx, jsxFrag, Variable } from '@betarost/cemjs';
import svg from '@assets/svg/index.js';
import images from '@assets/images/index.js';
import { If } from '@component/helpers/All.js';

const NotifyItem = function ({ data, type }) {
    return (
        <div>
            {data.map((item, index) => {
                console.log('=38e227=', item, index)
                let iconName
                if (item.notify.name == "reciveAwards") {
                    iconName = svg["badge/" + item.notify.icon.split(".")[0]]

                } else {
                    iconName = svg[item.notify.icon.split(".")[0]]
                }
                console.log('=38e227=', item, index, iconName)
                return (
                    <div class="notifications_list_item">
                        <img class="notifications_open_questions" src={iconName} />
                        <p>{Variable.lang.notify[item.notify.name]}</p>
                        <span><If
                            data={item.type}
                            dataIf={`${Variable.lang.notify[item.notify.description + "-" + item.type]}`}
                            dataElse={Variable.lang.notify[item.notify.description]}
                        />
                        </span>
                        <If
                            data={item.nickName}
                            dataIf={<span class="notifyNickname">{Variable.lang.text.user}: <a data-action="link" href={`/user/${item.nickName}`}>{item.nickName}</a></span>}
                        />
                        <span>{item.dateCreate}</span>
                    </div>
                )
            })}
        </div>
    )
}

export { NotifyItem };