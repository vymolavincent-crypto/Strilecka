// ===== SEZNAM HER V HERNĚ =====
// Novou hru přidáš tak, že ji dáš do složky hry/<nazev>/ a připíšeš ji sem.
// Po každé změně zvyš VERZE o 1, aby si telefon stáhl novinky.
self.HERNA_VERZE = 31;
self.HERNA_HRY = [
  {
    id: 'neon-najezd',
    nazev: 'Neonový nájezd',
    popis: 'Vesmírná střílečka. Táhni prstem, sbírej krystaly a poraz bosse.',
    hraci: 1,
    ikona: 'hry/neon-najezd/icon-192.png',
    barva: '#7c6cff',
    soubory: ['hry/neon-najezd/', 'hry/neon-najezd/index.html', 'hry/neon-najezd/icon-192.png', 'hry/neon-najezd/icon-512.png'],
    uklada: true,
    klice: 'px_',
    stav: () => {
      const b = +localStorage.getItem('px_best') || 0, w = +localStorage.getItem('px_bwave') || 0;
      return b ? '🏆 Rekord ' + b.toLocaleString('cs-CZ') + (w ? ' · vlna ' + w : '') : '';
    }
  },
  {
    id: 'park',
    nove: true,
    nazev: 'Úklid v parku',
    popis: 'Kupuj lidi, kteří v parku hází odpadky. Sbírej je, vydělávej a kupuj popelářská auta.',
    hraci: 1,
    uklada: true,
    klice: 'park_',
    ikona: 'hry/park/ikona.png',
    barva: '#7dffa8',
    soubory: ['hry/park/', 'hry/park/index.html', 'hry/park/ikona.png'],
    stav: () => {
      try { const g = JSON.parse(localStorage.getItem('park_save')); if (!g) return '';
        const n = Object.values(g.own || {}).reduce((a, b) => a + b, 0);
        return '💰 ' + Math.floor(g.money).toLocaleString('cs-CZ') + ' Kč · lidí v parku: ' + n; } catch (e) { return ''; }
    }
  },
  {
    id: 'hokej',
    nazev: 'Vzdušný hokej',
    popis: 'Každý drží jednu stranu telefonu. Kdo dá první 7 gólů, vyhrává.',
    hraci: 2,
    ikona: 'hry/hokej/ikona.png',
    barva: '#ff6b6b',
    soubory: ['hry/hokej/', 'hry/hokej/index.html', 'hry/hokej/ikona.png']

  },
  {
    id: 'piskvorky',
    nazev: 'Piškvorky',
    popis: 'Pět značek v řadě vyhrává. Hraj s kamarádem nebo s počítačem.',
    hraci: 2,
    ikona: 'hry/piskvorky/ikona.png',
    barva: '#4d96ff',
    soubory: ['hry/piskvorky/', 'hry/piskvorky/index.html', 'hry/piskvorky/ikona.png']

  },
  {
    id: 'ctyri',
    nazev: 'Čtyři v řadě',
    popis: 'Házej kolečka do sloupců. Kdo první spojí čtyři, vyhrává.',
    hraci: 2,
    ikona: 'hry/ctyri/ikona.png',
    barva: '#ffb020',
    soubory: ['hry/ctyri/', 'hry/ctyri/index.html', 'hry/ctyri/ikona.png']

  }
  ,
  {
    id: 'souboj',
    nove: true,
    nazev: 'Vesmírný souboj',
    popis: 'Dvě lodě proti sobě. Uhýbej, střílej asteroidy a sbírej bonusy.',
    hraci: 2,
    ikona: 'hry/souboj/ikona.png',
    barva: '#5ee7ff',
    soubory: ['hry/souboj/', 'hry/souboj/index.html', 'hry/souboj/ikona.png']
  },
  {
    id: 'sumo',
    nove: true,
    nazev: 'Pixel Sumo',
    popis: 'Vystrč soupeře z plošiny, která se zmenšuje. Ťuknutím uděláš náraz.',
    hraci: 2,
    ikona: 'hry/sumo/ikona.png',
    barva: '#ff9a5c',
    soubory: ['hry/sumo/', 'hry/sumo/index.html', 'hry/sumo/ikona.png']
  },
  {
    id: 'blesk',
    nove: true,
    nazev: 'Bleskový souboj',
    popis: 'Pět rychlých výzev: reakce, přetahovaná, počítání, barvy a příklady.',
    hraci: 2,
    ikona: 'hry/blesk/ikona.png',
    barva: '#ffd166',
    soubory: ['hry/blesk/', 'hry/blesk/index.html', 'hry/blesk/ikona.png']
  },
  {
    id: 'lode',
    nazev: 'Námořní bitva',
    popis: 'Hledej a potop lodě soupeře. Hraj s počítačem nebo s kamarádem na jednom telefonu.',
    hraci: 2,
    nove: true,
    ikona: 'hry/lode/ikona.png',
    barva: '#2d8cff',
    soubory: ['hry/lode/', 'hry/lode/index.html', 'hry/lode/ikona.png']
  },
  {
    id: 'zavod',
    nazev: 'Závod raket',
    popis: 'Klepej na svou raketku v rohu telefonu. Závod pro 2 až 4 hráče na jednom telefonu.',
    hraci: '2-4',
    nove: true,
    ikona: 'hry/zavod/ikona.png',
    barva: '#ff6bd6',
    soubory: ['hry/zavod/', 'hry/zavod/index.html', 'hry/zavod/ikona.png']
  },
  {
    id: 'pexeso',
    nazev: 'Vesmírné pexeso',
    popis: 'Najdi stejné vesmírné obrázky. Hrají 2 až 4 hráči na jednom telefonu.',
    hraci: '2-4',
    nove: true,
    ikona: 'hry/pexeso/ikona.png',
    barva: '#7dffa8',
    soubory: ['hry/pexeso/', 'hry/pexeso/index.html', 'hry/pexeso/ikona.png']
  },
  {
    id: 'zrada',
    nazev: 'Zrádce na palubě',
    popis: 'Dlouhá hra pro 2 až 4 hráče. Mezi posádkou je zrádce, který sabotuje opravy lodi. Najdete ho?',
    hraci: '2-4',
    nove: true,
    ikona: 'hry/zrada/ikona.png',
    barva: '#ff6bd6',
    soubory: ['hry/zrada/', 'hry/zrada/index.html', 'hry/zrada/ikona.png']
  }
];