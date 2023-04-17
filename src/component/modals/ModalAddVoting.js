import { jsx, jsxFrag, init, initReload } from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";

const ModalAddVoting = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  // console.log("=990b74=", Static);
  Static.forms = {
    title: "",
    descriptoin: "",
    responseOptions: [],
  };
  // Static.test1 = 123;
  init(
    null,
    () => {
      return (
        <div class="c-modal c-modal--open">
          <section class="c-modal__dialog">
            <button
              class="c-modal__closse-1"
              href="#close"
              onclick={() => {
                fn.modals.close(ID);
              }}
            ></button>

            <div class="add-voiting" ethod="post" action="input1.php">
              <div class="vot-quection">
                <h2>Ваш вопрос </h2>
                <label> Тема </label>
                <input
                  placeholder="Тема"
                  oninput={function () {
                    Static.forms.title = this.value;
                  }}
                ></input>

                <label>Описание:</label>

                <input
                  placeholder="Описание вашего опроса"
                  oninput={function () {
                    Static.forms.descriptoin = this.value;
                  }}
                ></input>
                <label> Варианты ответа</label> 
                <div class="btn-block">
                <button
                  class="bot-btne btn" 
                  onclick={() => {
                    Static.forms.responseOptions.push({});
                    initReload();
                  }}
                >
                  +
                </button>
                </div>
                

                {Static.forms.responseOptions.map((item, index) => {                 
                  return (
                    <input
                      placeholder="Введите ваше сообщение"
                      oninput={function () {
                        Static.forms.responseOptions[index].name = this.value;
                      }}
                    ></input>
                  );
                })}

                <button
                  class="bot-btn"
                  onclick={() => {
                    console.log(Static.forms);
                  }}
                >
                  <img src={svg["button-svgrepo-com"]}></img>
                  {""}
                  Создать опрос{""}
                </button>
              </div>
            </div>
          </section>
        </div>
      );
    },
    ID
  );
};
export default ModalAddVoting;
