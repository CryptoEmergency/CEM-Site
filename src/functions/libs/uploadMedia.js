const forExport = async function (file, type, onload, onprogress, xhr) {
    let nameFile = "file.png"
    if (file.name) {
        nameFile = file.name
    }
    const formData = new FormData()
    formData.append('media', file, nameFile);

    xhr = new XMLHttpRequest()
    xhr.open('POST', `/upload/${type}/`)
    xhr.onload = onload
    xhr.upload.onprogress = onprogress
    xhr.send(formData)
}

export default forExport