input.onButtonPressed(Button.AB, function () {
    SCD30.setCalibration400ppm()
    basic.showIcon(IconNames.Heart)
    music.playTone(262, music.beat(BeatFraction.Whole))
})
function displayCO2 () {
    wert = 50
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            if (wert < co2wert) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
            wert += 100
        }
    }
}
let co2wert = 0
let wert = 0
let istBereit = 0
let temperatur = 0
let version = 0
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)
serial.writeLine("Starting CO2-Ampel")
let SCD30ADR = 97
let GetDataReadyStatusCMD = 514
let ReadMeasurementCMD = 768
let GetVersionCMD = 53504
let StartPeriodicMeasurementCMD = 16
let RecalibrationValueCMD = 20996
basic.showString("CO2-AMPEL")
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)
// Protokollbeschreibung des Sensors
// https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9.5_CO2/Sensirion_CO2_Sensors_SCD30_Interface_Description.pdf
// CO2 Bewertung
// https://www.umweltbundesamt.de/sites/default/files/medien/pdfs/kohlendioxid_2008.pdf
basic.forever(function () {
    // warte eine Sekunde
    control.waitMicros(1000000)
    co2wert = SCD30.readCO2()
    // co2wert = scd30.lese_CO2_Wert()()
    serial.writeLine("")
    serial.writeString("")
    serial.writeNumber(co2wert)
    serial.writeString(";")
    serial.writeNumber(SCD30.readTemperature())
    serial.writeString(";")
    serial.writeNumber(SCD30.readHumidity())
    if (co2wert <= 800) {
        basic.setLedColor(0x008000)
    } else if (co2wert <= 1000) {
        basic.setLedColor(0xffff00)
    } else if (co2wert <= 1400) {
        basic.setLedColor(0xff8000)
    } else {
        basic.setLedColor(0xff0000)
    }
    displayCO2()
})
