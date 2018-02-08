(function() {
    var rotate = 0;
    var recoupLeft, recoupTop;
    var pLeft, pTop;

    function initDraggable() {
        $('.editor-object').draggable({
            start: function(event, ui) {
                $(this).css('opacity', '0.3');
                //
                var left = parseInt($(this).css('left'), 10);
                left = isNaN(left) ? 0 : left;
                var top = parseInt($(this).css('top'), 10);
                top = isNaN(top) ? 0 : top;
                recoupLeft = left - ui.position.left;
                recoupTop = top - ui.position.top;
            },
            drag: function(event, ui) {
                var css = $(this).position();
                css.transform = rotate + 'deg';
                $('.editor-upload').css(css);
                //
                ui.position.left += recoupLeft;
                ui.position.top += recoupTop;
                $('.editor-upload').css(ui.position);
                pLeft = ui.position.left;
                pTop = ui.position.top;
            },
            stop: function() {
                $(this).css('opacity', '0');
            },
            cursor: "move",
            containment: "#editor-content",
            scroll: false
        });
    }
    // $('.editor-object').resizable({
    //     aspectRatio: true,
    //     handles: 'ne, se, sw, nw'
    // });
    $('.editor-object-rero')
        /*.rotatable({
                handle: $(document.createElement('img')).attr('src', 'public/js/rotate.png'),
                rotate: function(event, ui) {
                    // rotate = ui.angle.degrees;
                    // console.log(rotate);
                    // $('.editor-upload, .editor-object').css('transform', 'rotate(' + rotate + 'deg)');
                    // 
                    if (ui.angle.current < 0) {
                        var given_angle = ui.angle.current + 2 * Math.PI;
                    } else {
                        var given_angle = ui.angle.current;
                    }
                    var new_angle = Math.round(given_angle * 180 / Math.PI) + "deg";
                    $(".editor-upload, .editor-object").css("transform", "rotate(" + new_angle + ")");
                }
            })*/
        .resizable({
            alsoResize: ".editor-upload, .editor-object"
        });
    // $('.editor-upload').resizable();
    /**
     * set position origin
     */
    function setPosition() {
        $('.editor-frame').css({
            top: ($('.app-editor-content').height() - $('.editor-frame').height()) / 2,
            left: ($('.app-editor-content').width() - $('.editor-frame').width()) / 2,
        });
        pLeft = ($('.app-editor-content').width() - $('.editor-upload').width()) / 2;
        pTop = ($('.app-editor-content').height() - $('.editor-upload').height()) / 2;
        rotate = 0;
        $('.editor-upload, .editor-object').css({
            top: pTop,
            left: pLeft,
            transform: 'rotate(0deg)'
        });
    }
    /**
     * set image origin
     */
    function setImage() {
        $('.editor-upload').append('<img style="width: 100%; height: 100%" src="public/images/download.jpeg"/>');
        $('.editor-frame').append('<img class="editor-frame-image" src="public/images/frame.png"/>');
    }
    setPosition();
    setImage();
    initDraggable();
    $('.btn-restore').on('click', function() {
        setPosition();
    });
    $('.btn-rotate').on('click', function() {
        rotate++;
        $('.editor-upload, .editor-object').css('transform', 'rotate(' + (rotate) + 'deg)');
    });
    $('.btn-move-left').on('click', function() {
        pLeft--;
        $('.editor-upload, .editor-object').css({
            left: pLeft
        });
    });
    $('.btn-move-right').on('click', function() {
        pLeft++;
        $('.editor-upload, .editor-object').css({
            left: pLeft
        });
    });
    $('.btn-move-top').on('click', function() {
        pTop--;
        $('.editor-upload, .editor-object').css({
            top: pTop
        });
    });
    $('.btn-move-bottom').on('click', function() {
        pTop++;
        $('.editor-upload, .editor-object').css({
            top: pTop
        });
    });
    $('#slider').slider({
        range: true,
        min: 0,
        max: 360,
        slide: function(event, ui) {
            rotate = ui.value;
            $('.editor-upload, .editor-object').css('transform', 'rotate(' + (rotate) + 'deg)');
        }
    });
})();