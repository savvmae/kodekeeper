$('#login-form').on('submit', function (event){
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    $.post('http://localhost:3000/api/login', {email: email, password: password})
    .then(function(response) {
        if (response.message === "Success") {
            window.location.href = '/api/dashboard';
        } else if (response.message ===  "Incorrect password or username" ) {
            $('#message').text(response.message);
        }
    })
})