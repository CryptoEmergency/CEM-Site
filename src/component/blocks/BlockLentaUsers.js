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

import images from "@assets/images/index.js";
import { getDateFormat } from "@src/functions.js";
import { getPostsItemInShow } from "@src/apiFunctions.js";
import { AudioPlayer } from "@component/element/AudioPlayer.js";
import { Slider } from "@component/element/Slider.js";
import {
  Avatar,
  Likes,
  AnswerAdditionallyToggle,
} from "@component/element/index.js";
import { If, Map } from "@component/helpers/All.js";

const BlockLentaUsers = function ({ item, numIndex, elem, total, totalFound }) {
  let mainId = item._id;
  console.log('=item=', item)
  return (
    <div
      class="user_news_item"
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
      onClick={async () => {
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
        // Variable.SetModals({
        //   name: "ModalFullSize",
        //   data: { item, type: "post" },
        // });
      }}
    >
      <div class="main_comment">
        <Avatar author={item.author} nickName={item.author.nickname} />
        <div class="comment_icons">
          <AnswerAdditionallyToggle
            item={item}
            typeApi={"setPost"}
            type={{
              delete: true,
              edit: true,
              complainPost: true,
              complainUser: true,
              blackList: true,
              subscription: true,
              share: true,
            }}
            mainId={mainId}
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
          <span class="c-date">
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
            <Likes item={item} typeGet="getPost" typeSet="setPost" />
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
  );
};

export { BlockLentaUsers };
