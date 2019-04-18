# マテリアルデザイン



## マテリアルデザインとは

1. 2次元に3次元を持ち込む

2. 画面部品に意味のある動きをつける

3. 1つの画面に使う色を4色程度に絞ることでそれぞれの色に意味を持たせる

## Androidのマテリアルテーマ

###テーマの確認

AndroidStudioでは、

[res] -> [valuesフォルダ] -> [styles.xml]

で

```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
```

が確認できる。この、

```
Theme.AppCompat.Light.DarkActionBar
```

の部分がまさにマテリアルテーマ。Android5.0以降で利用でき、

- Theme.Material : 明るい色のテーマ
- Theme.Material.Light : 明るい色のテーマ
- Theme.Material.Light.DarkActionBar : 明るい色で、アクションバーのみ暗い

の3種類がAndroidSDK標準で準備されている。

それ以前のバージョンのものは、Theme.Materialではなく、Theme.AppCompatという風に

親クラスが異なる。

###テーマの変更

AndroidManifest.xmlファイルで設定可能。

```
<application
    ...
    android:theme="@style/AppTheme">
```



## マテリアルデザインの4色

```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <!-- Customize your theme here. -->
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>
```

| 配色名称         | 内容                               | 使われているところ                 |
| ---------------- | ---------------------------------- | ---------------------------------- |
| colorPrimary     | メインとなる色                     | アクションバーの色                 |
| colorPrimaryDark | colorPrimaryと同系色で一段階濃い色 | アクションバーのさらに上のバーの色 |
| colorAccent      | アクセントカラー                   | colorPrimaryに対して目立つ色       |
| windowBackGround | 背景色                             | 画面の背景で使用されている色       |



## ScrollViewを利用したサンプル

マテリアルデザインで、**画面部品に動きをつける**ことをしていく

### 1. アクションバーより柔軟な、ツールバーを実装する

####手順

1. [styles.xml]の<style>タグの内容を変更する

```
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
```

2. layoutのxmlファイル、今回は[activity_scroll_article.xml]の一番上に以下を追記

```
<android.support.v7.widget.Toolbar
    android:id="@+id/toolBar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:background="@color/colorPrimary"
    android:elevation="10dp"/>
```

3. アクティビティのonCreate()にてToolbarの細かな設定をしたのち...

```
setSupportActionBar(toolbar);
```



今回Toolbarクラスは標準SDKのimport android.widget.Toolbarではなく、サポートライブラリのimport android.support.v7.widget.Toolbarなので注意

####layoutファイル解説

1. ?attr

テーマに含まれる属性。

?attr/actionBarSizeは、今回適用しているテーマのアクションバーの高さを利用、ということ。

2. android:elevation="10dp"

マテリアルデザインで影をつけている。アクションバーの下のうっすらとした影の大きさをこれで設定する。