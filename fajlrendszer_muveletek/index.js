const http = require('http');
const fs = require('fs');

const host = '127.0.0.1';
const port = 7000;

const server = http.createServer((req, res) => {
    switch (true) {
        // alap endpoint
        case req.url === '/' && req.method === 'GET':
            res.setHeader('content-type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'Hello World!' }));
            break;

        // összes színész lekérdezése endpoint
        case req.url === '/actors' && req.method === 'GET':
            fs.readFile('./actors.json', (err, file) => {
                // ha hibára futok a fájl megnyitásakor
                if (err) {
                    res.setHeader('content-type', 'application/json');
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Szerver oldali hiba a fájl olvasásakor!' }));
                    return;
                }
                // ha meg tudta nyitni a fájlt, akkor küldjük vissza json üzenetként a fájlt (a fájl már egy json alapból ebben az esetben)
                res.setHeader('content-type', 'application/json');
                res.statusCode = 200;
                res.end(file);
            });
            break;

        // új színész hozzáadása endpoint
        case req.url === '/actors' && req.method === 'POST':
            fs.readFile('./actors.json', () => {
                // kiszedjük a beérkező kérés body-ból az adatokat
                let body = '';

                req.on('data', (chunk) => {
                    //console.log(chunk);
                    body += chunk.toString();
                });
                
                req.on('end', () => {
                    const newActor = JSON.parse(body);
                    //console.log(newActor);
                    
                    // beolvassuk a fájlt
                    fs.readFile('./actors.json', (err, file) => {
                        if (err) {
                            res.setHeader('content-type', 'application/json');
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: 'Szerver hiba a fájl olvasásakor!' }));
                            return;
                        }
                        // elmentjük a fájl tartalmát egy objectbe
                        const actors = JSON.parse(file);
                        //console.log(actors);

                        let maxID = 0;
                        actors.forEach(actor => {
                            //console.log(actor);
                            if (actor.id > maxID) {
                                maxID = actor.id;
                            }
                        });

                        //console.log(maxID);
                        newActor.id = maxID + 1;
                        //console.log(newActor);
                        
                        actors.push(newActor);
                        //console.log(actors);
                        
                        fs.writeFile('./actors.json', JSON.stringify(actors, null, 2), () => {
                            res.setHeader('content-type', 'application/json');
                            res.statusCode = 201;
                            res.end(JSON.stringify(newActor));
                        });
                    });
                });
            });
            break;

        // minden más eset (ha nincs ilyen végpont):
        default:
            res.setHeader('content-type', 'application/json');
            res.statusCode = 404;
            res.end(JSON.stringify({ error: '404 - Nem található!' }));
    }
});

server.listen(port, host, () => {
    console.log(`A szerver itt fut: http://${host}:${port}`);
});