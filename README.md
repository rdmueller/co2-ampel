
> Diese Seite bei [https://rdmueller.github.io/co2-ampel/](https://rdmueller.github.io/co2-ampel/) öffnen

Dieses Projekt implementiert eine CO2-Ampel mit [Calliope mini](https://calliope.cc) und SCD30 CO2-Sensor in der Groovy version.

* Siehe auch https://www.umwelt-campus.de/forschung/projekte/iot-werkstatt/ideen-zur-corona-krise
* Informationen zum Sensor: https://www.sensirion.com/de/umweltsensoren/kohlendioxidsensor/kohlendioxidsensoren-co2/ 
* Protokollbeschreibung des Sensors: https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9.5_CO2/Sensirion_CO2_Sensors_SCD30_Interface_Description.pdf
* https://www.umweltbundesamt.de/sites/default/files/medien/pdfs/kohlendioxid_2008.pdf

Zum Kalibrieren des Sensors sollte er ca. 10 Minuten frische Lust sehen, so dass er einen Wert von 400ppm anzeigen müsste.
Anschliessend wird er auf 400ppm kalibriert, indem A+B zusammen gedrück werden.

Damit die Kalibrierung nicht aus versehen kaputt gemacht wird, sollte nach erfolgreicher Kalibrierung eine Version mit deaktivierter Kalibrierungsfunktion aufgespielt werden.

Der CO2-Wert wird auf dem 5x5 Display angezeigt, wobei eine LED 100ppm entsprechen (der Wert wird kaufmännisch gerundet dargestellt).

Die Temperatur wird mit Druck auf A, die Luftfeuchtigkeit mit Druck auf B angezeigt.
Die Temperatur ist jedoch nicht kalibriert.

Die Messwerte werden auch über USB als serielle Daten (9600 Baud) ausgegeben, so dass sie aufgezeichnet werden können.

Ein Video steht unter https://twitter.com/RalfDMueller/status/1332226297997692928 zur Verfügung.

## Dieses Projekt bearbeiten ![Build Status Abzeichen](https://github.com/rdmueller/co2-ampel/workflows/MakeCode/badge.svg)

Um dieses Repository in MakeCode zu bearbeiten.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge **https://github.com/rdmueller/co2-ampel** ein und klicke auf Importieren

## Blockvorschau

Dieses Bild zeigt den Blockcode vom letzten Commit im Master an.
Die Aktualisierung dieses Bildes kann einige Minuten dauern.

![Eine gerenderte Ansicht der Blöcke](https://github.com/rdmueller/co2-ampel/raw/v2/.github/makecode/blocks.png)

#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
