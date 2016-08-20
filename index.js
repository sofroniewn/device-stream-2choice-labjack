var from = require('from2')
var writer = require('to2')
var duplexify = require('duplexify')
var NanoTimer = require('nanotimer')
var ljn = require('labjack-nodejs')
var createDeviceObject = ljn.getDevice()
var board = new createDeviceObject()
board.openSync()

module.exports = {
  createStream: function (address) {
    var readableStream = from.obj(function () {})
    var blueButton = 0
    var redButton = 0
    timer = new NanoTimer()
    timer.setInterval(function () {
      board.readMany([address.blueButton, address.redButton], console.log, function(value) {
        if (value[0] === 1 & value[0] !== blueButton) {
          readableStream.push({
            blueButton: true,
            redButton: false,
          })
        }
        if (value[1] === 1 & value[1] !== redButton) {
          readableStream.push({
            blueButton: false,
            redButton: true,
          })
        }
        blueButton = value[0]
        redButton = value[1]
      })
    }, '', '5m')

    var writableStream = writer.obj(function (data, enc, callback) {
      board.writeMany([address.blueLED, address.redLED], [+data.blueLED, +data.redLED], console.log, callback)
    })
    return duplexify.obj(writableStream, readableStream)
  }
}
