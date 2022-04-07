function login(){
    if(validate_login() != 0){
        var data = $('#login__form').serialize();
        ajaxPromise("module/login/controller/controller_login.php?op=login",
        'POST', 'JSON', data)
        .then(function(data) {	
                if(data == "error_passwd"){		
                    $("#error_password").html('La contraseña no es correcta');
                }else{
                    localStorage.setItem("token", data);
                    toastr['success']("User logged successfully");
                    if (localStorage.getItem('callback')) {
                    location.href = localStorage.getItem('callback');
                    } else {
                        location.href = "index.php?page=controller_home&op=list";
                    }
                }	
        })
        .catch(function( textStatus ) {
            if ( console && console.log ) {
                console.log( "La solicitud ha fallado: " +  textStatus);
            }
        });     
    }
}

function validate_login(){
    var error = false;

	if(document.getElementById('username').value.length === 0){
		document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
		error = true;
	}else{
        document.getElementById('error_username').innerHTML = "";
    }
	
	if(document.getElementById('password').value.length === 0){
		document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
		error = true;
	}else{
        document.getElementById('error_password').innerHTML = "";
    }
	
    if(error == true){
        return 0;
    }
}

function clicking() {
    $('#login__form').on("click", "#login", function () {
        login();
      });
      $("#login__form").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
          e.preventDefault();
            login();

        }
    });

    $('#login__form').on("click", "#register", function () {
        location.reload();
        location.href = "index.php?page=controller_login&op=regis_view";
    })

}

$(document).ready(function () {
    $("html, body").animate({scrollTop: $('#scroll').offset().top }, 1000);
    clicking();

});