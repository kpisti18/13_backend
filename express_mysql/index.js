const express = require('express');
const mysql = require('mysql2');

const app = express();

const host = '127.0.0.1';
const port = 9000;

app.use(express.json());

// adatbázis kapcsolat
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'actors'
});

// --- végpontok ---
// alap végpont
app.get('/', (req, res) => {
    // res.statusCode = 200;
    // res.json({ message: 'Hello!' });
    res.status(200).json({ message: 'Hello!' });
});

// összes színész lekérése
app.get('/actors', (req, res) => {
    connection.query('SELECT * FROM `actor`', (err, result) => {
        // ha hibára futok
        if (err) {
            return res.status(500).json({ error: 'Hiba az adatbázisban', err });
        }

        //console.log(result);
        // ha üres a tábla
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nem található!' }); 
        }

        // ha minden oké
        return res.status(200).json(result);
    });
});

// egy színész adatinak lekérdezése id alapján
app.get('/actors/:actor_id', (req, res) => {
    const actor_id = req.params.actor_id;
    //console.log(actor_id);
    
    connection.query('SELECT * FROM `actor` WHERE `actor_id` = ?;', [actor_id], (err, result) => {
        // ha hibára futok
        if (err) {
            return res.status(500).json({ error: 'Hiba az adatbázisban', err });
        }

        //console.log(result);
        // ha üres a tábla
        if (result.length === 0) {
            return res.status(404).json({ error: 'Nem található!' });
        }

        // ha minden oké
        return res.status(200).json(result);
    });
});

// új színész hozzáadása
app.post('/actors', (req, res) => {
    //const actor = req.body.actor;
    //const name = req.body.name;
    const { actor, name } = req.body;
    //console.log(actor, name);
    
    connection.query('INSERT INTO `actor` (`actor_id`, `actor`, `name`) VALUES (NULL, ?, ?);', [actor, name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az adatbázisban', err });
        }

        //console.log(result);
        return res.status(201).json({ message: 'Sikeres beszúrás!', result });
    });
});

// egy színész törlése id alapján
app.delete('/actors/:actor_id', (req, res) => {
    const { actor_id } = req.params;
    //console.log(actor_id);
    
    connection.query('DELETE FROM actor WHERE `actor`.`actor_id` = ?', [actor_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az adatbázisban', err });
        }

        //console.log(result);
        // ha nem törölt semmit, mivel nem volt ilyen azonosító
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nem található' });
        }
        
        return res.status(204).send();
    });
});

// egy színész adatainak módosítása
app.put('/actors/:actor_id', (req, res) => {
    const { actor_id } = req.params;
    const { actor, name } = req.body;
    //console.log(actor_id, actor, name);

    connection.query('UPDATE actor SET actor = COALESCE(NULLIF(?, ""), actor), name = COALESCE(NULLIF(?, ""), name) WHERE actor_id = ?', [actor, name, actor_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az adatbázisban', err });
        }

        //console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nem található' });
        }

        return res.status(201).json({ message: 'Sikeres módosítás!' });
    });
});

// -----------------

app.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
});