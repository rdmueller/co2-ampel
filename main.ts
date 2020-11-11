function leseWert () {
    // checken, ob Werte anliegen
    pins.i2cWriteNumber(
    SC30ADR,
    ReadMeasurementCMD,
    NumberFormat.UInt16LE,
    true
    )
    // 4ms warten
    control.waitMicros(4000)
    co2wert = pins.i2cReadNumber(SC30ADR, NumberFormat.UInt32BE, true)
    // 4ms warten
    control.waitMicros(4000)
    temperaturwert = pins.i2cReadNumber(SC30ADR, NumberFormat.UInt32BE, true)
    // 4ms warten
    control.waitMicros(4000)
    luftfeuchtigkeitwert = pins.i2cReadNumber(SC30ADR, NumberFormat.UInt32BE, false)
}
function warte_bis_bereit () {
    istBereit = 0
    while (istBereit == 0) {
        // checken, ob Werte anliegen
        pins.i2cWriteNumber(
        SC30ADR,
        GetDataReadyStatusCMD,
        NumberFormat.UInt16LE,
        true
        )
        // 4ms warten
        control.waitMicros(4000)
        istBereit = pins.i2cReadNumber(SC30ADR, NumberFormat.UInt16BE, false)
        basic.showNumber(istBereit)
        control.waitMicros(4000)
    }
}
let istBereit = 0
let luftfeuchtigkeitwert = 0
let temperaturwert = 0
let co2wert = 0
let ReadMeasurementCMD = 0
let GetDataReadyStatusCMD = 0
let SC30ADR = 0
SC30ADR = 97
GetDataReadyStatusCMD = 514
ReadMeasurementCMD = 768
// Protokollbeschreibung
// 
// https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9.5_CO2/Sensirion_CO2_Sensors_SCD30_Interface_Description.pdf
basic.forever(function () {
    warte_bis_bereit()
    leseWert()
    basic.showString("CO2: ")
    basic.showNumber(co2wert)
    basic.showString("Temp: ")
    basic.showNumber(temperaturwert)
    basic.showString("Hum: ")
    basic.showNumber(luftfeuchtigkeitwert)
})
