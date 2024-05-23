# Allgemeines

Das Repository enthält den Accespoint-Service. Der Service wurde entwickelt mit Node.js.

# Anleitung

Um den Service lokal aufzusetzen müssen folgende Schritte durchgeführt werden:

* Projekt klonen: In einem Terminal den Befehl: `git clone git@git.thm.de:lkhl72/accesspoint-service.git` ausführen.
* Projekt initialisieren: Mit einem Terminal in den Projektordner navigieren und den Befehl: `npm init -y` und `npm install express sqlite3` ausführen.
* Server starten: In dem Projektordner `node main.js` ausführen.


# Endpunkte 

| Endpunkt           | Methode | Beschreibung                                                                                       |
|--------------------|---------|----------------------------------------------------------------------------------------------------|
| /accesspoints      | GET     | Abrufen aller Accesspunkt                                                                  		|
| /accesspoints      | POST    | Einfügen eines neuen Accesspunkts                                                           		|
| /accesspoints/{id} | DELETE  | Löschen eines Accesspunkts mit der angegebenen ID                                           		|
| /accesspoints/{id} | Put     | Bearbeiten eines Accesspunkts mit der angegebenen ID                                       		|
