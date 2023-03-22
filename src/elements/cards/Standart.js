import { jsx, jsxFrag } from "@betarost/cemserver/cem.js";
import svg from "@assets/svg/index.js";
import Elements from "@src/elements/export.js";
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

const forExport = function ({
  className,
  link,
  image,
  title,
  description,
  statistic,
  statisticClass,
  ElemVisible = () => { }
}) {
  if (link) {
    return (
      <Elements.Link
        class={link.class}
        href={link.href}
        link={{ type: link.type, data: link.data }}
      >
        {image ? (
          <div class={image.class}>
            <img src={image.src} />
          </div>
        ) : null}

        {title ? <p class={title.class}>{title.text}</p> : null}

        {description ? (
          <p class={description.class}>{description.text}</p>
        ) : null}

        {statistic ? (
          <div class={statisticClass} ElemVisible={ElemVisible}>
            {Object.entries(statistic).map(([key, item]) => {
              // console.log(key, item);
              if (key == "showDate") {
                return <span class={item.class}>{item.value}</span>;
              }

              return (
                <span class={item.class}>
                  <img src={svg[key]} />
                  {item.value}
                </span>
              );
            })}
          </div>
        ) : null}
      </Elements.Link>
    );
  }

  return (
    <div class="affiliate_program_condition" ElemVisible={ElemVisible}>
      <div class="affiliate_program_condition_icon">
        <img src={image} />
      </div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export default forExport;
