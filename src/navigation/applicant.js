import {
    jsx,
    jsxFrag,
    init,
    initReload
  } from "@betarost/cemjs";


  
  const start = function (data, ID) {
    let tmp = 0
    init(
      async () => {
        console.log('Вызывается 1 раз')
        tmp = 1
      },
      () => {
        setTimeout(function(){
            tmp = 2
            initReload()
        }, 2000)
        return (
          <div class="blog_page_container c-main__body">
            1 = {tmp}
          </div>
        )
      }, ID
    );
  };
  export default start;