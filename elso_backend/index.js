console.log('Hello World');

// nodeJS főbb paraméterek:
// __dirname (abszolút elérési út)
//console.log('Ennek a mappának az abszolút elérési útja: ' + __dirname); // konkatenáció = szövegösszefűzés
console.log(`Ennek a mappának az abszolút elérési útja: ${__dirname}`);

// __filename (abszolút elérési út + a fájl neve)
console.log(__filename);

// exports (modulokat tudunk vele kiszervezni, azaz exportálni)
// require (modulokat tudunk vele használni, azaz importálni)
// module (modulokba szervezhetünk vele dolgokat)

const osszead = require('./osszead');
const kivon = require('./kivon');
const szoroz = require('./szoroz');
const oszt = require('./oszt');

console.log(osszead(3, 17));
console.log(kivon(10, 17));
console.log(szoroz(3, 3));
console.log(oszt(6, 4));
