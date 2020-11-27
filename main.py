def readCalibration():
    pins.i2c_write_number(SCD30ADR,
        RecalibrationValueCMD,
        NumberFormat.UINT16_BE,
        False)
    buffer = pins.i2c_read_buffer(SCD30ADR, 2)
    serial.write_line("buffer: " + str(buffer[0]) + "/" + str(buffer[1]))
def getVersion():
    global version
    pins.i2c_write_number(SCD30ADR, GetVersionCMD, NumberFormat.UINT16_BE, False)
    version = pins.i2c_read_number(SCD30ADR, NumberFormat.UINT16_BE, False)
    serial.write_line("version: " + str(version))
    pins.i2c_write_number(SCD30ADR, GetVersionCMD, NumberFormat.UINT16_BE, False)
    buffer2 = pins.i2c_read_buffer(SCD30ADR, 2)
    serial.write_line("version2: " + str(buffer2[0]) + "/" + str(buffer2[1]))
    serial.write_line("version3: " + str((buffer2[0] * 256 + buffer2[1])))
    pins.i2c_write_number(SCD30ADR, GetVersionCMD, NumberFormat.UINT16_BE, False)
    buffer2 = pins.i2c_read_buffer(SCD30ADR, 3)
    serial.write_line("version2: " + str(buffer2[0]) + "/" + str(buffer2[1]) + "/" + str(buffer2[2]))
def displayCO2():
    global wert
    wert = 50
    for x in range(5):
        for y in range(5):
            if wert < co2wert:
                led.plot(x, y)
            else:
                led.unplot(x, y)
            wert += 100
co2wert = 0
wert = 0
version = 0
RecalibrationValueCMD = 0
GetVersionCMD = 0
SCD30ADR = 0
istBereit = 0
temperatur = 0
SCD30ADR = 97
GetDataReadyStatusCMD = 514
ReadMeasurementCMD = 768
GetVersionCMD = 53504
StartPeriodicMeasurementCMD = 16
RecalibrationValueCMD = 20996
basic.show_string("CO2-AMPEL")
serial.redirect_to_usb()
serial.set_baud_rate(BaudRate.BAUD_RATE9600)
readCalibration()
getVersion()
# Protokollbeschreibung des Sensors
# https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/9.5_CO2/Sensirion_CO2_Sensors_SCD30_Interface_Description.pdf
# CO2 Bewertung
# https://www.umweltbundesamt.de/sites/default/files/medien/pdfs/kohlendioxid_2008.pdf

def on_forever():
    global co2wert
    control.wait_micros(1000000)
    co2wert = SCD30.read_co2() - 192
    # co2wert = scd30.lese_CO2_Wert()()
    serial.write_line("")
    serial.write_string("")
    serial.write_number(co2wert)
    serial.write_string(";")
    serial.write_number(SCD30.read_temperature())
    serial.write_string(";")
    serial.write_number(SCD30.read_humidity())
    if co2wert <= 800:
        basic.set_led_color(0x008000)
    elif co2wert <= 1000:
        basic.set_led_color(0xffff00)
    elif co2wert <= 1400:
        basic.set_led_color(0xff8000)
    else:
        basic.set_led_color(0xff0000)
    displayCO2()
basic.forever(on_forever)
