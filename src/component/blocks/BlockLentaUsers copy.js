import {
  jsx,
  jsxFrag,
  Variable,
  stringToHtml,
  Helpers,
  sendApi,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { api } from '@src/apiFunctions.js'
import { LentaMedia } from "@component/element/index.js";
import images from "@assets/images/index.js";
import { getDateFormat } from "@src/functions.js";
import {
  Avatar,
  ItemsMenu
} from "@component/element/index.js";
import { If } from "@component/helpers/All.js";

const BlockLentaUsers = function ({ item, numIndex, elem, total, totalFound, type }) {

  let getItem = ""

  if (total === undefined) {
    getItem = async function () {
      let tmp = await sendApi.send({ action: "getPost", short: true, filter: { _id: item._id }, limit: 1 });
      if (tmp.list_records.length) {
        Variable.Modals.map((item, index) => {
          if (item.name == "ModalFullSize") {
            item.data.item = tmp.list_records[0]
          }
        })
        initReload("modals")
      }
    }
  }

  return (

    <If
      data={total !== undefined}
      dataIf={
        <div
          class="c-fullnews__item user_news_item"
          data-href={"/lenta-users/show/" + item._id}
          ElemVisible={total < totalFound && numIndex == (total - 3) ?
            async () => {
              // console.log('=0c6881=', "Load more")
              let tmp = await sendApi.send({
                action: "getPost",
                short: true,
                limit: 15,
                offset: total,
                filter: Helpers.getFilterLenta(
                  {},
                  Variable.Static.lentaPage
                ),
              });

              Variable[`PageLenta${Variable.Static.lentaPage}`].list_records.push(...tmp.list_records)
              initReload()
            }
            :
            false
          }

          onclick={(e) => { Helpers.siteLinkModal(e, { title: Variable.lang.h.posts_user, item }) }}

        >
          <div class="main_comment">
            <Avatar author={item.author} nickName={item.author.nickname} />
            <div class="comment_icons">

              <ItemsMenu
                author={item.author}
                items={
                  [
                    {
                      text: Variable.lang.select.share,
                      type: "share",
                      onclick: async () => {
                        try {
                          if (navigator.share) {
                            await navigator.share({
                              url: window.location.origin + "/lenta-users/show/" + item._id,
                            });
                          }
                        } catch (err) {
                          // Вывести ошибку
                          console.error("Share", err)
                        }
                      }
                    },
                    {
                      text: item.subscribe
                        ? Variable.lang.button.unsubscribe
                        : Variable.lang.button.subscribe,
                      type: "subscription",
                      onlyAuth: true,
                      onclick: async () => {
                        const response = await api({ type: "set", action: "setUsers", data: { value: { subscribed: item.author._id } } })
                        // console.log('=b959ac=', response)
                        if (response.status === "ok") {
                          if (response.result) {
                            item.subscribe = response.result.subscribe
                            initReload();
                          }
                        } else {
                          Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                        }
                      }
                    },
                    {
                      text: Variable.lang.select.complainPost,
                      type: "complainItem",
                      onlyAuth: true,
                      color: "red",
                      onclick: async () => {
                        // Переработать модалку
                        Variable.SetModals(
                          {
                            name: "ModalComplainComment",
                            data: {
                              id: data.item._id,
                              typeSet: data.typeApi,
                              mainId: data.mainId,
                              mainCom: !data.commentId ? true : false,
                            },
                          }, true
                        );
                      }
                    },
                    {
                      text: Variable.lang.select.complainUser,
                      type: "complainUser",
                      onlyAuth: true,
                      color: "red",
                      onclick: async () => {
                        // Переработать модалку
                        Variable.SetModals(
                          {
                            name: "ModalComplainComment",
                            data: {
                              id: data.item._id,
                              typeSet: data.typeApi,
                              mainId: data.mainId,
                              mainCom: !data.commentId ? true : false,
                            },
                          }, true
                        );
                      }
                    },
                    {
                      text: Variable.lang.select.blackList,
                      type: "blackList",
                      onlyAuth: true,
                      color: "red",
                      onclick: async () => {
                        // Переработать модалку
                        Variable.SetModals(
                          {
                            name: "ModalBlackList",
                            data: { id: item.author._id, type: "перебрать" },
                          }, true
                        );
                      }
                    },
                    {
                      text: Variable.lang.button.edit,
                      type: "edit",
                      onclick: async () => {
                        // Переработать модалку
                        // Variable.SetModals(
                        //   {
                        //     name: "ModalBlackList",
                        //     data: { id: item.author._id, type: "перебрать" },
                        //   }, true
                        // );
                      }
                    },
                    {
                      text: Variable.lang.select.delete,
                      type: "delete",
                      color: "red",
                      onclick: async () => {
                        // Переработать модалку
                        // Variable.SetModals(
                        //   {
                        //     name: "ModalDelComment",
                        //     data: {
                        //       id: data.item._id,
                        //       typeSet: data.typeApi,
                        //       mainId: data.mainId,
                        //       mainCom: !data.commentId ? true : false,
                        //       callBack: data.callBack,
                        //     },
                        //   }, true
                        // );
                      }
                    },
                    {
                      text: Variable.lang.select.delete,
                      type: "deleteRole",
                      color: "red",
                      onclick: async () => {
                        // Переработать модалку
                        // Variable.SetModals(
                        //   {
                        //     name: "ModalDelComment",
                        //     data: {
                        //       id: data.item._id,
                        //       typeSet: data.typeApi,
                        //       mainId: data.mainId,
                        //       mainCom: !data.commentId ? true : false,
                        //       callBack: data.callBack,
                        //     },
                        //   }, true
                        // );
                      }
                    },
                  ]
                }
              />
            </div>
            <div class="comment_body">
              <LentaMedia
                items={item.media}
                numIndex={numIndex}
                elem={elem}
                path={"/assets/upload/posts/"}
              />
              {/* {item.media.length > 0 && returnImgOrVideo(item)} */}

              <div class="post_audio_container">
                {/* {item.media.find((i) => i.type === "audio") !== undefined &&
                item.media.length > 0 ? (
                  item.text ? (
                    <div>text</div>
                  ) :
                  {{>audioPlayer src=name path="/assets/upload/posts/"}}
                  item.media.length == 1 ? (
                    <div class="user_post_text_background">
                      <AudioPlayer item = {item} />
                      {item.media
                        .filter((item) => item.type === "audio")
                        .map((item) => {
                          return <AudioPlayer item={item} />;
                        })}
                    </div>
                  ) : (
                    <h1>mul Audio</h1>
                  )
                ) : (
                  {{>audioPlayer src=name path="/assets/upload/posts/"}}

                  ""
                )} */}
              </div>

              {item.media.length > 0 ? (
                <span class="comment_text">
                  {/* {parseTextforJsx(item.text).map((item)=>{
                    return item
                  })} */}
                  {stringToHtml(Helpers.sanitizeHtml(item.text))}
                  {/* {stringToHtml(item.text)} */}
                </span>
              ) : item.text.length < 100 ? (
                <div class="user_post_text_background">
                  <span class="comment_text">
                    {stringToHtml(Helpers.sanitizeHtml(item.text))}
                    {/* {stringToHtml(item.text)} */}
                    {/* {parseTextforJsx(item.text).map((item)=>{
                    return item
                  })} */}
                  </span>
                </div>
              ) : (
                <span class="comment_text 77">
                  {stringToHtml(Helpers.sanitizeHtml(item.text))}
                  {/* {parseTextforJsx(item.text).map((item)=>{
                    return item
                  })} */}
                  {/* {stringToHtml(item.text)} */}
                </span>
              )}
            </div>

            <div class="user_post_statistic">
              <span class="c-date" data-id={item._id}>
                {item.updateTime
                  ? `${Variable.lang.text.update} ${getDateFormat(
                    item.updateTime,
                    "lenta"
                  )}`
                  : getDateFormat(item.showDate, "lenta")}
              </span>
              <div class="user_post_statistic_item">
                <div class="user_post_statistic_image">
                  <img src={svg["question_answers"]} />{" "}
                  <span>{item.statistic.comments ? item.statistic.comments : "0"} </span>
                </div>
                <div class="user_post_statistic_image">
                  <img src={svg["question_views"]} /> {item.statistic.view ? item.statistic.view : "0"}
                </div>
              </div>
              <div class="user_post_statistic_item">
                {/* <Likes item={item} typeGet="getPost" typeSet="setPost" callBack={getItem} /> */}
              </div>
            </div>
          </div>

          <div
            data-action="userNewsShowFullPost"
            class="show_all_post_container"
            style="display: none;"
          >
            <div class="show_all_post_block"> </div>
            <span class="show_all_post_text">{Variable.lang.button.see_all}</span>
          </div>

        </div>
      }
      dataElse={
        <div class="c-fullnews__itemwrapp">
          <div
            class="c-fullnews__item user_news_item"
            ElemVisible={total < totalFound && numIndex == (total - 3) ?
              async () => {
                // console.log('=0c6881=', "Load more")
                let tmp = await sendApi.send({
                  action: "getPost",
                  short: true,
                  limit: 15,
                  offset: total,
                  filter: Helpers.getFilterLenta(
                    {},
                    Variable.Static.lentaPage
                  ),
                });

                Variable[`PageLenta${Variable.Static.lentaPage}`].list_records.push(...tmp.list_records)
                initReload()
              }
              :
              false
            }
            onClick={async (e) => {
              e.stopPropagation();

              // if (true) {
              //   Variable.SetModals({
              //     name: "ModalFullSize",
              //     data: { item: item, type: "post" },
              //   });
              // }

              // let post;
              // post = await getPostsItemInShow(item._id);
              // post = post.list_records[0];
              // if (total !== undefined && e.target.dataset.name === undefined)
              //   Variable.SetModals({
              //     name: "ModalFullSize",
              //     data: {
              //       item, type: "post", numIndex: numIndex,
              //       elem: elem
              //     },
              //   });
            }}
          >
            <div class="main_comment">
              <Avatar author={item.author} nickName={item.author.nickname} />
              <div class="comment_icons">
                <ItemsMenu
                  author={item.author}
                  items={
                    [
                      {
                        text: Variable.lang.select.share,
                        type: "share",
                        onclick: async () => {
                          try {
                            if (navigator.share) {
                              await navigator.share({
                                url: window.location.origin + "/lenta-users/show/" + item._id,
                              });
                            }
                          } catch (err) {
                            // Вывести ошибку
                            console.error("Share", err)
                          }
                        }
                      },
                      {
                        text: item.subscribe
                          ? Variable.lang.button.unsubscribe
                          : Variable.lang.button.subscribe,
                        type: "subscription",
                        onlyAuth: true,
                        onclick: async () => {
                          const response = await api({ type: "set", action: "setUsers", data: { value: { subscribed: item.author._id } } })
                          // console.log('=b959ac=', response)
                          if (response.status === "ok") {
                            if (response.result) {
                              item.subscribe = response.result.subscribe
                              initReload();
                            }
                          } else {
                            Variable.SetModals({ name: "ModalAlarm", data: { icon: "alarm_icon", text: Variable.lang.error_div[response.error], }, }, true);
                          }
                        }
                      },
                      {
                        text: Variable.lang.select.complainPost,
                        type: "complainItem",
                        onlyAuth: true,
                        color: "red",
                        onclick: async () => {
                          // Переработать модалку
                          Variable.SetModals(
                            {
                              name: "ModalComplainComment",
                              data: {
                                id: data.item._id,
                                typeSet: data.typeApi,
                                mainId: data.mainId,
                                mainCom: !data.commentId ? true : false,
                              },
                            }, true
                          );
                        }
                      },
                      {
                        text: Variable.lang.select.complainUser,
                        type: "complainUser",
                        onlyAuth: true,
                        color: "red",
                        onclick: async () => {
                          // Переработать модалку
                          Variable.SetModals(
                            {
                              name: "ModalComplainComment",
                              data: {
                                id: data.item._id,
                                typeSet: data.typeApi,
                                mainId: data.mainId,
                                mainCom: !data.commentId ? true : false,
                              },
                            }, true
                          );
                        }
                      },
                      {
                        text: Variable.lang.select.blackList,
                        type: "blackList",
                        onlyAuth: true,
                        color: "red",
                        onclick: async () => {
                          // Переработать модалку
                          Variable.SetModals(
                            {
                              name: "ModalBlackList",
                              data: { id: item.author._id, type: "перебрать" },
                            }, true
                          );
                        }
                      },
                      {
                        text: Variable.lang.button.edit,
                        type: "edit",
                        onclick: async () => {
                          // Переработать модалку
                          // Variable.SetModals(
                          //   {
                          //     name: "ModalBlackList",
                          //     data: { id: item.author._id, type: "перебрать" },
                          //   }, true
                          // );
                        }
                      },
                      {
                        text: Variable.lang.select.delete,
                        type: "delete",
                        color: "red",
                        onclick: async () => {
                          // Переработать модалку
                          // Variable.SetModals(
                          //   {
                          //     name: "ModalDelComment",
                          //     data: {
                          //       id: data.item._id,
                          //       typeSet: data.typeApi,
                          //       mainId: data.mainId,
                          //       mainCom: !data.commentId ? true : false,
                          //       callBack: data.callBack,
                          //     },
                          //   }, true
                          // );
                        }
                      },
                      {
                        text: Variable.lang.select.delete,
                        type: "deleteRole",
                        color: "red",
                        onclick: async () => {
                          // Переработать модалку
                          // Variable.SetModals(
                          //   {
                          //     name: "ModalDelComment",
                          //     data: {
                          //       id: data.item._id,
                          //       typeSet: data.typeApi,
                          //       mainId: data.mainId,
                          //       mainCom: !data.commentId ? true : false,
                          //       callBack: data.callBack,
                          //     },
                          //   }, true
                          // );
                        }
                      },
                    ]
                  }
                />
              </div>
              <div class="comment_body">
                <LentaMedia
                  items={item.media}
                  numIndex={numIndex}
                  elem={elem}
                  path={"/assets/upload/posts/"}
                />
                {/* {item.media.length > 0 && returnImgOrVideo(item)} */}

                <div class="post_audio_container">
                  {/* {item.media.find((i) => i.type === "audio") !== undefined &&
              item.media.length > 0 ? (
                item.text ? (
                  <div>text</div>
                ) :
                {{>audioPlayer src=name path="/assets/upload/posts/"}}
                item.media.length == 1 ? (
                  <div class="user_post_text_background">
                    <AudioPlayer item = {item} />
                    {item.media
                      .filter((item) => item.type === "audio")
                      .map((item) => {
                        return <AudioPlayer item={item} />;
                      })}
                  </div>
                ) : (
                  <h1>mul Audio</h1>
                )
              ) : (
                {{>audioPlayer src=name path="/assets/upload/posts/"}}

                ""
              )} */}
                </div>

                {item.media.length > 0 ? (
                  <span class="comment_text">
                    {/* {parseTextforJsx(item.text).map((item)=>{
                  return item
                })} */}
                    {stringToHtml(Helpers.sanitizeHtml(item.text))}
                    {/* {stringToHtml(item.text)} */}
                  </span>
                ) : item.text.length < 100 ? (
                  <div class="user_post_text_background">
                    <span class="comment_text">
                      {stringToHtml(Helpers.sanitizeHtml(item.text))}
                      {/* {stringToHtml(item.text)} */}
                      {/* {parseTextforJsx(item.text).map((item)=>{
                  return item
                })} */}
                    </span>
                  </div>
                ) : (
                  <span class="comment_text">
                    {stringToHtml(Helpers.sanitizeHtml(item.text))}
                    {/* {parseTextforJsx(item.text).map((item)=>{
                  return item
                })} */}
                    {/* {stringToHtml(item.text)} */}
                  </span>
                )}
              </div>

              <div class="user_post_statistic">
                <span class="c-date" data-id={item._id}>
                  {item.updateTime
                    ? `${Variable.lang.text.update} ${getDateFormat(
                      item.updateTime,
                      "lenta"
                    )}`
                    : getDateFormat(item.showDate, "lenta")}
                </span>
                <div class="user_post_statistic_item">
                  <div class="user_post_statistic_image">
                    <img src={svg["question_answers"]} />{" "}
                    <span>{item.statistic.comments} </span>
                  </div>
                  <div class="user_post_statistic_image">
                    <img src={svg["question_views"]} /> {item.statistic.view}
                  </div>
                </div>
                <div class="user_post_statistic_item">
                  {/* <Likes item={item} typeGet="getPost" typeSet="setPost" callBack={getItem} /> */}
                </div>
              </div>
            </div>

            <div
              data-action="userNewsShowFullPost"
              class="show_all_post_container"
              style="display: none;"
            >
              <div class="show_all_post_block"> </div>
              <span class="show_all_post_text">{Variable.lang.button.see_all}</span>
            </div>
          </div>

          <div class="news_page_comments">
            <h2>{Variable.lang.h.modal_comment}</h2>


            {/* <CommentInput item={item} typeSet="setPost" callBack={getItem} /> */}



            <If
              data={item.comments.length > 0}
              dataIf={
                <div data-type="news_comment" class="post_comments">
                  <div
                    style={!item.comments && "display: none;"}
                    class="user_news_item"
                  >
                    {/* <BlockComments
                                    comments={item.comments}
                                /> */}
                    {/* <QuestionAnswerItemComment item = {item}  mainId={mainId} /> */}
                    {/* {
                      item.comments.map((item, index) => {
                        return (
                          <BlockComment
                            item={item}
                            index={index}
                            mainId={mainId}
                            callBack={getItem}
                            typeSet="setPost"
                          />
                        );
                      })
                    } */}

                  </div>
                </div>
              }
            />
          </div>
        </div>
      }
    />
  );
};

export { BlockLentaUsers };
