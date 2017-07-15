$('#signup-form').on('submit', function (event){
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    $.post('http://localhost:3000/api/signup', {email: email, password: password})
    .then(function(response) {
        console.log(response);
        if (response.message === "success") {
            window.location.href = '/api/dashboard';
        } else if (response.message === "That email is already registered. Log in to continue.") {
            window.location.href = '/';
        } else if (response.message === "Missing Data Fields") {
            $('#message').text(response.message);
        }
    })
})