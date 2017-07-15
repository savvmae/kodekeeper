$('#new-snippet').on('submit', function (event){
    event.preventDefault();
    var title = $('#title').val();
    var body = $('#body').val();
    var notes = $('#notes').val();
    var language = $('#language').val();
    var tags = $('#tags').val();

    $.post('http://localhost:3000/api/create-snippet', {title: title, body: body, notes: notes, language: language, tags: tags})
    .then(function(response) {
        if (response.message === "success") {
            window.location.href = '/api/dashboard';
        } else if (response.message ===  "Incomplete Data" ) {
            $('#message').text(response.message);
        }
    })
})