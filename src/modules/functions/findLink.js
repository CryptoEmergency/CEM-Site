
const forExport = function (str) {

    str = str.replace(/&amp;/g, '&');

    let linkRegular = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm

    if (str.match(linkRegular) != null) {
        let arrUrl = str.match(linkRegular)

        arrUrl = arrUrl.filter(function (elem, index, arr) {
            return index === arr.indexOf(elem);
        })

        arrUrl.map((link) => {
            let shortLink = link
            if (link.length > 35) {
                shortLink = link.slice(0, 35) + '...'
            }
            str = str.replace(link, `<a href="${link}" class="global-link" rel="nofollow noopener" target="_blank">${shortLink}</a>`);
            // str = str.replaceAll(link, `<a href="${link}" class="global-link" rel="nofollow noopener" target="_blank">${shortLink}</a>`)
        })
    }
    return str
}
export default forExport
