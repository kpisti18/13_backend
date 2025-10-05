const express = require('express');
const mysql = require('mysql2');

const host = '127.0.0.1';
const port = 9000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'jelenleti',
    timezone: 'Z'
});

// --- végpontok ---
// összes dolgozó lekérdezése
app.get('/dolgozok', (req, res) => {
    connection.query('SELECT * FROM jelenleti_iv', (err, result) => {
        if (err) {
            console.log(err);

            return res.status(500).json({ error: 'Hiba a lekérdezés során!' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nem található!' });
        }

        return res.status(200).json(result);
    });
});

// egy dolgozó adatainak lekérése
app.get('/dolgozok/:id', (req, res) => {
    const { id } = req.params;
    //console.log(id);
    
    if (isNaN(id) || id < 1 || id % 1 !== 0) {
        return res.status(400).json({ error: 'Hibás azonosító!' });
    }

    connection.query('SELECT * FROM jelenleti_iv WHERE id=?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba a lekérdezésben!', err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Nem található!négy!!!four!' });
        }

        res.status(200).json(result);
    });
});

// új dolgozó felvétele
app.post('/dolgozok', (req, res) => {
    const { nev, jelenlet, fizetes, datum } = req.body;
    //console.log(nev, jelenlet, fizetes, datum);
    
    if (isNaN(jelenlet) || isNaN(fizetes)) {
        return res.status(400).json({ error: 'Számot adj meg te kis butus!' });
    }

    if (jelenlet != 0 && jelenlet != 1 ) {
        return res.status(400).json({ error: '0-t vagy 1-et vagy true-t vagy false-t adj meg!' });
    }

    if (!nev || !jelenlet || !fizetes || !datum) {
        return res.status(400).json({ error: 'Minden mezőt tölts ki' });
    }

    connection.query('INSERT INTO jelenleti_iv (id, nev, jelenlet, fizetes, datum) VALUES (NULL, ?, ?, ?, ?)', [nev, jelenlet, fizetes, datum], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba!' });
        }

        console.log(result);

        return res.status(201).json({
            message: 'Sikeres feltöltés!',
            id: result.insertId
        });
    });
});

// egy dolgozó törlése
app.delete('/dolgozok/:id', (req, res) => {
    const { id } = req.params;
    //console.log(id);
    
    if (isNaN(id) || id < 1 || id % 1 !== 0) {
        return res.status(400).json({ error: 'Pozitív egész számot adj meg!' });
    }

    connection.query('DELETE FROM jelenleti_iv WHERE id=?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Hiba az adatbázisban!', err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'A felhasználó nem található!' });
        }

        return res.status(204).send();
    });
});

// egy dolgozó adatainak módosítása
app.put('/dolgozok/:id', (req, res) => {
    const { id } = req.params;
    const { nev, jelenlet, fizetes, datum } = req.body;
    //console.log(id, nev, jelenlet, fizetes, datum);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Hibás id' });
    }

    if (!nev || !jelenlet || !fizetes || !datum) {
        return res.status(400).json({ error: 'Minden mezőt tölts ki' });
    }
    
    
});

app.listen(port, host, () => {
    console.log(`IP: http://${host}:${port}`);
})