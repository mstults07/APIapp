//Javascript application for Thinkful API hack project


$(document).ready(function() {

    $("#search").submit(function (event) {
        event.preventDefault();
        loadInstagrams();
    });

    $("#submit").on('click', function() {
        loadInstagrams();
    });

    var min='',
    url='',
    // Client information
    instagram = {                                     
        clientID: '6ba1a82461034266a20a13e213f3d6f4',
        apiHost: 'https://api.instagram.com',
    }
    //Get pictures
    function loadInstagrams() {                      
        $('.loading').removeClass('hidden');
        tag = $('input').val();
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent/?client_id=" + instagram.clientID + "&count=12",
            data: {'client_id': instagram.clientID, 'max_tag_id': min,},
            success: function(pic) {
                min = pic.pagination.next_max_tag_id;
                url = pic.pagination.next_url;
                $('.loading').addClass('hidden');
                $('.controlbutton').removeClass('hidden');
                console.dir(pic);
                for (var i = 0; i < pic.data.length; i++) {
                    likes = pic.data[i].likes.count;
                    console.log(likes);
                    link = pic.data[i].link;
                    urlsrc = pic.data[i].images.thumbnail.url;
                    $("#output").append("<div id='outputpic'><a target='_blank' href='" + link + "'><div id='heartdiv'><div id='likesdiv'>" + likes + "</div></div><img src='" + urlsrc + "'></img></div>");
                }  
            }      
        });
    }
    //Load more pictures
     $('#morepics').on('click', function() {         
        loadInstagrams();
     })
     //Clear pictures and start new search
     $('#clearall').on('click', function() {         
        $('#output').empty();
        $('.controlbutton').addClass('hidden');
        $('input').val('');
        $('input').focus();
     })
     //Clears input value
    $('input').on('click focusin', function() {      
        this.value = '';
    });
    
});