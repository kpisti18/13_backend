const express = require('express');
const mysql = require('mysql2');

const host = '127.0.0.1';
const port = 7000;

const app = express();

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'leggazdagabb_emberek'
});

app.use(express.json);

// --- végpontok ---
// - személyek -
// összes személy
app.get('/szemelyek', (req, res) => {
    db.query('SELECT * FROM szemelyek', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba', err });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nem található!' });
        }

        return res.status(200).json(result);
    });
});

// egy személy adatai
app.get('/szemelyek/:szemely_id', (req, res) => {
    const { szemely_id } = req.params;

    if (isNaN(szemely_id) || szemely_id < 1) {
        return res.status(400).json({ error: 'Hibás azonosító' });
    }

    db.query('SELECT * FROM szemelyek', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba', err });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nem található!' });
        }

        return res.status(200).json(result);
    });
});

// új személy hozzáadása
app.post('/szemelyek', (req, res) => {
    const { nev, szuletesi_ev, aktiv } = req.body;
    
    if (nev.length === 0 || szuletesi_ev.length === 0 || aktiv.length === 0) {
        return res.status(400).json({ error: 'Minden mezőt tölts ki' });
    }

    if (isNaN(alapitas_ev) || isNaN(aktiv)) {
        return res.status(400).json({ error: 'Számot adj meg' });
    }

    if (aktiv < 0 && aktiv > 1) {
        return res.status(400).json({ error: '0/1-et vagy true/false-t adj meg' });
    }
    
    db.query('INSERT INTO szemelyek (szemely_id, nev, szuletesi_ev, aktiv, letrehozva) VALUES (NULL, ?, ?, ?, current_timestamp())', [nev, szuletesi_ev, aktiv], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba' });
        }

        return res.status(201).json({ message: 'Sikeres felvétel', id: result.insertId });
    });
});



// - cégek -


// -----------------

app.listen(port, host, () => {
    console.log(`IP: http://${host}:${port}`);
})