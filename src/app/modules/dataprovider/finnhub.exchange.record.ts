import { ExchangeRecord } from './exchange.model';

export const EXCHANGE_MAP = new Map<string, ExchangeRecord>();

// code, name, mic, timezone, hour, close_date, country, source
const csv = `AS,NYSE EURONEXT - EURONEXT AMSTERDAM,XAMS,Europe/Amsterdam,09:00-17:40,,,https://www.tradinghours.com/exchanges/euronext
AT,ATHENS EXCHANGE S.A. CASH MARKET,ASEX,Europe/Athens,10:15-17:20,,,https://www.tradinghours.com/exchanges/ase-athens
AX,ASX - ALL MARKETS,XASX,Australia/Sydney,10:00-16:00,,AU,https://www.tradinghours.com/exchanges/asx
BA,BOLSA DE COMERCIO DE BUENOS AIRES,XBUE,America/Argentina/Buenos_Aires,10:30-17:15,,,https://www.tradinghours.com/exchanges/bcba
BC,BOLSA DE VALORES DE COLOMBIA,XBOG,America/Cuiaba,09:15-16:00,,,https://www.tradinghours.com/exchanges/bvc
BD,BUDAPEST STOCK EXCHANGE,XBUD,Europe/Budapest,08:15-17:20,,,https://www.tradinghours.com/exchanges/bse-budapest
BE,BOERSE BERLIN,XBER,Europe/Berlin,08:00-20:00,,,https://www.tradinghours.com/exchanges/xber
BK,STOCK EXCHANGE OF THAILAND,XBKK,Asia/Bangkok,09:30-17:00,,,https://www.tradinghours.com/exchanges/set
BO,BSE LTD,XBOM,Asia/Kolkata,09:00-16:00,,IN,https://www.tradinghours.com/exchanges/bse-bombay
BR,NYSE EURONEXT - EURONEXT BRUSSELS,XBRU,Europe/Brussels,09:00-17:30,,,https://www.tradinghours.com/exchanges/euronext-brussels
CN,CANADIAN NATIONAL STOCK EXCHANGE,XCNQ,America/New_York,08:00-17:00,,,https://www.tradinghours.com/exchanges/cnsx
CO,OMX NORDIC EXCHANGE COPENHAGEN A/S,XCSE,Europe/Copenhagen,09:00-17:00,,,https://www.tradinghours.com/exchanges/omxc-copenhagen
CR,CARACAS STOCK EXCHANGE,BVCA,America/Caracas,08:30-13:30,,,https://www.tradinghours.com/exchanges/bvcc
DB,DUBAI FINANCIAL MARKET,XDFM,Asia/Dubai,09:30-14:00,,,https://www.tradinghours.com/exchanges/dfm
DE,XETRA,XETR,Europe/Berlin,09:00-17:30,,DE,https://www.tradinghours.com/exchanges/xetr
DU,BOERSE DUESSELDORF,XDUS,Europe/Berlin,08:00:20:00,,,https://www.tradinghours.com/exchanges/xdus
F,DEUTSCHE BOERSE AG,XFRA,Europe/Berlin,08:00-20:00,,DE,https://www.tradinghours.com/exchanges/fsx
HE,NASDAQ OMX HELSINKI LTD,XHEL,Europe/Helsinki,10:00-18:30,,,https://www.tradinghours.com/exchanges/omxh-helsinki
HK,HONG KONG EXCHANGES AND CLEARING LTD,XHKG,Asia/Hong_Kong,09:00-16:10,,,https://www.tradinghours.com/exchanges/hkex
HM,HANSEATISCHE WERTPAPIERBOERSE HAMBURG,XHAM,Europe/Berlin,08:00-20:00,,,https://www.tradinghours.com/exchanges/xham
IC,NASDAQ OMX ICELAND,XICE,Atlantic/Reykjavik,09:30-15:30,,,https://www.tradinghours.com/exchanges/xice
IR,IRISH STOCK EXCHANGE - ALL MARKET,XDUB,Europe/Dublin,09:00-17:30,,,https://www.tradinghours.com/exchanges/ise
IS,BORSA ISTANBUL,XIST,Europe/Istanbul,09:40-18:10,,,https://www.tradinghours.com/exchanges/bist
JK,INDONESIA STOCK EXCHANGE,XIDX,Asia/Jakarta,08:45-15:15,,,https://www.tradinghours.com/exchanges/idx
JO,JOHANNESBURG STOCK EXCHANGE,XJSE,Africa/Johannesburg,09:00-17:00,,,https://www.tradinghours.com/exchanges/jse
KL,BURSA MALAYSIA,XKLS,Asia/Kuala_Lumpur,08:30-17:00,,,https://www.tradinghours.com/exchanges/myx
KQ,KOREA EXCHANGE (KOSDAQ),XKOS,Asia/Seoul,09:00-15:30,,KP,https://www.tradinghours.com/exchanges/kosdaq
KS,KOREA EXCHANGE (STOCK MARKET),XKRX,Asia/Seoul,08:00-18:00,,KP,https://www.tradinghours.com/exchanges/krx
L,LONDON STOCK EXCHANGE,XLON,Europe/London,08:00-16:30,,GB,https://www.tradinghours.com/exchanges/lse
LN,Euronext London,XLDN,,,,,
LS,NYSE EURONEXT - EURONEXT LISBON,XLIS,Europe/Lisbon,09:00-17:30,,,https://www.tradinghours.com/exchanges/euronext-lisbon
MC,BOLSA DE MADRID,XMAD,Europe/Madrid,09:00-17:30,,,https://www.tradinghours.com/exchanges/bme
ME,MOSCOW EXCHANGE,MISX,Europe/Moscow,09:30-19:00,,,https://www.tradinghours.com/exchanges/moex
MI,Italian Stock Exchange,XMIL,Europe/Rome,08:00-17:42,,,https://www.tradinghours.com/exchanges/mta
MU,BOERSE MUENCHEN,XMUN,Europe/Berlin,08:00-20:00,,,https://www.tradinghours.com/exchanges/xmun
MX,BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE),XMEX,America/Mexico_City,08:00-15:10,,,https://www.tradinghours.com/exchanges/bmv
NE,AEQUITAS NEO EXCHANGE,NEOE,America/Toronto,09:30-16:00,,,https://www.tradinghours.com/exchanges/neo
NL,Nigerian Stock Exchange,XNSA,Africa/Lagos,09:30-14:30,,,
NS,NATIONAL STOCK EXCHANGE OF INDIA,XNSE,Asia/Kolkata,09:00-16:00,,IN,https://www.tradinghours.com/exchanges/nse-india
NZ,NEW ZEALAND EXCHANGE LTD,XNZE,Pacific/Auckland,10:00-16:45,,,https://www.tradinghours.com/exchanges/nzx
OL,OSLO BORS ASA,XOSL,Europe/Oslo,08:15-17:30,,,https://www.tradinghours.com/exchanges/ose
PA,NYSE EURONEXT - MARCHE LIBRE PARIS,XPAR,Europe/Paris,09:00-17:30,,,https://www.tradinghours.com/exchanges/euronext-paris
PM,Philippine Stock Exchange,XPHS,Asia/Manila,09:30-13:00,,,https://www.tradinghours.com/markets/pse
PR,PRAGUE STOCK EXCHANGE,XPRA,Europe/Prague,08:00-17:00,,,https://www.tradinghours.com/exchanges/xpra
QA,QATAR EXCHANGE,DSMD,Asia/Qatar,09:00-13:15,,,https://www.tradinghours.com/exchanges/qe
RG,NASDAQ OMX RIGA,XRIS,Europe/Riga,09:00-16:30,,,https://www.tradinghours.com/exchanges/omxr-riga
SA,Brazil Bolsa - Sao Paolo,BVMF,America/Sao_Paulo,09:45-18:45,,,https://www.tradinghours.com/exchanges/bovespa
SG,BOERSE STUTTGART,XSTU,Asia/Amman,08:00-20:00,,,https://www.tradinghours.com/exchanges/xstu
SI,SINGAPORE EXCHANGE,XSES,Asia/Singapore,08:30-17:16,,,https://www.tradinghours.com/exchanges/sgx
SN,SANTIAGO STOCK EXCHANGE,XSGO,America/Santiago,09:30-16:00,,,https://www.tradinghours.com/exchanges/bvs
SR,SAUDI STOCK EXCHANGE,XSAU,Asia/Riyadh,10:00-15:10,"6,7",SA,https://www.tradinghours.com/exchanges/tadawul
SS,SHANGHAI STOCK EXCHANGE,XSHG,Asia/Brunei,09:15-15:30,,,https://www.tradinghours.com/exchanges/sse
ST,NASDAQ OMX NORDIC STOCKHOLM,XSTO,Europe/Stockholm,08:00-18:00,,,https://www.tradinghours.com/exchanges/xngm
SW,SWISS EXCHANGE,XSWX,Europe/Zurich,09:30-17:00,,,https://www.tradinghours.com/exchanges/six
SZ,SHENZHEN STOCK EXCHANGE,XSHE,Asia/Shanghai,09:15-15:00,,,https://www.tradinghours.com/exchanges/szse
T,TOKYO STOCK EXCHANGE-TOKYO PRO MARKET,XJPX,Asia/Tokyo,09:00-15:00,,,https://www.tradinghours.com/exchanges/jpx
TA,TEL AVIV STOCK EXCHANGE,XTAE,Asia/Jerusalem,09:45-17:14,"6,7",,https://www.tradinghours.com/exchanges/tase
TL,NASDAQ OMX TALLINN,XTAL,Europe/Tallinn,09:00-16:30,,,https://www.tradinghours.com/exchanges/omxt-tallinn
TO,TORONTO STOCK EXCHANGE,XTSE,America/Toronto,09:30-16:00,,,https://www.tradinghours.com/exchanges/tsx
TW,TAIWAN STOCK EXCHANGE,XTAI,Asia/Taipei,09:00-17:00,,TW,https://www.tradinghours.com/exchanges/twse
US,"US exchanges (NYSE, Nasdaq)","XNYS,XASE,BATS,ARCX,XNMS,XNCM,XNGS,IEXG",America/New_York,09:30-16:00,,,https://www.tradinghours.com/exchanges/nyse
V,TSX VENTURE EXCHANGE - NEX,XTSX,America/Toronto,09:30-16:15,,,https://www.tradinghours.com/exchanges/xtsx
VI,Vienna Stock Exchange,XWBO,Europe/Vienna,09:04-17:30,,,https://www.tradinghours.com/exchanges/vse
VN,"Vietnam exchanges including HOSE, HNX and UPCOM","HSTC, XSTC",Asia/Bangkok,09:00-15:00,,,https://www.tradinghours.com/exchanges/hose
VS,NASDAQ OMX VILNIUS,XLIT,Europe/Vilnius,09:00-16:30,,,https://www.tradinghours.com/exchanges/omxv-vilnius
WA,WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET,XWAR,Europe/Warsaw,08:30-17:05,,,https://www.tradinghours.com/exchanges/gpw
HA,Hanover Stock Exchange,XHAN,Europe/Berlin,,,,
SX,DEUTSCHE BOERSE Stoxx,,Europe/Berlin,,,,
TG ,DEUTSCHE BOERSE TradeGate ,,Europe/Berlin,,,,
SC,BOERSE_FRANKFURT_ZERTIFIKATE,,Europe/Berlin,,,,`;

const lines = csv.split('\n');
lines.forEach(line => {
  const entries = line.split(',');
  const record: ExchangeRecord = {
    code: entries[0],
    name: entries[1],
    mic: entries[2],
    timezone: entries[3],
    hour: entries[4],
    close_date: entries[5],
    country: entries[6],
    source: entries[7]
  };
  EXCHANGE_MAP.set(entries[0], record);
});
