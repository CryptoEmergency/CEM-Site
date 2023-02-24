import { jsx, jsxFrag, load, Variable } from "@betarost/cemserver/cem.js";

import { fn } from "@src/functions/index.js";
import Elements from "@src/elements/export.js";

const start = function (data, ID) {
  let [Static] = fn.GetParams({ data, ID, initData: "news" });

  load({
    ID,
    fnLoad: async () => {
      Static.records = await fn.socket.get({
        method: "News",
        params: { filter: { type: "media" } },
      });
    },
    fn: () => {
      return (
        <Elements.page.MainContainer
          title={!Static.openModals ? Variable.lang.h.mediaUs : null}
        >
          <Elements.page.Container class="section-g  p-lr">
            {Static.records.map((item) => {
              return (
                <Elements.cards.Standart
                  link={{
                    href: "/media/show/" + item._id,
                    type: "modal",
                    data: {
                      title: fn.sliceString(item.title, 85),
                      item,
                      items: fn.itemsMenu.news({
                        url: "/media/show/" + item._id,
                      }),
                    },
                  }}
                  title={{
                    text: item.title,
                  }}
                  description={{
                    text: item.preview,
                  }}
                  image={{
                    src: "/assets/upload/news/" + item.image,
                    class: "card-img_rect",
                  }}
                />
              );
            })}
          </Elements.page.Container>
        </Elements.page.MainContainer>
      );
    },
  });
};

export default start;
