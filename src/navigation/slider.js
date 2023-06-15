import {
    jsx,
    jsxFrag,
    initReload,
    load,
    Variable,
    CEM
} from "@betarost/cemserver/cem.js";
import Elements from "@src/elements/export.js";

const { images, svg, fn } = CEM

const makeFilter = () => {
    let filter = {}
  
    filter["$and"] = [];
    filter["$and"].push({ startDate: { $lte: new Date() } });
    filter["$and"].push({ endDate: { $gte: new Date() } });
  
    return filter
}

const start = async function (data, ID) {
    let [Static] = fn.GetParams({ data, ID });
    const records = await fn.socket.get({ method: "Banners", params: { filter: makeFilter() } })
    const bannersRecords = [];
    records.forEach((item)=>{
        let lang = Variable.lang.code == "ru" ? "ru" : "en";
        if(item.languages.code == lang){
            bannersRecords.push(item)
        }
    });
    console.log('=bannersRecords=', bannersRecords)
    // const bannersRecords = records.map(function (item) {

    //     let lang = Variable.lang.code == "ru" ? "ru" : "en";
    //     if (item.languages.code == lang) {
    //       return (
    //         <a
    //           rel="nofollow noopener"
    //           target="_blank"
    //           href={item.link}
    //           class="swiper-slide"
    //           onclick={(e) => {
    //             if (item.modal) {
    //               fn.siteLink(e)
    //             }
    //           }}
    //         >
    //           <div>
    //             <img src={`/assets/upload/worldPress/${item.name}`} />
    //           </div>
    //         </a>
    //       );
    //     }
    //   });

    load({
        ID,
        fn: () => {
            return (
                <div class="c-main_body">
                    <div class="pt--70">
                        <div class="page-container">
                            <div class="mt--25">
                            <Elements.SliderCEM
                                speed="2500"
                                records={bannersRecords}
                            >
                            </Elements.SliderCEM>
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
    });
};

export default start;