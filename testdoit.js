$('#input').click(function () {
    var str = $('#str').val();
    $('#output').html("わたしは" + str + "です");
})

// header animation
// 変数「heroBottom」にメイン画像エリアの高さを入れています。画像ですので、jQueryが読み込まれてすぐに変数に高さを入れようとすると正常な高さが取得できません。
// ですので、スクロール時に高さを変数に入れています
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

