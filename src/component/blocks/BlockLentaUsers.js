import {
  jsx,
  jsxFrag,
  Variable,
  getVariable,
  getStorage,
  getValue,
  stringToHtml,
  Helpers,
  sendApi,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { LentaMedia } from "@component/element/index.js";
import { BlockComment } from "@component/blocks/index.js";
import images from "@assets/images/index.js";
import { getDateFormat } from "@src/functions.js";
import { getPostsItemInShow } from "@src/apiFunctions.js";
import { AudioPlayer } from "@component/element/AudioPlayer.js";
import {
  Avatar,
  Likes,
  AnswerAdditionallyToggleNew,
  CommentInput,
  ItemsMenu
} from "@component/element/index.js";
import { If } from "@component/helpers/All.js";

const BlockLentaUsers = function ({ item, numIndex, elem, total, totalFound, type }) {
  let mainId = item._id;
  if (total === undefined && type !== "post") {
    return <></>;
  }
  let getItem = ""
  console.log(total)
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
          ElemVisible={total < totalFound && numIndex == (total - 3) ?
            async () => {
              console.log('=0c6881=', "Load more")
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
            // console.log('=item1111111111111111=',item)
            if (total !== undefined && e.target.dataset.name === undefined)
              Variable.SetModals({
                name: "ModalFullSize",
                data: {
                  item, type: "post", numIndex: numIndex,
                  elem: elem
                },
              });
          }}
        >
          <div class="main_comment">
            <Avatar author={item.author} nickName={item.author.nickname} />
            <div class="comment_icons">
              {() => {
                console.log('=9a0159=', item)
              }}
              <ItemsMenu
                items={
                  [
                    {
                      text: Variable.lang.select.share,
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
                      text: Variable.lang.select.share,
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
                    }
                  ]
                }
              />
              <AnswerAdditionallyToggleNew
                item={item}
                typeApi={"setPost"}
                type={{
                  share: true,
                  edit: true,
                  delete: true,
                  subscription: true,
                  complainPost: true,
                  complainUser: true,
                  blackList: true,
                }}
                mainId={mainId}
                callBack={getItem}
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
                <Likes item={item} typeGet="getPost" typeSet="setPost" callBack={getItem} />
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
              if (total !== undefined && e.target.dataset.name === undefined)
                Variable.SetModals({
                  name: "ModalFullSize",
                  data: {
                    item, type: "post", numIndex: numIndex,
                    elem: elem
                  },
                });
            }}
          >
            <div class="main_comment">
              <Avatar author={item.author} nickName={item.author.nickname} />
              <div class="comment_icons">
                <AnswerAdditionallyToggleNew
                  item={item}
                  typeApi={"setPost"}
                  type={{
                    share: true,
                    edit: true,
                    delete: true,
                    subscription: true,
                    complainPost: true,
                    complainUser: true,
                    blackList: true,
                  }}
                  mainId={mainId}
                  callBack={getItem}
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
                  <Likes item={item} typeGet="getPost" typeSet="setPost" callBack={getItem} />
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

            <If
              data={
                Variable.Static.activeInputId.length === 0 &&
                Variable.Static.EditInput.length === 0
              }
              dataIf={
                <CommentInput item={item} typeSet="setPost" callBack={getItem} />
              }
            />

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
                    {
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
                    }

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
