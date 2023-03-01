import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';

const forExport = function ({onclick, src, children, item }) {
    return (
        <div class="tasking-item">
            <h2 class="tasking-title">
                {item.title}
            </h2>
            <div class="tasking-description">
                <p>
                    {item.text}
                </p>
            </div>
            <div class="tasking-user">
                <h3>Участники комнаты</h3>
                <div class="tasking-user-append">
                    <div 
                        class="tasking-user-append-add"
                        onclick={onclick}
                    >
                        <img src={src} />
                    </div>
                </div>

                {children}

                <div class="swiper-pagination"></div>
            </div>
        </div>
    )
}

export default forExport
