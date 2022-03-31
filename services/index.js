function get(url) {
    return $.ajax({
        url: url,
        'Content-Type': 'application/json'
    })
}

function post(url, data) {
    return $.ajax({
        url: url,
        method: "POST",
        data: data
    })
}