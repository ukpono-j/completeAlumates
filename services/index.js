function get(url) {
    return $.ajax({
        url: url
    })
}

function post(url, data) {
    return $.ajax({
        url: url,
        data: data
    })
}