import { jsx, jsxFrag, init } from "@betarost/cemserver/cem.js";
import { fn } from "@src/functions/index.js";
import svg from "@assets/svg/index.js";

const ModalAddVoting = function ({ icon, text }, ID) {
  init(
    null,
    () => {
      return (
        <div class="c-modal c-modal--open">
          <section class="c-modal__dialog">
          <button class="c-modal__close"></button>   
            <div class="add-voiting" ethod="post" action="input1.php">
                <h2>Ваш вопрос </h2>
                <label> Тема    </label>
                {/* <div class="error-div"></div> */}
        <div class="vot-quection"> 
                <input placeholder="Тема"></input> 
        </div>
            
                {/* <input type="text"> </input> */}
                <label>Описание:</label>
                <input placeholder="Описание вашего опроса"></input>
                {/* <input type="text"> </input> */}
                <label> Варианты ответа</label>
                {/* <input type="text"> </input> */}
                <textarea placeholder="Введите ваше сообщение"></textarea>
                <button class="bot-btn"><img src={svg["button-svgrepo-com"]}></img>
                {""}
                Создать опрос{""}
                    
                </button>
            </div>

          </section>
        </div>
      );
    },
    ID
  );
};
export default ModalAddVoting;
