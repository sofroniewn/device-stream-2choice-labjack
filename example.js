var device = require('./')
var address = {
  blueButton = 'FIO0',
  redButton = 'FIO2',
  blueLED = 'FIO1',
  redLED = 'FIO3',
}
var dStream = device.createStream(address)

dStream.write({blueLED: false, redLED: true})
dStream.on('data', console.log)