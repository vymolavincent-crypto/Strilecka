// ===== SEZNAM HER V HERNĚ =====
// Novou hru přidáš tak, že ji dáš do složky hry/<nazev>/ a připíšeš ji sem.
// Po každé změně zvyš VERZE o 1, aby si telefon stáhl novinky.
self.HERNA_VERZE = 1;
self.HERNA_HRY = [
  {
    id: 'neon-najezd',
    nazev: 'Neonový nájezd',
    popis: 'Vesmírná střílečka. Táhni prstem, sbírej krystaly a poraz bosse.',
    ikona: 'hry/neon-najezd/icon-192.png',
    barva: '#28e1ff',
    soubory: ['hry/neon-najezd/', 'hry/neon-najezd/index.html', 'hry/neon-najezd/icon-192.png', 'hry/neon-najezd/icon-512.png'],
    rekord: () => {
      const b = +localStorage.getItem('px_best') || 0, w = +localStorage.getItem('px_bwave') || 0;
      return b ? 'Rekord ' + b.toLocaleString('cs-CZ') + (w ? ' · vlna ' + w : '') : '';
    }
  }
];
