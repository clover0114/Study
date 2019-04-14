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

