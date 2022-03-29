function get(url) {
    return $.ajax({
        url: url,
        headers: {
            'Access-Control-Allow-Origin': 'https://alumates111.herokuapp.com'
            // 'Access-Control-Allow-Origin': '*'
        }
    })
}

function post(url, data) {
    return $.ajax({
        url: url,
        headers: {
            'Access-Control-Allow-Origin': 'https://alumates111.herokuapp.com'
            // 'Access-Control-Allow-Origin': '*'
        },
        method: "POST",
        data: data
    })
}