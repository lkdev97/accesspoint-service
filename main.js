const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = new sqlite3.Database('accesspoints.sqlite3');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS accesspoints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ssid TEXT,
        bssid TEXT,
        lat REAL,
        lng REAL,
        floor INTEGER,
        description TEXT,
        building TEXT
    )`);
});

/**
* GET http://localhost:{$port}/accesspoints/:id
* get accesspoint by id
*
* example with curl:
* curl -X GET localhost:3000/accesspoints/3
*
* @param id
* @return accesspoint
* @return status 404 when accesspoint with id doesn't exist
*/
app.get('/accesspoints/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM accesspoints WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send(`Accesspoint with ${id} not found`);
        }
        res.json(row);
    });
});

/**
* POST http://localhost:{$port}/accesspoints
* create a new accesspoint 
*
* example with curl:
* curl -X POST http://localhost:{$port}/accesspoints -H "Content-Type: application/json" -d "{\"ssid\":\"MoCaPos\",\"bssid\":\"bc:f2:af:ed:51:ef\",\"lat\":50.586996697117726,\"lng\":8.681672803676502,\"floor\":1,\"description\":\"Hinter dem Monitor\",\"building\":\"A20\"}"
*
* @return on success 201 status and id
* @return on error 500 status with error message
*/
app.post('/accesspoints', (req, res) => {
    const { ssid, bssid, lat, lng, floor, description, building } = req.body;
    const stmt = db.prepare('INSERT INTO accesspoints (ssid, bssid, lat, lng, floor, description, building) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run([ssid, bssid, lat, lng, floor, description, building], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json(`Accesspoint added with id: ${this.lastID} `);
    });
    stmt.finalize();
});

/**
* GET http://localhost:{$port}/accesspoints
* get all accesspoints 
*
* example with curl:
* curl -X GET localhost:3000/accesspoints
*
* @return accesspoints
*/
app.get('/accesspoints', (req, res) => {
    db.all('SELECT * FROM accesspoints', [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

/**
* DELETE http://localhost:{$port}/accesspoints
* delete accesspoint by id
*
* example with curl:
* curl -X DELETE localhost:3000/accesspoints/3
*
* @param id
* @return on success 200 status
* @return on error 500 status with error message
* @return status 404 when accesspoint with id doesn't exist
*/
app.delete('/accesspoints/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM accesspoints WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send(`Accesspoint with id ${id} not found`);
        }
        db.run('DELETE FROM accesspoints WHERE id = ?', [id], function(err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send(`Accesspoint with id ${id} deleted successfully`);
        });
    });
});

/**
* PUT http://localhost:{$port}/accesspoints/:id
* update accesspoint by id
*
* example with curl:
* curl -X PUT http://localhost:{$port}/accesspoints/3 -H "Content-Type: application/json" -d "{\"ssid\":\"MoCaPos\",\"bssid\":\"bc:f2:af:ed:51:ef\",\"lat\":50.586996697117726,\"lng\":8.681672803676502,\"floor\":2,\"description\":\"Hinter dem Monitor\",\"building\":\"A20\"}"
*
* @param id
* @return on success 200 status
* @return on error 500 status with error message
* @return status 404 when accesspoint with id doesn't exist
*/
app.put('/accesspoints/:id', (req, res) => {
    const id = req.params.id;
    const { ssid, bssid, lat, lng, floor, description, building } = req.body;
    db.get('SELECT * FROM accesspoints WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!row) {
            return res.status(404).send(`Accesspoint with id ${id} not found`);
        }
        db.run('UPDATE accesspoints SET ssid = ?, bssid = ?, lat = ?, lng = ?, floor = ?, description = ?, building = ? WHERE id = ?',
            [ssid, bssid, lat, lng, floor, description, building, id],
            function(err) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                res.status(200).send(`Accesspoint with id ${id} updated successfully`);
            }
        );
    });
});

/**
 * to start this service open a terminal in this folder `accesspoint-service` and execute `node main.js`
*/
app.listen(port, () => {
    console.log(`accesspoint service is now running at http://localhost:${port}`);
});
