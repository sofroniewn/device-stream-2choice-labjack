# device-stream-2choice-labjack
Stream of two buttons and leds from labjack

```
npm install device-stream-2choice-stdin
```

This module listens to a red and blue button, and controls red and blue led connected to a labjack. Useful for providing input to experiment-stream-2choice modules.


## Usage
`js
var device = require('device-stream-2choice-labjack')
var address = {
  blueButton = 'FIO0',
  redButton = 'FIO2',
  blueLED = 'FIO1',
  redLED = 'FIO3',
}
var dStream = device.createStream(address)

dStream.write({blueLED: false, redLED: true})
dStream.on('data', console.log)
`

## API

#### var dStream = device.createStream(address)
Create a new duplex stream using pinout information in `address`. It produces as its readable component an object `{blueButton: bool, redButton: bool}` where bool is `true` or `false` for the blue and red button depending on whether the last button pressed was a 'b' or 'r'. As its writable component it accepts an object `{blueLED: bool, redLED: bool}`. It will then turn on the appropriate LED if either of those bool valuse are set to `true`.

## Licence
MIT