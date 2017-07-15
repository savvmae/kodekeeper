$('#login-form').on('submit', function (event){
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    $.post('https://kodekeeper.herokuapp.com/api/login', {email: email, password: password})
    .then(function(response) {
        if (response.message === "Success") {
            window.location.href = '/api/dashboard';
        } else if (response.message ===  "Incorrect password or username" ) {
            $('#message').text(response.message);
        }
    })
})