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
    // 4ms warten
    control.waitMicros(3000)
    co2wert = pins.i2cReadNumber(SCD30ADR, NumberFormat.Float32BE, false)
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
let co2wert = 0
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
// Protokollbeschreibung
// 
// https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9.5_CO2/Sensirion_CO2_Sensors_SCD30_Interface_Description.pdf
basic.forever(function () {
    warte_bis_bereit()
    startMeasurement()
    leseWert()
    basic.showString("CO2: ")
    basic.showNumber(co2wert)
})
