exports.data = [
  {
    'raw' : new Buffer('Man ', 'ascii'),
    'enc' : {
      'ascii85' : '<~9jqo^~>',
      'z85' : 'o<}]Z'
    }
  },
  {
    'raw' : new Buffer('Man a', 'ascii'),
    'enc' : {
      'ascii85' : '<~9jqo^@/~>',
      'z85': 'o<}]Zve'
    }
  },
  {
    'raw' : new Buffer('Man ab', 'ascii'),
    'enc' : {
      'ascii85' : '<~9jqo^@:B~>',
      'z85': 'o<}]Zvpx',
    }
  },
  {
    'raw' : new Buffer('Man abc', 'ascii'),
    'enc' : {
      'ascii85' : '<~9jqo^@:E^~>',
      'z85' : 'o<}]ZvpAZ'
    }
  },
  {
    'raw' : new Buffer('Man abcd', 'ascii'),
    'enc'  : {
      'ascii85' : '<~9jqo^@:E_W~>',
      'z85' : 'o<}]ZvpA.S'
    }
  },
  {
    'raw' : new Buffer('Hello, world!!!!', 'ascii'),
    'enc' : {
      'ascii85' : '<~87cURD_*#TDfTZ)+X&!P~>',
      'z85' : 'nm=QNz.92Pz/PV8aT50L'
    }
  },
  {
    'raw' : new Buffer('', 'ascii'),
    'enc' : {
      'ascii85' : '<~~>',
      'z85' : ''
    }
  },
  {
    'raw' : new Buffer(
      'Man is distinguished, not only by his reason, but by this singular passion ' +
      'from other animals, which is a lust of the mind, that by a perseverance of ' +
      'delight in the continued and indefatigable generation of knowledge, exceeds ' +
      'the short vehemence of any carnal pleasure',
      'ascii'),
    'enc' : {
      'ascii85' : '<~9jqo^BlbD-BleB1DJ+*+F(f,q/0JhKF<GL>Cj@.4Gp$d7F!,L7@<6@)/0JDEF' +
                  '<G%<+EV:2F!,O<DJ+*.@<*K0@<6L(Df-\\0Ec5e;DffZ(EZee.Bl.9pF"AGXBPC' +
                  'si+DGm>@3BB/F*&OCAfu2/AKYi(DIb:@FD,*)+C]U=@3BN#EcYf8ATD3s@q?d$A' +
                  'ftVqCh[NqF<G:8+EV:.+Cf>-FD5W8ARlolDIal(DId<j@<?3r@:F%a+D58\'ATD' +
                  '4$Bl@l3De:,-DJs`8ARoFb/0JMK@qB4^F!,R<AKZ&-DfTqBG%G>uD.RTpAKYo\'' +
                  '+CT/5+Cei#DII?(E,9)oF*2M7~>',
      'z85' : 'o<}]Zx(+zcx(!xgzFa9aB7/b}efF?GBrCHty<vdjC{3^mB0bHmvrlv8efFzABrC4raA' +
              'RphB0bKrzFa9dvr9GfvrlH7z/cXfA=k!qz//V7AV!!dx(do{B1wCTxLy%&azC)tvixx' +
              'eB95Kyw/#hewGU&7zE+pvBzb98ayYQsvixJ2A=U/nwPzi%v}u^3w/$R}y?WJ}BrCpna' +
              'ARpday/tcBzkSnwN(](zE:(7zE^r<vrui@vpB4:azkn6wPzj3x(v(iz!pbczF%-nwN]' +
              'B+efFIGv}xjZB0bNrwGV5cz/P}xC4Ct#zdNP{wGU]6ayPekay!&2zEEu7Abo8]B9hIm'
    }
  },
  {
    'raw' : new Buffer([0xff]),
    'enc' : {
      'ascii85' : '<~rr~>',
      'z85' : '@@'
    }
  },
  {
    'raw' : new Buffer([0xff, 0xff, 0xff, 0xff]),
    'enc' : {
      'ascii85' : '<~s8W-!~>',
      'z85': '%nSc0'
    }
  },
  {
    'raw' : new Buffer(' '),
    'enc' : {
      'ascii85' : '<~+9~>',
      'z85': 'ao'
    }
  },
  {
    'raw' : new Buffer([0x0, 0x0, 0x0, 0x0]),
    'enc' : {
      'ascii85' : '<~z~>',
      'z85' : '00000'
    }
  },
  {
    'raw' : new Buffer([0xd6, 0x18, 0x0b, 0xf4]),
    'enc' : {
      'ascii85' : '<~eeeee~>',
      'z85' : '!!!!!'
    }
  }
];
