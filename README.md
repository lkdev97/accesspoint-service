# Allgemeines

Das Repository enthält den Accespoint-Service. Der Service wurde entwickelt mit Node.js.

# Anleitung

Um den Service lokal aufzusetzen müssen folgende Schritte durchgeführt werden:

* Projekt klonen: In einem Terminal den Befehl: `git clone git@git.thm.de:lkhl72/accesspoint-service.git` ausführen.
* Projekt initialisieren: Mit einem Terminal in den Projektordner navigieren und den Befehl: `npm init -y` und `npm install express sqlite3` ausführen.
* Server starten: In dem Projektordner `node main.js` ausführen.

Der Service wurde unter der Verwendung von Node.js **v20.11.1** und npm **10.4.0** entwickelt.\
Für die Datenbank wurde **"sqlite3": "^5.1.7"** und **"express": "^4.19.2"** verwendet.
Auserdem wurde noch für ein Hilfskript **synAccessPoints.js** das Paket **"axios": "^1.7.2"** genutzt.

# Endpunkte 

| Endpunkt           | Methode | Beschreibung                                                                                       |
|--------------------|---------|----------------------------------------------------------------------------------------------------|
| /accesspoints      | GET     | Abrufen aller Accesspunkte                                                                  		|
| /accesspoints      | POST    | Einfügen eines neuen Accesspunkts                                                           		|
| /accesspoints/{id} | DELETE  | Löschen eines Accesspunkts mit der angegebenen ID                                           		|
| /accesspoints/{id} | PUT     | Bearbeiten eines Accesspunkts mit der angegebenen ID                                       		|

# Datebank

Die mitgeliefert SQLite3 Datei **accesspoints.sqlite3** wurde mit Testdaten gefüllt.