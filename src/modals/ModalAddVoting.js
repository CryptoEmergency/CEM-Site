import { jsx, jsxFrag, init, initReload, CEM } from "@betarost/cemserver/cem.js";
// import { fn } from "@src/functions/index.js";
// import svg from "@assets/svg/index.js";

const { svg, fn } = CEM

const ModalAddVoting = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID });
  // console.log("=990b74=", Static);
  Static.forms = {
    title: "",
    descriptoin: "",
    responseOptions: [],  
  };
  // Static.test1 = 123;
  
  // const [massive] = function({data, ID})
  // let [den] = fn.GetParams({ data, ID });
  // // console.log("=990b74=", Static);
  // den.forms = {
  //   ridingBook:[]
  //  }

  // let as = ["a","b", "c", "d", "h", "i" ,"j"] 
  // let del = mas.splice (2)
  // console.log(del)

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
                <div class="btn-block">
                
              <label class="more-deciveee">
              <intput> Варианты ответа</intput>
              
                {/* <label> Варианты ответа</label>  */}
                
                <button
                  class="bot-btne btn" 
                  style="margin-left:6px;"
                  onclick={() => {
                    Static.forms.responseOptions.push({});
                    initReload();
                  }}
                >
                  +
                </button>
                
                

                
                <button
                  class="bot-btne btn" 
                  style="margin-left:10px"
                  onclick={() => {
                    Static.forms.responseOptions.splice (0, 1);
                    initReload();
                  }}
                >
                  -
                </button>
                </label>
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
