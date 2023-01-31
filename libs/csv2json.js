var csv2json = require('csv2json');
var fs = require('fs');

// ファイル名の設定
const targetFile = 'feature1-230131';

fs.createReadStream(`csv/${targetFile}.csv`)
  .pipe(csv2json({
    // Defaults to comma.
    separator: ','
  }))
  .pipe(fs.createWriteStream(`json/${targetFile}.json`));