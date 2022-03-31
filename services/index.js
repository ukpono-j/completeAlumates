function get(url) {
    return $.ajax({
        url: url,
        dataType : 'json'
    })
}

function post(url, data) {
    return $.ajax({
        url: url,
        method: "POST",
        data: data,
        dataType : 'json'
    })
}