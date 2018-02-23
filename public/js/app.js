(function() {
    var recoupLeft, recoupTop;
    var uploadImgMethod = {
        top: 0,
        left: 0,
        rotate: 0,
    }

// Prepare extra handles
  var nw = $("<div>", {
    class: "ui-rotatable-handle"
  });
  var ne = nw.clone();
  var se = nw.clone();

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
                css.transform = uploadImgMethod.rotate + 'deg';
                $('.editor-upload').css(css);
                //
                ui.position.left += recoupLeft;
                ui.position.top += recoupTop;
                $('.editor-upload').css(ui.position);
                /**
                 * set position of upload image
                 */
                uploadImgMethod.left = ui.position.left;
                uploadImgMethod.top = ui.position.top;
            },
            stop: function() {
                $(this).css('opacity', '1');
            },
            cursor: "move",
            containment: "#editor-content",
            scroll: false,
	    cancel: ".ui-rotatable-handle"
        });
    }
    /**
     * run resizeable
     */
    $('.editor-object-rero').resizable({
        aspectRatio: true,
        alsoResize: ".editor-upload, .editor-object",
	classes: {
	    "ui-resizable": "highlight"
	}
    }).rotatable({
        start: function(event, ui) {
            },
        rotate: function(event, ui) {
		$('.editor-upload').css({
                transform: 'rotate('+ui.angle.current+'rad)'
            });
        },
        stop: function(event, ui) {
            },
    });

$('.editor-object-rero div.ui-rotatable-handle').addClass("ui-rotatable-handle-sw");
  nw.addClass("ui-rotatable-handle-nw");
  ne.addClass("ui-rotatable-handle-ne");
  se.addClass("ui-rotatable-handle-se");
$(".editor-object-rero").append(nw, ne, se);
$(".editor-object-rero div[class*='ui-rotatable-handle-']").bind("mousedown", function(e) {
    $('.editor-object-rero').rotatable("instance").startRotate(e);
  });
    /**
     * set position origin
     */
    function setPosition() {
        $('.editor-frame').css({
            top: ($('.app-editor-content').height() - $('.editor-frame').height()) / 2,
            left: ($('.app-editor-content').width() - $('.editor-frame').width()) / 2,
        });
        uploadImgMethod.left = ($('.app-editor-content').width() - $('.editor-upload').width()) / 2;
        uploadImgMethod.top = ($('.app-editor-content').height() - $('.editor-upload').height()) / 2;
        uploadImgMethod.rotate = 0;
        $('.editor-upload, .editor-object').css({
            top: uploadImgMethod.top,
            left: uploadImgMethod.left,
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
    /**
     * init
     */
    setPosition();
    setImage();
    initDraggable();
    /**
     * event
     */
    $('.btn-restore').on('click', function() {
        setPosition();
    });
    $('.btn-rotate').on('click', function() {
        uploadImgMethod.rotate++;
        $('.editor-upload, .editor-object').css('transform', 'rotate(' + (uploadImgMethod.rotate) + 'deg)');
    });
    $('.btn-move-left').on('click', function() {
        uploadImgMethod.left--;
        $('.editor-upload, .editor-object').css({
            left: uploadImgMethod.left
        });
    });
    $('.btn-move-right').on('click', function() {
        uploadImgMethod.left++;
        $('.editor-upload, .editor-object').css({
            left: uploadImgMethod.left
        });
    });
    $('.btn-move-top').on('click', function() {
        uploadImgMethod.top--;
        $('.editor-upload, .editor-object').css({
            top: uploadImgMethod.top
        });
    });
    $('.btn-move-bottom').on('click', function() {
        uploadImgMethod.top++;
        $('.editor-upload, .editor-object').css({
            top: uploadImgMethod.top
        });
    });
    //$('#slider').slider({
        //range: true,
        //min: 0,
        //max: 360,
        //slide: function(event, ui) {
            //uploadImgMethod.rotate = ui.value;
            //$('.editor-upload').css('transform', 'rotate(' + (uploadImgMethod.rotate) + 'deg)');
        //}
    //});
    $('.btn-upload').on('click', function() {
        console.log(uploadImgMethod);
    });
})();
