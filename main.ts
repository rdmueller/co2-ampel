input.onButtonPressed(Button.A, function () {
    muteDisplay = true
    basic.showString("Temp:" + SCD30.readTemperature() + "°C")
    muteDisplay = false
})
input.onButtonPressed(Button.AB, function () {
    muteDisplay = true
    SCD30.setCalibration400ppm()
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
    muteDisplay = false
})
input.onButtonPressed(Button.B, function () {
    muteDisplay = true
    basic.showString("Hum:" + SCD30.readHumidity() + "%")
    muteDisplay = false
})
function displayCO2 (myco2wert: number) {
    if (!muteDisplay) {
        wert = 50
        for (let y = 0; y <= 4; y++) {
            for (let x = 0; x <= 4; x++) {
                if (wert <= 800) {
                    bright = 16
                } else if (wert <= 1000) {
                    bright = 64
                } else if (wert <= 1400) {
                    bright = 128 + 64
                } else {
                    bright = 255
                }
                if (wert < myco2wert) {
                    led.plotBrightness(x, 4 - y, bright)
                } else {
                    led.plotBrightness(x, 4 - y, 0)
                }
                wert += 100
            }
        }
        if (myco2wert <= 800) {
            basic.setLedColor(0x008000)
        } else if (myco2wert <= 1000) {
            basic.setLedColor(0x804000)
        } else if (myco2wert <= 1400) {
            basic.setLedColor(0xff4000)
        } else {
            basic.setLedColor(0xff0000)
        }
    }
}
let muteDisplay = false
let co2wert = 0
let bright = 0
let wert = 0
let wert2 = 0
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate9600)
led.setDisplayMode(DisplayMode.Greyscale)
basic.showString("CO2-AMPEL 1.4")
serial.writeLine("")
serial.writeLine("")
serial.writeLine("Starting CO2-Ampel V1.4")
serial.writeLine("SCD30 Version: " + SCD30.getVersion())
serial.writeLine("calibration: " + SCD30.getCalibration())
serial.writeLine("press A+B together to set calibration to 400ppm")
serial.writeLine("ready...")
for (let demo = 0; demo <= 2500; demo++) {
    displayCO2(demo)
    basic.pause(2)
}
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
    displayCO2(co2wert)
})
