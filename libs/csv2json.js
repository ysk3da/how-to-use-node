var csv2json = require('csv2json');
var fs = require('fs');

fs.createReadStream('csv/test.csv')
  .pipe(csv2json({
    // Defaults to comma.
    separator: ','
  }))
  .pipe(fs.createWriteStream('json/data.json'));