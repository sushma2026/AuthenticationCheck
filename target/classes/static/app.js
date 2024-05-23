$(document).ready(function() {
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (settings.type === 'POST' || settings.type === 'PUT' || settings.type === 'DELETE') {
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        xhr.setRequestHeader("X-XSRF-TOKEN", Cookies.get('XSRF-TOKEN'));
                    }
                }
            }
        });

        $.get("/user", function(data) {
            if (data && data.name) {
                $("#user").html(data.name);
                $(".unauthenticated").hide();
                $(".authenticated").show();
            }
        });
        $.get("/error", function(data){
            if(data){
                $("error").html(data);
             }
             else{
                $("error").html();
             }
        }

        window.logout = function() {
            $.post("/logout", function() {
                $("#user").html('');
                $(".unauthenticated").show();
                $(".authenticated").hide();
            });
        };
    });