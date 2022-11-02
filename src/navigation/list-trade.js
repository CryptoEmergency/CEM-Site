import {
  jsx,
  jsxFrag,
  init,
  sendApi,
  Variable,
  initReload,
} from "@betarost/cemjs";
// poydet
import {BlockTrade} from '@component/blocks/index.js';
import { ButtonShowMore } from "@component/element/index.js";
import { api } from '@src/apiFunctions.js'

const start = function (data, ID = "mainBlock") {
  init(
    async () => {
    },
    () => {
      return (
        <div class="crypto_exchanges_full_page c-main__body">
          <BlockTrade
            button={()=>{
              if(Variable.PageTrades.list_records.length < Variable.PageTrades.totalFound){
                return(
                  <ButtonShowMore
                    onclick={async () => {
                      let tmp = await api({ type: "get", action: "getTrade", short: true, limit: 50, offset: Variable.PageTrades.list_records.length })   
                      Variable.PageTrades.list_records.push(
                        ...tmp.list_records
                      );
                      initReload();
                    }}
                  />
                )
              }
            }}
          />
        </div>
      );
    }, ID
  );
};
export default start;
