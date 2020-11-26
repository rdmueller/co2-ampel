input.onButtonPressed(Button.AB, function () {
    SCD30.setCalibration400ppm()
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
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
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)
serial.writeLine("Starting CO2-Ampel")
basic.showString("CO2-AMPEL V1.0")
serial.writeLine("SCD30 Version: "+SCD30.getVersion())
serial.writeLine("calibration: "+SCD30.getCalibration())
serial.writeLine("press A+B together to set calibration to 400ppm")
serial.writeLine("ready...")
// Protokollbeschreibung des Sensors
// https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9.5_CO2/Sensirion_CO2_Sensors_SCD30_Interface_Description.pdf
// CO2 Bewertung
// https://www.umweltbundesamt.de/sites/default/files/medien/pdfs/kohlendioxid_2008.pdf
basic.forever(function () {
    // warte zwei Sekunden
    basic.pause(2000)
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
