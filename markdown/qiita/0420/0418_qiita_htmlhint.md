## 何ができるようになったか

htmlファイルを編集しているとき、間違いがあると、**カスタマイズ可能なルールに基づき**その場で警告を出してくれるようになりました。

画像は、本来は以下のようにするべきところを、

```html
<article>スラッシュ忘れ</article>
```

以下のようにしてしまっているような(emmet使えば起きないようなミスですが)シンプルな失敗例です。

```html
<article>スラッシュ忘れ<article>
```

![スクリーンショット 2019-04-20 10.07.56.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/295360/f7e21817-a0af-3145-d5b0-7c769bbcf95d.png)

## なぜこれをやりたかったか？

HTML/CSSでひととおりサイトを作った後、[stylelintを導入しcssのデバッグを行ったことで、](https://qiita.com/hidamaryclover/items/aca058d1f2fdd262b7d5)似たようなことってhtmlでもできるんじゃない？って思って試しました。



## そもそもデバッグってなんぞや

[MDN - HTMLのデバッグ](<https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML#Debugging_isn't_scary>)

一般的にエラーは２種類に大別される

- ロジックエラー
- シンタックスエラー

ロジックエラーは、そもそものコードの作り方、考え方が間違っているというもの。

シンタックスエラーは、HTMLやCSS自体は悩まされにくい。なぜなら最近のモダンブラウザが構文解析エラーがあったとしてもそれをある程度空気を読んで画面にいい感じに表示してしまう。

事実、自分も古いソース改修で、こういうHTMLを書いてしまっていたけど、

```html
<table class="table_1">
　　<table class="table_2"></table>
</table>
```

本来はこう。



```html
<table class="table_1">
   <tr>
     <td>
    	<table class="table_2"></table>
     </td>
   <tr>
</table>
```



だけど、chromeのデベロッパーツールを見ると、いい感じに表示してくれている(本当に些細に違うところはあるけど)。なお、間違ったコードはデベロッパーツールでは

```html
<table class="table_1">
</table>
<table class="table_2"></table>
```

なんかこういう感じに表示されていた。

つまり、こういったことを、ソースを書くのがひと段落したら、デベロッパーツールとか言う以前にチェックしておきたいよねってことだと解釈しました。



## デバッグを行う

### MDNでデバッグを学ぶ

[MDN - HTMLのデバッグ](<https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML#Debugging_isn't_scary>)のページでは、HTML/CSSの両方、サンプルファイルをダウンロードし、[W3Cの公式サイト](<https://validator.w3.org/nu/#textarea>)で、デバッグを行う方法が紹介されている。

- ソースファイルをアップロードしてチェック
- ソースコードをペースとしてチェック
- URIをペースとしてチェック

という3つの方法が用意されている。



### vscodeにHTMLHintをインストールしてデバッグできるようにする

![スクリーンショット 2019-04-20 9.46.50.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/295360/4775d59c-2699-5021-553c-f4fe000915f5.png)

そもそもなんとかlintってなん？って人は(自分もその部類ですが)

[ESLint 最初の一歩](<https://qiita.com/mysticatea/items/f523dab04a25f617c87d>)

要は文法エラーなどをチェックしてくれるツールのhtml版。

HTMLhintについては、導入方法が大きく分けて二つある。

- コードエディタにプラグインをインストール
- npmでインストール

僕はvscodeのプラグインを選びましたので、その方法を。

### 手順

1.[vscodeのプラグイン](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint)

2.プロジェクトルートディレクトリに、```.htmlhintrc```追加

3.```.htmlhintrc```に、[デフォルトのルール](https://github.com/htmlhint/HTMLHint/wiki/Rules)を記述。

*```.htmlhintrc```は追加しなくてもHTMLHintは動作します。その場合はデフォルトのルールが適用されますが、ルールのカスタマイズをしたい場合は```.htmlhintrc```を作成する必要があります。詳しくは[公式ドキュメント](https://github.com/htmlhint/HTMLHint/wiki/Usage#about-rules)を参照ください。

```js
   {
  "tagname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "attr-value-not-empty": false,
  "attr-no-duplication": true,
  "doctype-first": true,
  "tag-pair": true,
  "empty-tag-not-self-closed": true,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "title-require": true,
  "alt-require": true,
  "doctype-html5": true,
  "id-class-value": "dash",
  "style-disabled": false,
  "inline-style-disabled": false,
  "inline-script-disabled": false,
  "space-tab-mixed-disabled": "space",
  "id-class-ad-disabled": false,
  "href-abs-or-rel": false,
  "attr-unsafe-chars": true,
  "head-script-disabled": true
}
```



## 結果

現時点でvscode標準のhtml.validateでもそんなに不便はしていなかったけど、意図的に入れたってところが重要かなって言い聞かせてます。笑