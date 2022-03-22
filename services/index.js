
function get(url) {
    $.ajax({
        url: url,
      }).done(function (response) {
        schoolType = JSON.parse(response)
        // $.map(schoolType, function (index) {
        //   $("#selectSchool").append(`<option data-id='${index.id}' value="${index.name}">${index.name}</option>`)
        // })s
        return schoolType
    })
}
// function post(url, data) {
   
// }