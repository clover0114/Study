$('#input').click(function () {
    var str = $('#str').val();
    $('#output').html("わたしは" + str + "です");
})

// header animation
var _window = $(window),
    _header = $('.header'),
    empty;

_window.on('scroll', function () {
    empty = $('.empty').height();
    if (_window.scrollTop() > empty) {
        _header.addClass('transform');
    } else {
        _header.removeClass('transform');
    }
});

_window.trigger('scroll');

//cat_imgをクリックしたら、中央に表示
var left = ($(window).width() - $('#largeImg').width()) / 2;
var top = $(window).scrollTop() + 30 + 'px';

$('#catImg').bind('click', function (e) {
    e.preventDefault();

    // 暗幕
    $('#cover').css({
        'width': $(window).width(),
        'height': $(window).height()
    }).show();

    // 猫
    $('#largeImg').css({
        'position': 'absolute',
        'left': ($(window).width() - $('#largeImg').width()) / 2,
        'top': $(window).scrollTop() + 300 + 'px',
    })
        .show();

    // 猫を閉じる
    $('#largeImg, #cover').bind('click', function () {
        $('#largeImg').fadeOut('slow', function () {
            $('#cover').hide();
        })
    })
});

