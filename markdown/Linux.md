# 引用・参考サイト

[WEBプログラミングが面白いほどわかる本](https://read.amazon.com/kp/kshare?asin=B07DRB1JBS&id=10ygmjF8TZqC0N5ir-t0DQ&reshareId=DD7XFPSRKMRR0XPK556W&reshareChannel=system)

[VirtualBox+VagrantでUbuntu環境を作ってみる](https://qiita.com/ra_armz/items/1ca31edf40767ba0d719)

# 1. Ubuntu 導入



## 1-1. インストール・ゲームを遊ぶ・電源を切る

#### Terminal.app

~~~terminal
//Ubuntu用ディレクトリを作成してそこに移動
mkdir -p ~/vagrant/ubuntu64_16
cd ~/vagrant/ubuntu64_16

//vagrantへubuntuのインストール？
vagrant box add Ubuntu14.04 https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box

//vagrantの設定ファイルを作成
vagrant init
~~~



#### /vagrant/ubuntu64_16/Vagrantfile

GUI環境で使いたいので/vagrant/ubuntu64_16に生成されたVagrantfileを開き

~~~terminal
# config.vm.provider "virtualbox" do |vb|
#      # Display the VirtualBox GUI when booting the machine
#      vb.gui = true
#   
#      # Customize the amount of memory on the VM:
#      vb.memory = "1024"
#    end
~~~

を削除

`config.vm.box = "base"`となっている箇所を`vagrant add`した際の名前(今回は"Ubuntu14.04")に変更します

~~~terminal
//Ubuntuの起動
vagrant up
~~~

Ubuntuの利用にはSSHクライアントが必要だが、macには標準で搭載



#### SSHについて

Secure Shellの略称

暗号や認証の技術を利用して安全に外部のコンピュータと通信する仕組み、遠くにあるサーバーのメンテナンスなどに活用ができる



#### MacでUbuntuにつなぐ

~~~terminal
cd ~/vagrant/ubuntu64_16/
vagrant ssh
~~~

コンソールのタイトルバーにbashと表示 => macのコマンド操作

コンソールのタイトルバーにsshと表示 => ubuntuのコマンド操作



#### Ubuntuの日本語化

~~~terminal
//日本語環境を作成する
sudo loval-gen ja_JP.UTF-8
//起動時に日本語として起動する
echo export LANG=ja_JP.UTF-8 >> ~/.profile
source ~/.profile

//日本語化ができたか確認
date
//できていれば下のように表示される
2019年  1月 20日 日曜日 08:13:31 UTC
~~~



#### ゲームをプレイ

~~~terminal
//インストールに必要な情報の更新
sudo apt-get update
//Ubuntuにゲーム群をインストール
sudo apt-get install bsdgames
//この操作後に追加で 3,303 kB のディスク容量が消費されます。続行しますか? [Y/n]
y
//テトリスを起動
tetris-bsd
~~~

apt-getはパッケージマネージャ



#### パッケージマネージャとは

スマホのAppStoreやGooglePlayのようなもの

| 環境                      | 代表的なパッケージマネージャ |
| ------------------------- | ---------------------------- |
| Debian系Linux(Ubuntuなど) | APT                          |
| RedHat系Linux(CentOSなど) | yum                          |
| macOS(MacのOS)            | homebrew                     |
| Windows                   | Chocolatey, NuGet            |
| JavaScript                | npm                          |
| Ruby                      | RubyGems                     |
| Python                    | Anaconda, pip                |



#### Ubuntuを終了させる

~~~terminal
//SSH接続を終了 (仮想マシンからログアウトしたような状態にすぎず、仮想マシンの電源は入っている)
exit
//仮想マシンの電源を切る
cd ~ /vagrant/ubunts64_16
vagrant halt
~~~



## 1-2. スペースインベーダー

~~~terminal
cd ~ /vagrant/ubunts64_16
//起動
vagrant up
//SSH接続
vagrant ssh
//インベーダーゲームインストール
sudo apt-get install ninvaders
//インベーダーゲーム起動
ninvaders

//ゲーム画面でCtrl + C で終了
~~~



# 2. コンピュータの構成要素



#### Linuxの構成要素を調べる

~~~terminal
cd ~/vagrant/ubuntu64_16
vagrant up
vagrant ssh

//ハードウェア一覧を表示
sudo lshw -short

//HW構成が表示される
H/W path      Device     Class      Description
===============================================
                         system     VirtualBox ()
/0                       bus        VirtualBox
/0/0                     memory     128KiB BIOS
/0/1                     memory     495MiB System memory
/0/2                     processor  Intel(R) Core(TM) i5-4250U CPU @ 1.30GHz
/0/100                   bridge     440FX - 82441FX PMC [Natoma]
/0/100/1                 bridge     82371SB PIIX3 ISA [Natoma/Triton II]
/0/100/2                 display    VirtualBox Graphics Adapter
/0/100/3      eth0       network    82540EM Gigabit Ethernet Controller
/0/100/4                 generic    VirtualBox Guest Service
/0/100/7                 bridge     82371AB/EB/MB PIIX4 ACPI
/0/100/d                 storage    82801HM/HEM (ICH8M/ICH8M-E) SATA Controller [AHCI mode]
/0/3          scsi0      storage    
/0/3/0.0.0    /dev/sda   disk       42GB VBOX HARDDISK
/0/3/0.0.0/1  /dev/sda1  volume     39GiB EXT4 volume
~~~

| H/W path                         | Device                   | Class          | Description |
| -------------------------------- | ------------------------ | -------------- | ----------- |
| ハードウェアのパスという階層構造 | デバイス(部品)ごとの名称 | デバイスの分類 | 説明        |

| 名称                                                         | 説明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| processor  Intel(R) Core(TM) i5-4250U CPU @ 1.30GHz          | CPU。                                                        |
| memory     128KiB BIOS<br/>memory     495MiB System memory   | メモリ。BIOSはマザーボードがアクセス、もう一つはシステムがアクセスする。 |
| storage    82801HM/HEM (ICH8M/ICH8M-E) SATA Controller [AHCI mode]<br/>scsi0      storage | ストレージ。データを記録。HDDやSSD。                         |
| network    82540EM Gigabit Ethernet Controller               | **ネットワークデバイス。**82540EMというネットワーク通信機器が接続されていることを示している。NICやLANカードとも呼ばれる。コンピュータはこのデバイスを使ってインターネットとの通信を行う。 |
| display    VirtualBox Graphics Adapter                       | ディスプレイ。ここではvirtualBoxが用意した仮想的なディスプレイデバイスが表示されている。 |
| bus        VirtualBox                                        | バス。コンピュータにおけるデータの通り道。今まで登場したパーツは全てマザーボードに搭載され、バスを通じてつながっている。 |



#### コンピュータのアーキテクチャ

パソコンは、搭載された様々なデバイスを、バスでつないだ構造をしている。(つまりvirtualBoxはバス)

- バス
  - CPU
  - メモリ
  - ストレージ
  - ディスプレイ
  - ネットワーク



#### コンピュータの状態を知る

~~~terminal
//そのファイルやディレクトリがどれだけのストレージを消費しているかを表示
df /dev/sda1

//結果
Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       41251136 1443980  38071244   4% /

~~~



# 3. コマンドによるファイル操作



##3-1. ファイルとディレクトリの基本

#### ファイルとは

OSにおいてストレージに格納されるデータのまとまり。



#### ファイルとディレクトリ

ファイルとディレクトリは親子関係にあり、階層構造を持っている。

- 仕事フォルダ
  - 書類
    - テキスト
  - 提出
    - テキスト
    - 画像



## 3-2. ファイルとディレクトリをコマンドで扱う

| コマンド | できる操作                       |
| -------- | -------------------------------- |
| pwd      | 現在のディレクトリの表示         |
| ls       | ファイル・ディレクトリの一覧表示 |
| cd       | 現在のディレクトリを変更         |
| mkdir    | ディレクトリの作成               |
| rm       | ファイルやディレクトリの削除     |
| cp       | ファイルやディレクトリのコピー   |
| mv       | ファイルやディレクトリの移動     |
| find     | ファイルやディレクトリの検索     |



#### pwd (Print Working Directory)

現在ディレクトリのパスを表示

~~~terminal
//ubuntuを起動してSSH接続
vagrant up
vagrant ssh

//現在ディレクトリのパスを表示
pwd
/home/vagrant
~~~

##### パスの構造

| 部品     | 説明                                                   |
| -------- | ------------------------------------------------------ |
| /        | ルートディレクトリ。最上位のディレクトリ               |
| 絶対パス | **ルートディレクトリ**からのパス                       |
| 相対パス | **現在のディレクトリ(カレントディレクトリ)**からのパス |

| カレントディレクトリが/homeのとき、/home/vagrantを... | 記述                                    |
| ----------------------------------------------------- | --------------------------------------- |
| 絶対パスで書くと                                      | /home/vagrant                           |
| 相対パスで書くと                                      | ./vagrant または vagrant (./を省略可能) |



#### ls (List)

現在ディレクトリにあるファイルとディレクトリの一覧リストを表示

~~~terminal
//.ではじまるファイルも含め全て表示するというオプションでリスト表示
ls -a

//結果
.  ..  .bash_history  .bash_logout  .bashrc  .cache  .profile  .ssh
~~~

##### .(ドット)ファイル

ユーザが作成可能だが、さまざまなソフトウェアによって作られる設定ファイルや、一時的なファイルであることが多い。

| 種別       | 説明                                     |
| ---------- | ---------------------------------------- |
| .ファイル  | 現在のディレクトリを指し示すディレクトリ |
| ..ファイル | 1つ上の階層のディレクトリ                |

設定や、入力したコマンドの履歴、一時的なファイルなど。



#### cd (Change Directory)

現在のディレクトリを変更する。第一引数に移動先ディレクトリのパスを記述。

~~~terminal
ls ..
pwd

//結果
/home

ls

//結果
ubuntu  vagrant

cd vagrant
pwd

//結果
/home/vagrant

cd /
pwd

//結果
/

ls

//結果
bin  boot  dev  etc  home  initrd.img  lib  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  vagrant  var  vmlinuz

cd ~
pwd

//結果
/home/vagrand
~~~

##### ~(チルダ)

ホームディレクトリを表す。なんか困ったらcd ~ でホームディレクトリに戻って来れば良い。ホームボタン的な。



#### mkdir (Make Directory)

ディレクトリを作成する。第一引数で作成するディレクトリ名を記述

~~~terminal
mkdir tmp
mkdir workspace
ls

//結果
tmp workspace
~~~



#### rm (Remove)

ディレクトリやファイルを削除する。第一引数に削除するディレクトリまたはファイル名を記述して使う。

~~~terminal
cd tmp
mkdir a
mkdir b
ls
rm a

//結果
rm: cannot remove ‘a’: Is a directory
~~~

このままでは削除できず、rm: cannot remove ‘a’: Is a directoryと表示されてしまう。

rmではaというディレクトリを削除できないという意味。

そこで以下のように**第一引数**に**-r**をつけるか、**rmdir**という別のコマンドを使うことで削除が可能になる。

~~~~
//第一引数に-r 第二引数に削除対象ディレクトリ or ファイル
rm -r a
//単純に削除が可能なコマンド
rmdir b

//結果(a, bは削除された)
tmp workspace 
~~~~



#### cp (Copy)

ファイルやディレクトリをコピーする。第一引数にコピー元のファイルやディレクトリ名、第二引数にコピー先のファイルやディレクトリ名を記述する。

~~~~
//ホームディレクトリに移動
cd ~
//ディレクトリを、中身を含めて再帰的にコピーする -r 引数をつけてworkspaceにコピー
cp -r tmp workspace
//workspaceに移動して無事コピーされたか確認
cd workspace
ls

//結果
tmp
~~~~



#### mv (Move)

ファイルやディレクトリを移動する。

名前を変更するのにも利用。第一引数に移動するファイルやディレクトリ名、第二引数に移動先のディレクトリか、変更するディレクトリ名、またはファイル名を記述。

##### 名称を変更

~~~~
//ホームディレクトリのtmpディレクトリに移動してリスト表示
cd ~/tmp
ls

//結果
b

//bディレクトリをcに名称変更
mv b c
ls

//結果
c
~~~~



##### ディレクトリを移動

~~~~~
//ホームディレクトリに移動
cd ~

//tmp/cを、workcpace/tmpに移動して中身のリストを確認
mv tmp/c workspace/tmp
ls workspace/tmp

//結果
b c
~~~~~



#### find (find)

ファイルを探すことができる。

##### 通常検索

~~~~
//ホームディレクトリに移動
cd ~
//ファイルを検索
find

//結果
.
./workspace
./workspace/tmp
./workspace/tmp/b
./workspace/tmp/c
./.profile
./.bashrc
./tmp
./.bash_history
./.cache
./.cache/motd.legal-displayed
./.bash_logout
./.ssh
./.ssh/authorized_keys
~~~~

##### 条件つき検索

第一引数に検索したいディレクトリ名、そのあとにオプションで検索条件を記述

~~~~
cd ~
//カレントディレクトリから、名前がbというファイルとディレクトリを検索
find . -name b

//結果
./workspace/tmp/b
~~~~



##3-3. 共有フォルダを利用できるようにする

~~~~
cd /Users/vagrant/ubuntu64_16
mkdir workspace
~~~~

VSCodeで以下のファイルを開く

~~~~
/Users/apple/vagrant/ubuntu64_16/Vagrantfile
~~~~

##### /Vagrantfile

~~~~
//46-47行目あた利是を書き換える
# config.vm.synced_folder "../data", "/vagrant_data"
↓

//こんな感じに
# config.vm.synced_folder "./workspace", "/home/vagrant/workspace"

~~~~



ここから、vagrant reloadでmacとubuntuでファイル共有をしたいのだが、そんなディレクトリないよエラーが出る...

↓

解決。vagrantfileのあるディレクトリに、workspaceフォルダがないよエラーがちゃんとターミナルに吐き出されてた。なのでfinderで作った(ちょっと違う気はするけども)。そしたら正常に共有フォルダが利用できるようになった。



# Linux標準出力

#### リダイレクト

標準出力をファイルに保存する

~~~
//前準備
cd ~/vagrant/ubuntu64_16
vagrant up
vagrant ssh


~~~

~~~
cd ~

//tmpディレクトリが存在し、中身が空であることを確かめる
ls tmp

//リダイレクト。カレントディレクトリでlsコマンドを実行した結果 > //tmp/ls-output.txtに出力
ls > tmp/ls-output.txt

//tmpディレクトリのリスト表示(中身の確認)
ls tmp

//結果(中身にテキストが入っている)
ls-output.txt
~~~



#### catコマンド

複数ファイルの中身を結合、標準出力に出力できる

1つのファイル名だけを引数に使えば、ファイルの中身が表示される

~~~
cd ~

cat tmp/ls-output.txt

//結果(lsの結果)
tmp
workspace
~~~



#### less

catのようだが、表示量が多い場合にページ送りしながら表示するためのコマンド

与えられたファイルの中身をJとKで上下に移動、ページ移動しながら表示ができる

~~~
ls /bin > tmp/ls-output-bin.txt
less tmp/ls-output-bin.txt

//結果(JとKで上下移動)
chgrp
chmod
chown
chvt
cp
cpio
dash
...以下略...
~~~



#### | (パイプ)

標準出力を、別のコマンドの標準入力にすることができる

1つ目のコマンドの標準出力を、2つ目のコマンドの標準入力にできる

~~~
//ls /bin の結果の出力を、lessで開きページ送りしながら見る
ls /bin | less
~~~



#### grep

ファイルの中に含まれる単語を検索

~~~
ls /bin | grep ss

//結果(ssは赤字になっている)
bzless
less
lessecho
lessfile
lesskey
lesspipe
ss
uncompress
zless
~~~



