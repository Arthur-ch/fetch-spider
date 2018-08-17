const path = require('path');
const fs = require('fs');
const arrdata = { movie: [] };
module.exports = {
  opdata: (data, type) => {
    console.log(data);
    const source = data.subjects;
    source.map(item => { arrdata.movie.push(item); });
    this.opend();
  },
  opend: () => {
    const movieDest = fs.createWriteStream(path.resolve(__dirname) + '/data/douban' + '/movie.txt');

    movieDest.write(JSON.stringify(arrdata.movie));
    movieDest.end();
  },
  err: err => {
    throw new Error('Error infor____________', err)
  }
};
