import { jsx, jsxFrag, Helpers, Variable } from "@betarost/cemjs";


const Test = function ({ callBack }) {

    return (
        <div
            onclick={() => {
                callBack("11111")
            }}
        >
            TETTTTTTTTT
            {/* =={item}
            =2={tmp} */}
        </div>
    );
};

export { Test };
