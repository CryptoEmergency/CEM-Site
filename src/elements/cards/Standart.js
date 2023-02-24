import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";
import Elements from '@src/elements/export.js';
// const forExport = function ({ className, image, title, description }) {
//   return (
//     <div class="affiliate_program_condition">
//       <div class="affiliate_program_condition_icon">
//         <img src={image} />
//       </div>
//       <p>{title}</p>
//       <p>{description}</p>
//     </div>
//   );
// };

const forExport = function ({ className, link, image, title, description, statistic }) {

  if (link) {
    return (
      <Elements.Link
        class={link.class ? link.class : "blog_news_item"}
        href={link.href}
        link={{ type: link.type, data: link.data }}>
        <img class={image ? image.class : null} src={image ? image.src : null} />
        <p class={title ? title.class : null}>{title.text}</p>
        <p class={description ? description.class : null}>{description.text}</p>
        {statistic
          ?
          <div class="blog_post_stat blog_post_stat--list" >
            <span>
              <img src={svg["question_views"]} />
              {statistic.view}
            </span>
            <span>
              <img src={svg["question_answers"]} />
              {statistic.comments}
            </span>
            {/* <span>{fn.getDateFormat(statistic.showDate)}</span> */}
          </div>
          :
          null
        }
      </Elements.Link>
    )
  }

  return (
    <div class="affiliate_program_condition">
      <div class="affiliate_program_condition_icon">
        <img src={image} />
      </div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default forExport;
