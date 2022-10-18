import { jsx, jsxFrag, Helpers, Variable,initReload } from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If } from "@component/helpers/All.js";

const AnswerAdditionallyToggle = function ({ item,typeApi, type, commentId, mainId }) {
  return (
    <div
      //    class="comment_icon_type-1 answer_additionally_toggle {{#if data.userInfo.auth}}{{else}}comment_inactive {{/if}}" data-action="answerAdditionallyToggle"
      class={[
        "answer_additionally_toggle",
        "comment_icon_type-1",
        !Variable.auth
          ? //  || Variable.Static.answerAdditionally
            "comment_inactive"
          : null,
      ]}
      onclick={(e) => {
        // let element = e.target.localName === "img" ? e.target.parentElement : e.target;
        if (
          // element.className.includes("comment_inactive")
          !Variable.auth
        ) {
          return;
        } else {
            console.log('=open=')
          Variable.Static.answerAdditionally = item._id;
          Variable.Static.activeInputId = "";
          Variable.Static.EditInput = "";
          initReload();
        }
      }}
    >
      <img class="answer_additionally_toggle_img" src={svg["points"]} />
      <If
        data={Variable.Static.answerAdditionally === item._id}
        dataIf={
          <div class=" answer_additionally_container">
            <div class="answer_additionally">
              <If
                data={item.author._id === Variable.myInfo._id}
                dataIf={
                  <div>
                    <If
                      data={type.edit}
                      dataIf={
                        <div class="answer_additionally_item edit"
                        onclick = {
                          (e) => {
                            e.stopPropagation()
                            Variable.Static.EditInput = item._id;
                            Variable.Static.answerAdditionally = "";
                            Variable.Static.activeInputId = "";
                            
                            initReload();
                          }
                        }
                        >
                          {Variable.lang.button.edit}
                        </div>
                      }
                    />
                    <If
                      data={type.delete}
                      dataIf={
                        <div class="answer_additionally_item delete"
                        onclick = {()=> {
                            Variable.SetModals({
                                name: "ModalDelComment",
                                data: { id: item._id,typeSet: typeApi ,
                                  mainId: mainId,
                                  mainCom: !commentId? true : false,  
                                    },
                              }, true);
                        }}
                        >
                          {Variable.lang.select.delete}
                        </div>
                      }
                    />
                  </div>
                }
                dataElse={
                  <div>
                    <If
                      data={type.complainAnswer || type.complainPost}
                      dataIf={
                        <div class="answer_additionally_item complain c-text--error"
                        onclick = {()=> {
                           
                            Variable.SetModals({
                                name: "ModalComplainComment",
                                data: { id: item._id,typeSet: typeApi,
                                  mainId: mainId,
                                     mainCom: !commentId? true : false
                                     },
                              }, true);
                        }}
                        >
                          {type.complainPost && Variable.lang.select.complainPost}
                          {type.complainAnswer && Variable.lang.select.complainAnswer}
                        </div>
                      }
                    />
                    <If
                      data={type.complainUser}
                      dataIf={
                        <div class="answer_additionally_item complain c-text--error">
                          {Variable.lang.select.complainUser}
                        </div>
                      }
                    />
                    <If
                      data={type.blackList}
                      dataIf={
                        <div class="answer_additionally_item block c-text--error"
                        onclick={(e) => {
                            Variable.SetModals({
                              name: "ModalBlackList",
                              data: { id: item.author._id },
                            }, true);
                          }}
                        >
                          {Variable.lang.select.blackList}
                        </div>
                      }
                    />
                  </div>
                }
              />
              <If
                data={Variable.auth && Variable.myInfo.status.role}
                dataIf={
                  <div
                    style="color: #32DE80"
                    class="answer_additionally_item delete"
                    onclick = {()=> {
                        Variable.Static.answerAdditionally = "";
                        Variable.SetModals({
                            name: "ModalDelComment",
                            data: { id: item._id,typeSet: "doRole" , 
                            mainId: mainId,
                            mainCom: !commentId? true : false, 
                            roleAction:typeApi },
                          }, true);
                    }}
                  >
                    {Variable.lang.select.delete}
                  </div>
                }
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export { AnswerAdditionallyToggle };
