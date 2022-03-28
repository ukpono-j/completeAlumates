function get(url) {
    return $.ajax({
        url: url,
        headers: {
            'Access-Control-Allow-Origin': 'https://alumates111.herokuapp.com'
        }
    })
}

function post(url, data) {
    return $.ajax({
        url: url,
        headers: {
            'Access-Control-Allow-Origin': 'https://alumates111.herokuapp.com'
        },
        method: "POST",
        data: data
    })
}