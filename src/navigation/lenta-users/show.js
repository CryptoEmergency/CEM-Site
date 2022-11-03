import {
    jsx,
    jsxFrag,
    Variable,
    init,
    sendApi,
    getStorage,
    initReload
  } from "@betarost/cemjs";
  

  import { api } from '@src/apiFunctions.js'
  import { BlockUserForLenta } from "@component/blocks/index.js";

  const start = function (data, ID = "mainBlock") {
    let item;

  
    init(

        
      async () => {
        if (data && data.item) {
          item = data.item
        } else {
          let response = await api({ type: "get", action: "getPost", short: true, limit: 1, filter: { _id: Variable.dataUrl.params } })
          item = response.list_records[0]
        }
      },
      async () => {
  
        return (
  
          <div class="answer_container c-main__body">
  <BlockUserForLenta item={item} />
       
          </div>
        )
      }, ID
    );
  };
  
  export default start;
  