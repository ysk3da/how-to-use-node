# 更新情報

## 2023-01-31 フィールドの自動取得

フィールドの自動取得を実装してみましょう。
対象ファイルは`libs/json2csv.js`です。

```js
const { createReadStream, createWriteStream, readFileSync } = require('fs');
const { Transform } = require('json2csv');

// 各項目は手動で設定する必要があります。-> 自動化（※深度1だけなので注意）
// let fields = ['連番', '氏名', '氏名（カタカナ）', '性別', '電話番号', '生年月日'];
let fields = [];

// 入力パスが未定義なので定義します。
const inputPath = 'json/data.json';
// jsonファイルのテキストを取得
const jsonText = readFileSync(inputPath, 'utf-8');
// keyの取得
const jsonParsed = JSON.parse(jsonText);
// const keyList = Object.keys(jsonParsed); // -> key=0 | value=[object Object] こうなる。keyは数字がインクリメントする

// for (let key in keyList) {
//   // 取得したkeyとvalueの確認
//   console.log(`key=${keyList[key]} | value=${jsonParsed[keyList[key]]} `);
// }

// 0番目（最初の1個)のkeyを取得する
fields = Object.keys(jsonParsed[0]);
// console.log(`chideKeyList=${Object.keys(jsonParsed[0])} `);

// 出力パスが未定義なので定義します。
const outputPath = 'csv/data.csv';

// Windowsで文字化けしないようにオプションを追加します。
const opts = { fields, withBOM: true };
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

9行目の`require`で`readFileSync`を追加しています。
調査するブログによっては、

```js
const fs = require('fs');

const something = fs.readFileSync('file-path');
```

みたいに書かれているかもしれません。
違いは自分で調べてみましょう。
キーワードは「名前付き require JavaScript」とかでしょうか。

14行目で、変数`field`の宣言を`const`から`let`に変更し、初期値として空の配列を代入しています。

18行目〜30行目が今回の追加部分の本体ですね。
`fs`ライブラリの`readFileSync`を利用して、jsonファイルからテキスト情報を取り出します。
取り出したテキスト情報を`parse`してオブジェクトに変換します。
変換したオブジェクト配列の最初の項目から`Object.keys`を利用して、`key`情報を取得して、
変数`field`へ代入します。

途中途中で、コメントアウトしている`console.log`を見てみてください。
どんなことをしているかわかると思います。

次回は、`inquirer.js`を利用してCLIアプリケーション化を行い、
ターミナルから入力ファイルと出力ファイルを指定できるようにしてみましょう。

- [inquirer.jsを使用してCLIアプリケーションに対話型インターフェースを導入する](https://www.mitsue.co.jp/knowledge/blog/frontend/201912/07_0000.html)
-[inquirer.js - npm](https://www.npmjs.com/package/inquirer)

## Reference

[JavaScript JSON Key一覧取得](https://mjeld.com/javascript-json-object-key/)