import {
  jsx,
  jsxFrag,
  Variable,
  initReload,
  timersStart,
  timersStop,
} from "@betarost/cemjs";

const ModalContextMenuCopy = function (data, reload) {
  let type = {
    share: true,
    edit: true,
    delete: false,
    subscription: false,
    complainAnswer: false,
    complainPost: false,
    complainComment: false,
    complainUser: false,
    blackList: false,
  };
  let typeText = {
    share: Variable.lang.select.share,
    edit: Variable.lang.button.edit,
    delete: false,
    subscription: false,
    complainAnswer: false,
    complainPost: false,
    complainComment: false,
    complainUser: false,
    blackList: false,
  };
  return (
    <div class="c-modal c-modal--open" id="ModalContextMenu">
      <section class="c-modal__dialog">
        {/* <header class="c-modal__header">
          <h4></h4>
        </header> */}
        <div class="c-modal__body">
          <ul class="c-actions">
            {
              //    Object.keys(obj).map((key) => {
              // 		return (<li  class="c-actions__item">{obj[key]}</li>)
              // 	})
              () => {
                if (
                  // item.author._id === Variable.myInfo._id
                  true
                ) {
                  return Object.keys(type).map((key) => {
			
					
                    if (type[key]) {
                      return <li class = {"c-actions__item"} >{typeText[key]}</li>;
                    }
                  });
                  console.log("=677e2c=", tmp);
                  // return tmp
                  // return <p style ={"color:black"}>sadsadasd</p>
                } else {
                  return <p>asdasdasdasd</p>;
				//   class = {["c-actions__item", key === "edit"?"c-text--green":null ]}
                }
              }
            }
            {/* {() => {
              if (true) {
                return (
                  <div>
                    {() => {
                      return (
                        <div>
						 {
							// type.share 
							true
							&&
							<ul
							class="c-actions__item "
						
						  >
							{Variable.lang.select.share}
						  </ul>
						 }
						 {
							// type.edit
							true
							&&
							<ul
                          class="c-actions__item"
                       
                        >
                          {Variable.lang.button.edit}
                        </ul>
						 }



                        </div>
                      );
                    }}
                  </div>
                );
              } else {
              }
            }} */}

            <li class="c-actions__item">
              <span class="c-text--green">{Variable.lang.select.complain}</span>
            </li>
            <li class="c-actions__item">
              <span class="c-text--error">{Variable.lang.select.complain}</span>
            </li>
            <li class="c-actions__item">{Variable.lang.button.subscribe}</li>
            <li class="c-actions__item">{Variable.lang.select.share}</li>
          </ul>
        </div>
        <div class="c-modal__footer">
          <button
            class="c-button c-button--inverse"
            onclick={() => {
              Variable.DelModals("ModalContextMenuCopy");
            }}
          >
            <span class="c-button__wrapper">{Variable.lang.button.reset}</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalContextMenuCopy;
