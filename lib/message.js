
var BufferUtils = require('./bufferutils');

var Message = function(code, payload) {
  this.code = code;
  this.payload = payload;
};

Message.prototype.writeTo = function(stream) {
  var length = 1 + (this.payload ? this.payload.length : 0);
  stream.write(BufferUtils.fromInt(length));

  var code = new Buffer(1);
  code[0] = this.code;
  stream.write(code);

  if (this.payload) {
    stream.write(this.payload);
  }
};

Message.KEEPALIVE = -1;
Message.CHOKE = 0;
Message.UNCHOKE = 1;
Message.INTERESTED = 2;
Message.UNINTERESTED = 3;
Message.HAVE = 4;
Message.BITFIELD = 5;
Message.REQUEST = 6;
Message.PIECE = 7;
Message.CANCEL = 8;
Message.PORT = 9;

module.exports = Message;