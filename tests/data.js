'use strict';

exports.data = [
  {
    'raw' : Buffer.from('Man ', 'ascii'),
    'enc' : {
      'btoa' : 'O<`^z',
      'a85' : '9jqo^',
      'ascii85' : '<~9jqo^~>',
      'z85pad' : 'o<}]Z',
      'z85' : 'o<}]Z'
    }
  },
  {
    'raw' : Buffer.from('Man a', 'ascii'),
    'enc' : {
      'btoa' : 'O<`^zVE',
      'z85pad' : 'o<}]Zve',
      'a85' : '9jqo^@/',
      'ascii85' : '<~9jqo^@/~>'
    }
  },
  {
    'raw' : Buffer.from('Man ab', 'ascii'),
    'enc' : {
      'btoa' : 'O<`^zVPX',
      'z85pad' : 'o<}]Zvpx',
      'a85' : '9jqo^@:B',
      'ascii85' : '<~9jqo^@:B~>'
    }
  },
  {
    'raw' : Buffer.from('Man abc', 'ascii'),
    'enc' : {
      'btoa' : 'O<`^zVPaz',
      'z85pad' : 'o<}]ZvpAZ',
      'a85' : '9jqo^@:E^',
      'ascii85' : '<~9jqo^@:E^~>'
    }
  },
  {
    'raw' : Buffer.from('Man abcd', 'ascii'),
    'enc'  : {
      'btoa' : 'O<`^zVPa!s',
      'ascii85' : '<~9jqo^@:E_W~>',
      'a85' : '9jqo^@:E_W',
      'z85pad' : 'o<}]ZvpA.S',
      'z85' : 'o<}]ZvpA.S'
    }
  },
  {
    'raw' : Buffer.from('Hello, world!!!!', 'ascii'),
    'enc' : {
      'btoa' : 'NM&qnZ!92pZ*pv8At50l',
      'ascii85' : '<~87cURD_*#TDfTZ)+X&!P~>',
      'z85' : 'nm=QNz.92Pz/PV8aT50L'
    }
  },
  {
    'raw' : Buffer.from('', 'ascii'),
    'enc' : {
      'btoa' : '',
      'ascii85' : '<~~>',
      'z85' : ''
    }
  },
  {
    'raw' : Buffer.from('Man is distinguished, not only by his reason, but by this singular passion ' +
      'from other animals, which is a lust of the mind, that by a perseverance of ' +
      'delight in the continued and indefatigable generation of knowledge, exceeds ' +
      'the short vehemence of any carnal pleasure',
      'ascii'),
    'enc' : {
      'btoa' : 'O<`^zX>%ZCX>)XGZfA9Ab7*B`EFf-gbRchTY<VDJc_3(Mb0BhMVRLV8EFfZabRc4RA' +
               'arPHb0BkRZfA9DVR9gFVRLh7Z*CxFa&K)QZ**v7av))DX>DO_b1WctXlY|;AZc?TVI' +
               'XXEb95kYW*~HEWgu;7Ze%PVbZB98AYyqSVIXj2a&u*NWpZI|V`U(3W*}r`Y-wj`bRc' +
               'PNAarPDAY*TCbZKsNWn>^>Ze$>7Ze(R<VRUI{VPb4$AZKN6WpZJ3X>V>IZ)PBCZf|#' +
               'NWn^b%EFfigV`XJzb0BnRWgv5CZ*p`Xc4cT~ZDnp_Wgu^6AYpEKAY);2ZeeU7aBO8^' +
               'b9HiM',
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
    'raw' : Buffer.from([0xff]),
    'enc' : {
      'btoa' : '{{',
      'ascii85' : '<~rr~>'
    }
  },
  {
    'raw' : Buffer.from([0xff, 0xff, 0xff, 0xff]),
    'enc' : {
      'btoa' : '|NsC0',
      'ascii85' : '<~s8W-!~>',
      'z85': '%nSc0'
    }
  },
  {
    'raw' : Buffer.from(' '),
    'enc' : {
      'btoa' : 'AO',
      'ascii85' : '<~+9~>'
    }
  },
  {
    'raw' : Buffer.from([0x0, 0x0, 0x0, 0x0]),
    'enc' : {
      'btoa' : '00000',
      'ascii85' : '<~z~>',
      'z85' : '00000'
    }
  },
  {
    'raw' : Buffer.from([0x86, 0x4F, 0xD2, 0x6F, 0xB5, 0x59, 0xF7, 0x5B]),
    'enc' : {
      'btoa' : 'hELLOwORLD',
      'ascii85' : '<~L/669[9<6.~>',
      'z85' : 'HelloWorld'
    }
  },
  {
    'raw' : Buffer.from([0x8E, 0x0B, 0xDD, 0x69, 0x76, 0x28, 0xB9, 0x1D, 0x8F, 0x24, 0x55,
                        0x87, 0xEE, 0x95, 0xC5, 0xB0, 0x4D, 0x48, 0x96, 0x3F, 0x79, 0x25,
                        0x98, 0x77, 0xB4, 0x9C, 0xD9, 0x06, 0x3A, 0xEA, 0xD3, 0xB7]),
    'enc' : {
      'btpa' : 'jtkvsb||?Wk0e!x?v=%`O-PnMc_o;4w4B)nI_lH6',
      'ascii85' : '<~NXOZWFssmAO!I_\\mZkbq9h:R7GpSi%[%,eR3pP2\'~>',
      'z85' : 'JTKVSB%%)wK0E.X)V>+}o?pNmC{O&4W4b!Ni{Lh6'
    }
  }
];
