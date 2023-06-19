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

const categories = [
    {
        name: 'all',
        active: true,
    },
    {
        name: 'ico',
        active: false,
    },
    {
        name: 'ido',
        active: false,
    },
    {
        name: 'ieo',
        active: false,
    },
    {
        name: 'igo',
        active: false,
    },
    {
        name: 'ifo',
        active: false,
    },
    {
        name: 'category',
        active: false,
    },
    {
        name: 'startaps',
        active: false,
    },
    {
        name: 'choose',
        active: false,
    },
    {
        name: 'ufo',
        active: false,
    },
    {
        name: 'www',
        active: false,
    },
    {
        name: 'anya',
        active: false,
    }
]

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
    load({
        ID,
        fnLoad: async () => {
            // filterStartups = makeFiltersApi(Static)
            // Static.records = await fn.socket.get({
            //   method: "Startups",
            //   params: {
            //     filter: filterStartups.filter,
            //     sort: filterStartups.sort
            //   }
            // });
        },
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
                            <div class="mt--25">
                                <Elements.Category
                                    records={categories}                    
                                >
                                </Elements.Category>
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
    });
};

export default start;