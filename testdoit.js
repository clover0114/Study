$('#input').click(function () {
    var str = $('#str').val();
    $('#output').html("わたしは" + str + "です");
})

// header animation
// 変数「heroBottom」にメイン画像エリアの高さを入れています。画像ですので、jQueryが読み込まれてすぐに変数に高さを入れようとすると正常な高さが取得できません。
// ですので、スクロール時に高さを変数に入れています
var _window = $(window),
    _header = $('.header'),
    heroBottom;

_window.on('scroll', function () {
    heroBottom = $('.heroBottom').height();
    if (_window.scrollTop() > heroBottom) {
        _header.addClass('transform');
    } else {
        _header.removeClass('transform');
    }
});

_window.trigger('scroll');

