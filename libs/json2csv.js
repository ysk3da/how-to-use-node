const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('json2csv');

// 各項目は手動で設定する必要があります。
const fields = ['連番', '氏名', '氏名（カタカナ）', '性別', '電話番号', '生年月日'];
// Windowsで文字化けしないようにオプションを追加します。
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