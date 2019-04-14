document.getElementById('btnClose').onclick = function() {
	if (confirm('閉じてよろしいですか？')) {
		window.close();
	} else {
		alert('閉じるのを中止しました');
	}
}
