function warte_bis_bereit () {
    istBereit = 0
    while (istBereit == 0) {
        // checken, ob Werte anliegen
        pins.i2cWriteNumber(
        SCD30ADR,
        GetDataReadyStatusCMD,
        NumberFormat.UInt16BE,
        false
        )
        // 4ms warten
        control.waitMicros(3000)
        istBereit = pins.i2cReadNumber(SCD30ADR, NumberFormat.UInt16BE, false)
        control.waitMicros(3000)
    }
}
function startMeasurement () {
    // checken, ob Werte anliegen
    pins.i2cWriteNumber(
    SCD30ADR,
    StartPeriodicMeasurementCMD,
    NumberFormat.UInt16BE,
    false
    )
}
function leseWert () {
    // checken, ob Werte anliegen
    pins.i2cWriteNumber(
    SCD30ADR,
    ReadMeasurementCMD,
    NumberFormat.UInt16BE,
    false
    )
    // 3ms warten
    control.waitMicros(3000)
    co2wert = pins.i2cReadNumber(SCD30ADR, NumberFormat.Float32BE, true)
    temperatur = input.temperature()
}
function getVersion () {
    // checken, ob Werte anliegen
    pins.i2cWriteNumber(
    SCD30ADR,
    GetVersionCMD,
    NumberFormat.UInt16BE,
    false
    )
    basic.showNumber(pins.i2cReadNumber(SCD30ADR, NumberFormat.UInt16BE, false))
}
let wert = 0
let temperatur = 0
let co2wert = 0
let istBereit = 0
let StartPeriodicMeasurementCMD = 0
let GetVersionCMD = 0
let ReadMeasurementCMD = 0
let GetDataReadyStatusCMD = 0
let SCD30ADR = 0
SCD30ADR = 97
GetDataReadyStatusCMD = 514
ReadMeasurementCMD = 768
GetVersionCMD = 53504
StartPeriodicMeasurementCMD = 16
warte_bis_bereit()
basic.showString("CO2-AMPEL")
// Protokollbeschreibung des Sensors
// https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9.5_CO2/Sensirion_CO2_Sensors_SCD30_Interface_Description.pdf
// CO2 Bewertung
// https://www.umweltbundesamt.de/sites/default/files/medien/pdfs/kohlendioxid_2008.pdf
basic.forever(function () {
    warte_bis_bereit()
    startMeasurement()
    leseWert()
    if (co2wert <= 800) {
        basic.setLedColor(0x008000)
    } else if (co2wert <= 1000) {
        basic.setLedColor(0x408000)
    } else if (co2wert <= 1400) {
        basic.setLedColor(0x804000)
    } else {
        basic.setLedColor(0xff0000)
    }
    wert = 0
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
})
