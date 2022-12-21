# Node.js の使い方

公式サイト: [Node.js](https://nodejs.org/ja/)

Node.jsはJavaScriptを利用した開発環境を提供してくれます。
一言でいうと、様々な制作における作業を自動化するプログラムを利用できる、というイメージです。

npm (node package manager)というパッケージマネージャを利用して、
世界中のエンジニアが開発したライブラリを簡単に利用できる仕組みを提供してくれています。

The highly appriciated with all engineers!!

## 実際に使ってみましょう

まずどのようなことができるのか実際に使ってみましょう。

本プロジェクトでは、

- csvファイルをjsonファイルに変換する
- jsonファイルをcsvファイルに変換する

の２つをハンズオンでやってみます。

## VSCode のインストール

本プロジェクトでは、エディタはVSCodeを前提に解説しています。
インストールしていない方はインストールしてください。

[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)

## Node.js のインストール

まずは、Node.js を現在利用しているパソコンにインストールします。

[ダウンロード - Node.js](https://nodejs.org/ja/download/)

公式サイトからダウンロードします。
このとき、２つの選択肢がありますが、`LTS`とついたものをダウンロードしましょう。
`LTS`は、`Long Time Support`の頭文字で、長期サポートが保証されるバージョンのことを指します。

Windows も Mac もインストーラでインストールして構いません。
ただ、Macの場合はHomebrewなどのパッケージマネージャからインストールした方が、後々便利です。
どんどん新しいバージョンが出ていくなかでプロジェクトごとに異なるNode.jsのバージョンが必要な場合に切り替えが楽になります。

参考: [MacにNode.jsをインストールする方法！【インストール方法2パターン】](https://codelikes.com/mac-node-install/)

## プロジェクトの作成

ターミナルからmkdirしてもいいのですが、本プロジェクトでは、GUIで作成します。

Finder（Mac）やエクスプローラー（Windows）からフォルダを作成してください。
フォルダ名は `how-to-use-node` です。

作成したフォルダをVSCodeで開きましょう。

## プロジェクトの初期化

フォルダをVSCodeで開いたら、
念の為、Node.jsがインストールされていることを確認しましょう。
VSCodeの上部のメニューにある「ターミナル」をクリックして、「新しいターミナル」を選択してください。

```shell
# 下記一行を入力してEnterKeyを押す
node -v

# 下記のようにインストールしたバージョンが表示されればOKです。
v16.16.0
```

Node.js のインストールが確認できたら、初期化コマンドを打ちます。

```shell
npm init -y
```

`npm init`でもいいのですが、最初に色々と聞かれて、回答を入力するのが面倒なので、`-y`オプションを利用しましょう。

するとプロジェクトフォルダ内に`package.json`というファイルが作成されます。
本プロジェクトでは`package.json`の中身についてはさわりのみ後述します。

## 疑似データを用意しよう

本プロジェクトでは、jsonデータをcsvに変換するため、元データを用意します。

[疑似個人情報生成 - 生成条件入力](https://hogehoge.tk/personal/generator/)

※ Node.jsでcsvを扱う場合、エンコードは`UTF-8`である必要があります。

  Windowsでは`Shift_JIS`が標準になっているかと思いますので、`UTF-8`で保存し直す必要があります。

  一度、VSCodeでcsvファイルを開き、エディタウィンドウの右下にある`Shift_JIS`をクリックします。

  「エンコード付きで保存」、から`UTF-8`を選択することで、エンコードを変更できます。

ダウンロードしたcsvファイルをプロジェクトフォルダへ保存しましょう。

せっかくなのでコマンドラインからフォルダを作成、移動、ファイル作成までやってみましょう。

```shell
# make directory $dirname
mkdir csv

# show list
ls

# output
# README.md       csv             package.json

# move directory
cd csv

# make file $filename
touch test.csv
```

プロジェクトフォルダは下記のようになっているかと思います。

```shell
.
├── README.md
├── csv
│   └── test.csv
└── package.json
```

作成された test.csv に生成したcsvファイルをコピペしてください。

これで準備が整いました。

## packageをインストールしよう

では、早速jsonをcsvに変換するライブラリをインストールしていきましょう。

利用するライブラリは下記。

[csv2json](https://www.npmjs.com/package/csv2json)

使い方を読むと色々と書いてありますが、一旦、こちらの解説にしたがって操作してみましょう。

まずは install ですね。

install コマンドは、下記です。

```shell
npm install --save csv2json
```

実行すると、プロジェクトフォルダに`node_modules`フォルダと`package-lock.json`ファイルが生成されました。

一旦、ここは解説せずに手を動かしていきましょう。

## Stream ファイルを作成する

プロジェクトフォルダに`libs`フォルダを作成しましょう。

作成した`libs`フォルダの中に`csv2json.js`ファイルを作成します。

作成した`csv2json.js`ファイルに下記をコピペしてください。

```js
var csv2json = require('csv2json');
var fs = require('fs');

fs.createReadStream('data.csv')
  .pipe(csv2json({
    // Defaults to comma.
    separator: ';'
  }))
  .pipe(fs.createWriteStream('data.json'));
```

`separator: ';'`とあります。このままだとカンマではなくセミコロンで区切られている、という指示になっていまいますので、一旦デフォルトであるカンマに戻しましょう

`csv2json.js`

```diff
var csv2json = require('csv2json');
var fs = require('fs');

fs.createReadStream('data.csv')
  .pipe(csv2json({
    // Defaults to comma.
-    separator: ';'
+    separator: ','
  }))
  .pipe(fs.createWriteStream('data.json'));
```

次に、入力ファイルと出力ファイルを指定します。

先程作成したファイルは`test.csv`で`csv`フォルダに入っていますので、

```diff
var csv2json = require('csv2json');
var fs = require('fs');

- fs.createReadStream('data.csv')
+ fs.createReadStream('csv/test.csv')
  .pipe(csv2json({
    // Defaults to comma.
    separator: ','
  }))
  .pipe(fs.createWriteStream('data.json'));
```

こうですね。

では実行してみましょう。

実行コマンドは下記です。

```shell
node libs/csv2json.js
```

すると、プロジェクトフォルダに`data.json`とうファイルが作成されます。

`data.json`

```json
[
{"連番":"1","氏名":"米沢沙彩","氏名（カタカナ）":"ヨネザワサアヤ","性別":"女","電話番号":"0983762159","生年月日":"1986/11/22"},
{"連番":"2","氏名":"江藤文雄","氏名（カタカナ）":"エトウフミオ","性別":"男","電話番号":"0277228284","生年月日":"1968/09/06"},
{"連番":"3","氏名":"関晴久","氏名（カタカナ）":"カンハルヒサ","性別":"男","電話番号":"0731937597","生年月日":"1975/08/08"},
{"連番":"4","氏名":"神保愛","氏名（カタカナ）":"ジンボアイ","性別":"女","電話番号":"0942132539","生年月日":"1998/10/16"},
{"連番":"5","氏名":"勝又慎一郎","氏名（カタカナ）":"カツマタシンイチロウ","性別":"男","電話番号":"0875816768","生年月日":"1992/11/12"},
{"連番":"6","氏名":"山田桃華","氏名（カタカナ）":"ヤマダモモカ","性別":"女","電話番号":"0779002380","生年月日":"2001/11/08"},
{"連番":"7","氏名":"谷本孝男","氏名（カタカナ）":"タニモトタカオ","性別":"男","電話番号":"0591499258","生年月日":"1970/01/27"},
{"連番":"8","氏名":"鎌田里沙","氏名（カタカナ）":"カマタリサ","性別":"女","電話番号":"043131337","生年月日":"1974/11/16"},
{"連番":"9","氏名":"本山聖愛","氏名（カタカナ）":"モトヤマセイア","性別":"女","電話番号":"0447135492","生年月日":"1998/01/10"},
{"連番":"10","氏名":"河野彩夏","氏名（カタカナ）":"カワノサイカ","性別":"女","電話番号":"0465599939","生年月日":"1999/10/31"}
]
```

無事にcsvファイルをjsonファイルに変換できました。

次に、出力するフォルダを指定してみましょう。

`csv2json.js`

```diff
var csv2json = require('csv2json');
var fs = require('fs');

fs.createReadStream('csv/test.csv')
  .pipe(csv2json({
    // Defaults to comma.
    separator: ','
  }))
-  .pipe(fs.createWriteStream('data.json'));
+  .pipe(fs.createWriteStream('json/data.json'));
```

JavaScriptを書き換えたら、`json`フォルダをプロジェクトに作成します。

ディレクトリ構造は下記

```shell
.
├── README.md
├── csv
│   └── test.csv
├── json
├── libs
│   └── csv2json.js
├── package-lock.json
└── package.json
```

再度実行します。

```shell
node libs/csv2json.js
```

すると、`json`フォルダの中に、`data.json`ファイルが生成されます。

では、次にjsonファイルをcsvに戻しましょう。

## 新しいライブラリをインストールする

インストールするライブラリは下記です。

[json2csv](https://www.npmjs.com/package/json2csv)

```shell
npm install json2csv --save
```

## Stream ファイルを作成する

先程同様に`json2csv.js`ファイルを`libs`フォルダの中に作成しましょう。

`json2csv.js`

```js
const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('json2csv');

const fields = ['field1', 'field2', 'field3'];
const opts = { fields };
const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

const input = createReadStream(inputPath, { encoding: 'utf8' });
const output = createWriteStream(outputPath, { encoding: 'utf8' });
const json2csv = new Transform(opts, transformOpts);

const processor = input.pipe(json2csv).pipe(output);

// You can also listen for events on the conversion and see how the header or the lines are coming out.
json2csv
  .on('header', header => console.log(header))
  .on('line', line => console.log(line))
  .on('error', err => console.log(err));
```

上記が、webページで解説されているコードです。

必要なところに変更を加えていきましょう。

`json2csv.js`

```diff
const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('json2csv');

// 各項目は手動で設定する必要があります。
- const fields = ['field1', 'field2', 'field3'];
+ const fields = ['連番', '氏名', '氏名（カタカナ）', '性別', '電話番号', '生年月日'];
// Windowsで文字化けしないようにオプションを追加します。
const opts = { fields, withBOM: true };
const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

// 入力パスが未定義なので定義します。
+ const inputPath = 'json/data.json';
// 出力パスが未定義なので定義します。
+ const outputPath = 'csv/data.csv';

const input = createReadStream(inputPath, { encoding: 'utf8' });
const output = createWriteStream(outputPath, { encoding: 'utf8' });
const json2csv = new Transform(opts, transformOpts);

const processor = input.pipe(json2csv).pipe(output);

// You can also listen for events on the conversion and see how the header or the lines are coming out.
json2csv
  .on('header', header => console.log(header))
  .on('line', line => console.log(line))
  .on('error', err => console.log(err));
```

最終的に`json2csv.js`はこうなります。

```js
const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('json2csv');

// 各項目は手動で設定する必要があります。
const fields = ['連番', '氏名', '氏名（カタカナ）', '性別', '電話番号', '生年月日'];
const opts = { fields, withBOM: true };
const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

// 入力パスが未定義なので定義します。
const inputPath = 'json/data.json';
// 出力パスが未定義なので定義します。
const outputPath = 'csv/data.csv';

const input = createReadStream(inputPath, { encoding: 'utf8' });
const output = createWriteStream(outputPath, { encoding: 'utf8' });
const json2csv = new Transform(opts, transformOpts);

const processor = input.pipe(json2csv).pipe(output);

// You can also listen for events on the conversion and see how the header or the lines are coming out.
json2csv
  .on('header', header => console.log(header))
  .on('line', line => console.log(line))
  .on('error', err => console.log(err));
```

では実行してみましょう。

```shell
node libs/json2csv.js
```

ターミナルに出力結果が表示され、
`csv`フォルダ内に`data.csv`ファイルが生成されました。

## npm scripts を設定する

csvをjsonに、jsonをcsvに変換する仕組みを作成しました。

csvはEXCELやスプレッドシートでデータの編集を楽に行なえます。
jsonは、コード内でのデータのやり取りを楽に行なえます。

csvでデータを編集して、jsonでwebページやアプリケーションに反映することで業務を効率化しましょう。

でも、いちいちコマンド打ち込むの面倒ですよね？

VSCodeにはnpmスクリプトをクリックで実行できるGUIがあります。
そこで、npmスクリプトにコマンドを登録してみましょう。

まずは`package.json`ファイルを開きます。

```json
{
  "name": "how-to-use-node",
  "version": "1.0.0",
  "description": "公式サイト: [Node.js](https://nodejs.org/ja/)",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "csv2json": "^2.0.2",
    "json2csv": "^5.0.7"
  }
}
```

たくさん項目が並んでいますが、見るのは下記です。

```json
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

ここにコマンドを設定しましょう。

```diff
...
  "scripts": {
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "csv2json": "node libs/csv2json.js",
+    "json2csv": "node libs/json2csv.js"
  },
...
```

こうします。

`package.json`ファイルは下記のようになります。

```json
{
  "name": "how-to-use-node",
  "version": "1.0.0",
  "description": "公式サイト: [Node.js](https://nodejs.org/ja/)",
  "main": "index.js",
  "scripts": {
    "csv2json": "node libs/csv2json.js",
    "json2csv": "node libs/json2csv.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "csv2json": "^2.0.2",
    "json2csv": "^5.0.7"
  }
}
```

これで、コマンドとしては、

```shell
# csvをjsonに変換
npm run csv2json

# jsonをcsvに変換
npm run json2csv
```

というように、`npm run <scriptの名前>`で実行できるようになります。

また、VSCodeでは左のメニューの下部に「NPM スクリプト」というメニューが追加され、再生ボタンをクリックすることで、実行できるようになります。
（表示が来てない場合は、VSCodeを再読み込みまたは再起動してください。）

## 最後に

いかがでしたでしょうか。

難しかったですか？

ここから入力ファイル、出力ファイルの設定を便利したり、Shift_JISのエンコードを追加してみたり、様々なカスタマイズが考えられます。

作業を自動化する仕組みを作ることで、効率的に業務を遂行できますので、チャレンジしてみてください。