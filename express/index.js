const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const host = '127.0.0.1';
const port = 7000;

app.use(express.json());

// alap endpoint
app.get('/', (req, res) => {
    // res.statusCode = 200;
    // res.json({ message: 'Hello World!' });
    res.status(200).json({ message: 'Hello World!' });
});

// összes színész lekérése endpoint
app.get('/actors', (req, res) => {
    //res.statusCode = 200;
    //res.sendFile(path.join(__dirname, 'actors.json'));
    res.status(200).sendFile(path.join(__dirname, 'actors.json'));
});

// új színész felvétele endpoint
app.post('/actors', (req, res) => {
    const newActor = req.body;
    //console.log(newActor);
    
    fs.readFile('./actors.json', (err, file) => {
        if (err) {
            return res.status(500).json({ error: 'Szerver hiba a fájl megnyitásakor' });
        }

        const actors = JSON.parse(file);
        //console.log(actors);
        //res.json(actors);
        
        let maxID = 0;
        actors.forEach(actor => {
            if (actor.id > maxID) {
                maxID = actor.id;
            }
        });
        //res.json(maxID)

        newActor.id = maxID + 1;
        //res.json(newActor);

        actors.push(newActor);
        //res.json(actors);

        fs.writeFile('./actors.json', JSON.stringify(actors, null, 2), () => {
            return res.status(201).json({ message: 'Sikeres színész felvétel' });
        });
    });
});

// egy meglévő színész törlése endpoint paraméterrel
app.delete('/actors/:id', (req, res) => {
    const deleteID = req.params.id;
    //console.log(deleteID);
    
    fs.readFile('./actors.json', (err, file) => {
        if (err) {
            return res.status(500).json({ error: 'Szerver hiba a fájl megnyitásakor' });
        }

        const actors = JSON.parse(file);
        //console.log(actors.length);
        
        const deleteIndex = actors.findIndex((actor) => {
            return actor.id == deleteID;
        });
        //console.log(deleteIndex);
        
        if (deleteIndex !== -1) {
            actors.splice(deleteIndex, 1);
            //console.log(actors);
            
            fs.writeFile('./actors.json', JSON.stringify(actors, null, 2), () => {
                res.statusCode = 204;
                res.send();
            });
        } else {
            res.statusCode = 404;
            res.json({ error: 'A keresett elem nem található!' });
        }
    });
});

app.listen(port, host, () => {
    console.log(`A szerver itt fut: http://${host}:${port}`);
});