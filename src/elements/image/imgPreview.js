import {
    jsx,
    jsxFrag,
} from '@betarost/cemserver/cem.js';
import svg from '@assets/svg/index.js';
import { fn } from '@src/functions/index.js';

const forExport = function ({ Static, item }) {
    return (
        <div class="notes-img-wrapper">
            <img
                class="notes-img-preview"
                src={`/assets/upload/gallery/${item.name}`}
                width="100"
                height="100"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    fn.modals.ModalViewPhoto({
                        path: item.name,
                    });
                }}
            />
            <div
                class="notes-delete-media"
                onClick={() => {
                    item.splice(index, 1);
                    if (item.length == 0) {
                        Static.isValid = false;
                    }
                    editNotes(Static);
                }}
            >
                <img src={svg["delete_icon"]} />
            </div>
        </div>
    )
}

export default forExport
