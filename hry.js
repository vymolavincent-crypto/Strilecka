// ===== SEZNAM HER V HERNĚ =====
// Novou hru přidáš tak, že ji dáš do složky hry/<nazev>/ a připíšeš ji sem.
// Po každé změně zvyš VERZE o 1, aby si telefon stáhl novinky.
self.HERNA_VERZE = 3;
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
    stav: () => {
      const b = +localStorage.getItem('px_best') || 0, w = +localStorage.getItem('px_bwave') || 0;
      return b ? '🏆 Rekord ' + b.toLocaleString('cs-CZ') + (w ? ' · vlna ' + w : '') : '';
    }
  },
  {
    id: 'hokej',
    nazev: 'Vzdušný hokej',
    popis: 'Každý drží jednu stranu telefonu. Kdo dá první 7 gólů, vyhrává.',
    hraci: 2,
    ikona: 'hry/hokej/ikona.svg',
    barva: '#ff6b6b',
    soubory: ['hry/hokej/', 'hry/hokej/index.html', 'hry/hokej/ikona.svg']

  },
  {
    id: 'piskvorky',
    nazev: 'Piškvorky',
    popis: 'Pět značek v řadě vyhrává. Hraj s kamarádem nebo s počítačem.',
    hraci: 2,
    ikona: 'hry/piskvorky/ikona.svg',
    barva: '#4d96ff',
    soubory: ['hry/piskvorky/', 'hry/piskvorky/index.html', 'hry/piskvorky/ikona.svg']

  },
  {
    id: 'ctyri',
    nazev: 'Čtyři v řadě',
    popis: 'Házej kolečka do sloupců. Kdo první spojí čtyři, vyhrává.',
    hraci: 2,
    ikona: 'hry/ctyri/ikona.svg',
    barva: '#ffb020',
    soubory: ['hry/ctyri/', 'hry/ctyri/index.html', 'hry/ctyri/ikona.svg']

  }
];
