(function() {
    var recoupLeft = 0;
    var recoupTop = 0;
    var uploadImgAttr = {
        width: 400,
        top: 0,
        left: 0,
        rotate: 0,
        image: 'public/images/default.jpg'
    }
    var frameAttr = {
        width: 325,
        height: 204,
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
            stop: function() {},
            cursor: "move",
            // containment: "#editor-content",
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
            uploadImgAttr.rotate = ui.angle.current < 0 ? ui.angle.degrees : -ui.angle.degrees;
        },
    });
    /**
     * add square icon for rotate
     */
    $('.editor-object-rero div.ui-rotatable-handle').addClass("ui-rotatable-handle-sw");
    nw.addClass("ui-rotatable-handle-nw fa fa-square");
    ne.addClass("ui-rotatable-handle-ne fa fa-square");
    se.addClass("ui-rotatable-handle-se fa fa-square");
    $(".ui-rotatable-handle-sw").addClass('fa fa-square');
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
        $('.editor-object').css({
            width: uploadImgAttr.width,
            height: uploadImgAttr.height,
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
     * delete image
     */
    function deleteImage(path) {
        return $.ajax({
            url: 'delete.php?path=' + path,
            type: 'GET',
            success: function() {
                $('.file-preview-dialog').dialog("close");
            }
        });
    }

    function restore() {
        $('.editor-upload, .editor-object-rero, .editor-object').css({
            width: uploadImgAttr.width,
            height: uploadImgAttr.height
        });
        setPosition();
        $('.editor-upload').find('img').attr('src', 'public/images/default.jpg');
        $('.file-output').html('').removeAttr('title');
        $('.file-name').val('');
        $('.file-ext').val('jpg');
        $('.file-zoom').val('2');
        $('.editor-object-rero').css('transform', 'rotate(' + 0 + 'deg)').data('uiRotatable').angle(0);
    }
    /**
     * init
     */
    var imgDefaultObject = new Image();
    imgDefaultObject.src = uploadImgAttr.image;
    imgDefaultObject.onload = function() {
        uploadImgAttr.height = this.height * uploadImgAttr.width / this.width;
        uploadImgAttr.defaultHeight = uploadImgAttr.height;
        setImage();
        setPosition();
        initDraggable();
    }
    /**
     * event
     */
    $('.btn-restore').on('click', function() {
        uploadImgAttr.height = uploadImgAttr.defaultHeight;
        $('#file-input').val('');
        restore();
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
        if ($('.file-ext').val()) {
            formData.append('file_ext', $('.file-ext').val());
        }
        if ($('.file-zoom').val()) {
            formData.append('file_zoom', $('.file-zoom').val());
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
                btnCreate.html('<i class="fa fa-eye fa-2x">').removeAttr('disabled');
                res = JSON.parse(res);
                if (res.error) {
                    return $('.file-preview-dialog').html('<p style="text-align:center">' + res.error + '</p>').dialog({
                        modal: true,
                        buttons: {
                            Ok: function() {
                                $(this).dialog("close");
                            }
                        }
                    });
                }
                var fileName = res.path.replace(/public\/images\/(created|temp)\//g, '');
                return $('.file-preview-dialog').html('<img src="' + res.path + '" style="width: 100%; height: 100%; border-radius: 10px;"/>').dialog({
                    resizable: false,
                    draggable: false,
                    width: uploadImgAttr.width,
                    modal: true,
                    position: {
                        my: "center",
                        at: "top",
                        of : '.app-editor-content'
                    },
                    buttons: {
                        download: {
                            text: 'Download',
                            click: function() {
                                var x = new XMLHttpRequest();
                                x.open("GET", res.path, true);
                                x.responseType = 'blob';
                                x.onload = function(e) {
                                    download(x.response, fileName);
                                    deleteImage(res.path);
                                    $('.file-preview-dialog').dialog("close");
                                }
                                x.send();
                            }
                        },
                        delete: {
                            text: 'Delete',
                            click: function() {
                                deleteImage(res.path)
                            }
                        },
                        save: {
                            text: 'Save',
                            click: function() {
                                $.ajax({
                                    url: 'save.php?path=' + res.path,
                                    type: 'GET',
                                    success: function() {
                                        if (fileName.length >= 18) {
                                            fileName = fileName.substr(0, 15) + '...';
                                        }
                                        $('.file-output').html('<i class="fa fa-file-photo-o"></i> ' + fileName).attr('title', res.path.replace(/\/temp\//g, '/created/'));
                                        $('.file-preview-dialog').dialog("close");
                                    }
                                })
                            }
                        },
                    },
                    close: function(event, ui) {
                        deleteImage(res.path);
                    }
                });
            }
        })
    });
    $('button').click(function() {
        $('.file-output').html('');
    });
    $('.btn-upload').click(function() {
        $('#file-input').click();
    });
    $('#file-input').change(function() {
        if (!$(this)[0].files[0]) {
            return;
        }
        uploadImgAttr.imageObj = $(this)[0].files[0];
        var i = new Image();
        i.onload = function() {
            uploadImgAttr.height = this.height * uploadImgAttr.width / this.width;
            restore();
            $('.editor-upload').find('img').attr('src', this.src);
        }
        var _URL = window.URL || window.webkitURL;
        i.src = _URL.createObjectURL(uploadImgAttr.imageObj)
    });
})();