(function() {
    var recoupLeft = 0;
    var recoupTop = 0;
    var uploadImgAttr = {
        width: 300,
        height: 210,
        top: 0,
        left: 0,
        rotate: 0,
        image: 'public/images/default.jpg'
    }
    var frameAttr = {
        width: 240,
        height: 150,
        image: 'public/images/frame_for_front.png'
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
                // $(this).css('opacity', '0.3');
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
                css.transform = uploadImgAttr.rotate + 'deg';
                $('.editor-upload').css(css);
                //
                ui.position.left += recoupLeft;
                ui.position.top += recoupTop;
                $('.editor-upload').css(ui.position);
                /**
                 * set position of upload image
                 */
                uploadImgAttr.left = ui.position.left;
                uploadImgAttr.top = ui.position.top;
            },
            stop: function() {
                // $(this).css('opacity', '1');
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
        wheelRotate: false,
        start: function(event, ui) {},
        rotate: function(event, ui) {
            $('.editor-upload').css({
                transform: 'rotate(' + ui.angle.current + 'rad)'
            });
        },
        stop: function(event, ui) {
            uploadImgAttr.rotate = ui.angle.degrees;
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
        uploadImgAttr.left = ($('.app-editor-content').width() - $('.editor-upload').width()) / 2;
        uploadImgAttr.top = ($('.app-editor-content').height() - $('.editor-upload').height()) / 2;
        uploadImgAttr.rotate = 0;
        $('.editor-upload, .editor-object').css({
            top: uploadImgAttr.top,
            left: uploadImgAttr.left,
            transform: 'rotate(0deg)'
        });
    }
    /**
     * set image origin
     */
    function setImage() {
        $('.editor-upload').append('<img style="width: 100%; height: 100%" src="' + uploadImgAttr.image + '"/>').css({
            width: uploadImgAttr.width,
            height: uploadImgAttr.height
        });
        $('.editor-frame').append('<img class="editor-frame-image" src="' + frameAttr.image + '"/>').css({
            width: frameAttr.width,
            height: frameAttr.height
        });
    }
    /**
     * init
     */
    setImage();
    setPosition();
    initDraggable();
    /**
     * event
     */
    $('.btn-restore').on('click', function() {
        $('.editor-upload, .editor-object-rero, .editor-object').css({
            width: uploadImgAttr.width,
            height: uploadImgAttr.height
        });
        setPosition();
        $('.editor-object-rero').css('transform', 'rotate(' + 0 + 'deg)').data('uiRotatable').angle(0);
    });
    $('.btn-rotate').on('click', function() {
        uploadImgAttr.rotate++;
        $('.editor-upload, .editor-object').css('transform', 'rotate(' + (uploadImgAttr.rotate) + 'deg)');
    });
    $('.btn-move-left').on('click', function() {
        uploadImgAttr.left--;
        $('.editor-upload, .editor-object').css({
            left: uploadImgAttr.left
        });
    });
    $('.btn-move-right').on('click', function() {
        uploadImgAttr.left++;
        $('.editor-upload, .editor-object').css({
            left: uploadImgAttr.left
        });
    });
    $('.btn-move-top').on('click', function() {
        uploadImgAttr.top--;
        $('.editor-upload, .editor-object').css({
            top: uploadImgAttr.top
        });
    });
    $('.btn-move-bottom').on('click', function() {
        uploadImgAttr.top++;
        $('.editor-upload, .editor-object').css({
            top: uploadImgAttr.top
        });
    });
    $('.btn-create').on('click', function() {
        var btnCreate = $(this);
        btnCreate.html('<i class="fa fa-spinner fa-spin fa-2x"></i>').attr('disabled', '');
        var requestData = {
            background: {
                width: $('.app-editor-content').width(),
                height: $('.app-editor-content').height()
            },
            frame: {
                width: $('.editor-frame').width(),
                height: $('.editor-frame').height()
            },
            upload: {
                width: $('.editor-upload').width(),
                height: $('.editor-upload').height(),
                top: $('.editor-upload').position().top,
                left: $('.editor-upload').position().left,
                rotate: uploadImgAttr.rotate
            }
        }
        var formData = new FormData;
        formData.append('background[width]', $('.app-editor-content').width());
        formData.append('background[height]', $('.app-editor-content').height());
        formData.append('frame[width]', $('.editor-frame').width());
        formData.append('frame[height]', $('.editor-frame').height());
        formData.append('frame[image]', frameAttr.image);
        formData.append('upload[width]', $('.editor-upload').width());
        formData.append('upload[height]', $('.editor-upload').height());
        formData.append('upload[top]', $('.editor-upload').position().top);
        formData.append('upload[left]', $('.editor-upload').position().left);
        formData.append('upload[rotate]', uploadImgAttr.rotate);
        formData.append('upload[image]', uploadImgAttr.image);
        if ($('.file-name').val()) {
            formData.append('file_name', $('.file-name').val());
        }
        if (uploadImgAttr.imageObj) {
            formData.append('file', uploadImgAttr.imageObj);
        }
        $.ajax({
            url: 'process.php',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(res) {
                btnCreate.html('<i class="fa fa-save fa-2x">').removeAttr('disabled');
                res = JSON.parse(res);
                if (res.error) {
                    return alert(res.error);
                }
                return window.open(res.path);
            }
        })
    });
    $('.btn-upload').click(function() {
        $('#file-input').click();
    });
    $('#file-input').change(function() {
        if (!$(this)[0].files[0]) {
            return;
        }
        uploadImgAttr.imageObj = $(this)[0].files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.btn-restore').trigger('click');
            $('.editor-upload').find('img').attr('src', e.target.result);
        }
        reader.readAsDataURL(uploadImgAttr.imageObj);
    });
})();