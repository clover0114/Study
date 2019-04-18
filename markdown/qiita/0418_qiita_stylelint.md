## 何ができるようになったか
画像は、```.em_2em```というセレクタが二つあります。
それに対して、セレクタ重複禁止のルールを設定しているので、その場で指摘され、なおかつ画面下のPROBLEMSタブでも注意してくれます。
このように、CSSに対し、提供されている中から好みのルールを選び、自由に追加していくことで、間違った記述にエラーを出すことができます。

![スクリーンショット 2019-04-18 20.34.36.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/295360/1e9a8ad5-b282-6f86-c2ea-f9a32caf7416.png)

## なぜこれをやりたかったか？
HTML/CSSでひととおりサイトを作った後、CSSのセレクタなどに重複がたくさんあったりして、これなんとかしたい！って思いました。でも手動でやるのはなんとなくクールじゃない気がするので、とにかく検索に検索を重ねたまとめです。



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



##  デバッグを行う
### MDNでデバッグを学ぶ

[MDN - HTMLのデバッグ](<https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML#Debugging_isn't_scary>)のページでは、HTML/CSSの両方、サンプルファイルをダウンロードし、[W3Cの公式サイト](<https://validator.w3.org/nu/#textarea>)で、デバッグを行う方法が紹介されている。

- ソースファイルをアップロードしてチェック
- ソースコードをペースとしてチェック
- URIをペースとしてチェック

という3つの方法が用意されている。



### vscodeにstylelintをインストールしてデバッグできるようにする

いちいちファイルをアップロードしたりするのは現実的でないし、エディター内で完結したほうがスマートな気がするので、cssデバッグとかそんな感じのワードで検索しまくった結果stylelintという方法にたどり着く。

そもそもlintってなん？って人は(自分もその部類ですが)

[ESLint 最初の一歩](<https://qiita.com/mysticatea/items/f523dab04a25f617c87d>)

要は文法エラーなどをチェックしてくれるツールのcss版。scss用などもあるらしい。

stylelintについては、導入方法が大きく分けて二つある。

- コードエディタにプラグインをインストール
- npm/yarnでインストール(node.jsベース)

僕はvscodeのプラグインを選びましたので、その方法を。

### 手順

1.[vscodeのプラグイン](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint#extension-settings)

2.vscodeのワークスペース設定に、以下を追加

   ```js
   {
       "stylelint.enable": true,
       "css.validate": false,
       "scss.validate": false
   }
   ```

3.プロジェクトルートディレクトリに、```.stylelintrc```を追加

4.```.stylelintrc```に、必要なルールを記述。

   ```js
   {
     "rules": {
       "ルール1": 値,
       "ルール2": 値
     }
   }
   ```

[追加できるルール](https://stylelint.io/user-guide/rules/#rules)



## 結果
自分はCSSのセレクター重複がいやだったので、それを解消できたので良かった。これを足がかりに、ルールを追加し、いい感じにしていけたらいいな、と思いました。