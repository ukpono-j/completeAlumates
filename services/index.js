function get(url) {
    return $.ajax({
        url: url,
        headers: {
            // 'Access-Control-Allow-Origin': 'https://alumates111.herokuapp.com'
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"

        }
    })
}

function post(url, data) {
    return $.ajax({
        url: url,
        headers: {
            // 'Access-Control-Allow-Origin': 'https://alumates111.herokuapp.com'
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
        method: "POST",
        data: data
    })
}