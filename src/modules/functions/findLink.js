
const forExport = function (str) {
    // console.log('=9303c3=', str)
    str = str.replace(/&amp;/g, '&');

    let linkRegular = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm

    if (str.match(linkRegular) != null) {
        str.match(linkRegular).forEach(link => {
            console.log('=9303c3= 2 =', link)

            let shortLink = link
            if (link.length > 35) {
                shortLink = link.slice(0, 35) + '...'
            }
            str = str.replace(link, `<a href="${link}" rel="nofollow noopener" target="_blank">${shortLink}</a>`)
        })
    }
    return str
}
export default forExport


