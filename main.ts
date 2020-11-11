function leseWert () {
    // checken, ob Werte anliegen
    pins.i2cWriteNumber(
    SCD30ADR,
    ReadMeasurementCMD,
    NumberFormat.UInt16BE,
    false
    )
    // 4ms warten
    control.waitMicros(3000)
    co2wert = pins.i2cReadNumber(SCD30ADR, NumberFormat.UInt32BE, true)
    temperaturwert = pins.i2cReadNumber(SCD30ADR, NumberFormat.UInt32BE, true)
    luftfeuchtigkeitwert = pins.i2cReadNumber(SCD30ADR, NumberFormat.UInt32BE, false)
}
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
        basic.showNumber(istBereit)
        control.waitMicros(3000)
    }
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
let istBereit = 0
let luftfeuchtigkeitwert = 0
let temperaturwert = 0
let co2wert = 0
let GetVersionCMD = 0
let ReadMeasurementCMD = 0
let GetDataReadyStatusCMD = 0
let SCD30ADR = 0
let SCD30WRITE = 0
let SCD30READ = 195
SCD30WRITE += 194
SCD30ADR = 97
GetDataReadyStatusCMD = 514
ReadMeasurementCMD = 768
GetVersionCMD = 53504
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
