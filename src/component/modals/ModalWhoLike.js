import { jsx, jsxFrag, Variable, initReload } from "@betarost/cemjs";
import svg from "@assets/svg/index.js";
import { Avatar } from "@component/element/Avatar.js";

//"alarm_icon" : "confirm_icon"
const ModalWhoLike = function (data, reload) {

  return (
    <div class="c-modal c-modal--open" id="ModalWhoLike">
      <section class="c-modal__dialog">
        <header class="c-modal__header">
          <h2 class="c-modal__title">{Variable.lang.text.evaluated}</h2>
          <button
            type="button"
            class="c-modal__close"
            onclick={() => {
              Variable.Modals.pop();
              initReload("modals")
            }}
          ></button>
        </header>
        <div class="c-modal__body">
          {data.whoLike.length > 0 ? (
            data.whoLike.map((item) => {
              return (
                <div
                  style={"display:flex; align-items:center; "}
                >
                  <Avatar author={item.author} />
                  <p>{item.author.nickname}</p>
                </div>
              );
            })
          ) : (
            <p>{Variable.lang.text.emptyEva}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ModalWhoLike;
