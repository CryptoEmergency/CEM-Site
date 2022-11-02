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
  import { Slider } from "@component/element/Slider.js";
  import {
    Avatar,
    Likes,
    AnswerAdditionallyToggleNew,
    CommentInput
  } from "@component/element/index.js";
  import { If } from "@component/helpers/All.js";

  const BlockUserForLenta = function({item}){
   
 let id_user = item._id
return(

<div class="main_comment">
{/**
 вывод аватара
 */}
<Avatar author={item.author} nickName={item.author.nickname} />
              
{/**
 вывод медийки
*/}
    <div class="comment_body">
                <LentaMedia
                  items={item.media}
                  numIndex={0}
                  elem={item}
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
</div>

)
  }

  export { BlockUserForLenta };