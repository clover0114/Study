##カメラの起動

onCameraImageClick()で実装。

onCameraImageClick()で、Intentの引数に、カメラを起動するMediaStore.ACTION_IMAGE_CAPTUREを利用すれば

カメラ起動し写真を撮る準備を行ってくれる。その状態でstartActivityResultとし、引数にrequestCodeを設定しonActivityResultで戻ってきたbitmapを表示。これが簡単なバージョン。

```
//Intentオブジェクトを生成
Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//アクティビティを起動
startActivityForResult(intent, 200);
```



##ストレージ経由

だがこのままだと画像が粗い上撮った画像が保存されないので、ストレージに一旦画像を保存し、そこからActivityで画像を引き出すやり方をする。onCameraImageClick()でIntentを起動する前に、ストレージアクセスのパーミッションダイアログの処理を行う。

ストレージ保存が必要なので、画像のネーミングとしてSimpleDataFormatでタイムスタンプを生成、ContentValuesオブジェクトで生成した画像の名前を画像に関連付け、ファイルタイプを設定。

ContentResolverオブジェクトでURIを生成。

その上でIntentを起動しかつ、intent.putExtraとし追加情報で

```
intent.putExtra(MediaStore.EXTRA_OUTPUT, _imageUri)
```

としstartActivityForResultすることで、撮った画像をストレージに、任意の名前で出力するタイプのMediaStore.ACTION_IMAGE_CAPTUREが起動する。



なお、パーミッションダイアログを一度許可するなどして、次回以降アプリを起動した際は、onRequestPermissionResult()が起動し

直接onCameraImageClick()メソッドが起動するので、その際には画面部品であるImageViewを明示的に引数に指定する必要がある。

```
onCameraImageClick(ivCamera);
```