# AndroidStudioApp -FireBaseの利用-

[【Android】Firebaseを利用したToDoアプリ開発](https://qiita.com/Nabe_LiT/items/660e97150fb87a2e7ffd)

## Notes

#### ブランチを作成したが、masterで作業を進めてた

##### 対策

1. 作ったばかりのdevelop削除

2. masterである程度の粒度の作業をこなしたら、コミットし、developをもう一度作成し、そっちに移って作業



#### New

- fill_parent
  - match_parentの旧バージョン
- android:hint="メールアドレスを入力"
  - EditText属性。そこに何を入力するのか、ヒントを表示できる。
- android:singleLine="true"
  - １行表示に制約することができる

```xml
android:textAppearance="?android:attr/textAppearanceMedium"
```

> appearance = 外観
>
> テキストの外観をMediumに設定

```xml
android:layout_gravity="center_horizontal|top"
```

> gravityは部品の中(テキスト文字などの)位置指定。
>
> layout_gravityは、レイアウトの中での位置指定。



## LoginActivityの作成

> LoginActivityの機能として、
>
> - Googleアカウントでのログイン
> - メールでのログインさせるための画面推移
>
> の２点の作成をしました。
>
> まず、FirebaseのAuthenticationのログイン方法の`メール/パスワード`、`Google`を有効にしましょう。



### [GoogleApiClient](https://qiita.com/inuko/items/ea08b26f3429758ced72)

> Googleが提供しているサービスに対して、接続するためのクライアント
> 接続例としては、Wearable, Location, Drive, Recognizationなど

### [Androidの新しいSignInApiについて](https://qiita.com/syarihu/items/1c67816ad926f08d76d8)

ログインすると

- ユーザに許可されたAPIが使えたり
- ユーザから許可された情報を取得できたり
- ユーザのアカウントの、アカウントに接続されているアプリ一覧に表示される

#### GoogleApiClientオブジェクトの生成について

```java
mGoogleApiClient = new GoogleApiClient.Builder(this)
    .enableAutoManage(this /* FragmentActivity */, this /* OnConnectionFailedListener */)
    .addScope(mScope)
    .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
    .build();
```

##### enableAutoManage()

> ここで使用しているenableAutoManageメソッドの第一引数にはFragmentActivityを、第二引数にはGoogleApiClient#OnConnectionFailedListenerをActivityに実装しておく必要があります。

SignInButton

> SignInButton
>
> public final class SignInButtonはFrameLayoutを拡張します
> View.OnClickListenerを実装します。
> ユーザーを認証するためのGoogleサインインボタン。 このクラスはボタンの視覚的側面のみを処理します。 アクションを起動するには、setOnClickListener（OnClickListener）を使ってリスナーを登録します。
>
> setOnClickListener（OnClickListener）を明示的に呼び出す必要があります。 XMLを介してリスナーを登録しないでください。コールバックを受け取ることはできません。



