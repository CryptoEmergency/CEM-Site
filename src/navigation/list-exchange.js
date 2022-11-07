import {
  jsx,
  jsxFrag,
  init,
  Variable,
  initReload,
} from "@betarost/cemjs";
// check
import { api } from '@src/apiFunctions.js'
import { BlockExchange } from '@component/blocks/index.js';
import { ButtonShowMore } from "@component/element/index.js";

const start = function (data, ID) {
  init(
    null,
    () => {
      return (
        <div class="crypto_exchanges_full_page c-main__body" id="crypto_exchange">
          <BlockExchange
            nameRecords="PageExchange"
          />
        </div>
      );
    }, ID
  );
};
export default start;