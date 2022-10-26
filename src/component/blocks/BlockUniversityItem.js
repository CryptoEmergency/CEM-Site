import {
  jsx,
  jsxFrag,
  Helpers,
  Variable,
  sendApi,
  initReload,
} from "@betarost/cemjs";

import svg from "@assets/svg/index.js";
import { If, Map } from "@component/helpers/All.js";
import {
  CommentInput,
  QuestionAnswerItemComment,
} from "@component/element/index.js";
import { BlockComment } from "@component/blocks/index.js";

const BlockUniversityItem = function ({ item, type }) {
  if (!type || type != "university") {
    return <></>;
  }
  
  return (
    <ul class="c-university__list">
      <li class=" c-universitycard" style={"align-items:center"}>
        <div class="c-universitycard__wrapper">
          <img class="c-universitycard__img"  style={"border-radius:18px;overflow:hidden "} src={item.img}></img>
        </div>
        <div class="c-universitycard__info">
          <p class="c-universitycard__text" style={"margin-bottom:0"}>
            {item.description}
          </p>
        </div>
      </li>
      <Map
        data={item.stock}
        dataIf={(item, index) => {
            let successImg = Variable.setRef()
          return (
            <li
              class="c-goals__item"
              style={"display:flex;align-items: center;margin-bottom:20px"}
            >
              <p style={"margin:0 10px 0 0"}>{item.text}</p>
              <div
                class="affiliate_banner_copy"
                onclick={() => {
                  navigator.clipboard.writeText(item.promo);
                  successImg().hidden = false;
                  setTimeout(() => {
                    successImg().hidden = true;
                  }, 1000);
                  return;
                }}
              >
                <img src={svg.copy} />
                <span>{Variable.lang.p.copy}</span>
                <div class="success_copy" hidden={true} ref={successImg}>
                  {Variable.lang.text.coppied}
                </div>
              </div>
            </li>
          );
        }}
      />
    </ul>
  );
};
//I check
export { BlockUniversityItem };
