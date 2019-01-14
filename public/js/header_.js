
var DroppyBox = $('<div class="droppybox animated flipInY"></div>');
$(function() {
    $("body").append(DroppyBox);
});

//            };
$(document).on("click", ".menu_icon", function(e) {
    //alert("here");
    var x = e.pageX,
            y = e.pageY;
    size = $(window).width();
    if (size - x < 300) {
        x -= 200;
    }
    DroppyBox.empty();
    DroppyBox.hide();
    for (var i = 0; i < 10; i++) {
        DroppyBox.append('<div class="user_row"><div class="dp"></div><div class="sender">Dr. Hammed Wahill: ' + i + '</div><div class="message hidden-xs">Howdy: ' + i + '</div></div>')
    }
    DroppyBox.css({
        "top": (y + 12) + 'px',
        "left": (x) + 'px'
    });
    DroppyBox.slideDown("slow");
}).on("mouseout", ".result_thumbs", function(e) {
//                //alert(e.pageX);
    nearestMan.css({
        "display": "none"
    });
});
;