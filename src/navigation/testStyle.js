import {
  jsx,
  jsxFrag,
  init
} from "@betarost/cemserver/cem.js";
import { fn } from '@src/functions/index.js';


const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID })
  init(
    () => {

    },
    () => {
      return (
        <div class="mt--70" >
          <div class="admin-inner">
            Test page styles
            <h1>Заголовок 1</h1>
            <h2>Заголовок 2</h2>
            <h3>Заголовок 3</h3>
            <h4>Заголовок 4</h4>
            <h5>Заголовок 5</h5>
            <h6>Заголовок 6</h6>
            <br></br>
            <button>Button</button>

          </div>
        </div>
      );
    }, ID
  );
};
export default start;
// OK