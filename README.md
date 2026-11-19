# KellelOn

Rakendus noortele, kes laenavad sõpradele tihti asju (mängud, laadijad, riided, raamatud, tööriistad). Avamisel on kohe näha, mis on välja laenatud, kellele ja kui kaua see juba väljas on.

## Probleem

- **Kasutaja:** noor, kes laenab sõpradele asju mitu korda kuus. Ta on meie päris kontakt (nimi ja kontakt on õpetajal eraldi).
- **Probleem:** ununeb, kellele ja millal midagi laenati. Asjad ei tule tagasi ja ilma kindla teadmiseta on ebamugav küsida.
- **Praegune lahendus:** mälu järgi, vanade sõnumite läbiotsimine, sõpradelt küsimine „kas sul on minu …?“.

### Leiud kontaktiga

- Laenab sõpradele asju mitu korda kuus.
- Mõni asi (nt laadija, mäng) pole tagasi tulnud ja ta ei mäleta, kellel see on.
- Märkmeid ei pea, sest see tundub tülikas. **Lisamine peab võtma paar sekundit.**

## Ulatus

Üks põhiline kasutajateekond: lisa laenatud asi → näe tagastamata asjade nimekirja → märgi tagastatuks.

## Põhifunktsioonid

1. Laenatud asja lisamine: mis, kellele, millal (kuupäev vaikimisi täna).
2. Tagastamata asjade nimekiri, kõige kauem väljas olnud eespool.
3. Asja märkimine tagastatuks.

## Edukriteerium

Kontakt lisab kõik praegu välja laenatud asjad ja leiab 10 sekundi jooksul, kellel konkreetne asi on.

## Käivitamine

Vajalik on Node.js 22.18 või uuem.

```bash
npm install
cp .env.example .env.local   # väärtused lisanduvad koos Supabase'iga (#3)
npm run dev
```

Rakendus avaneb aadressil <http://localhost:3000>.

`.env.local` on `.gitignore`-is. Ära pane võtmeid reposse.

### Käsud

```bash
npm test        # testid (node:test, kaust test/)
npm run lint
npm run build
```

## Töövoog

1. Vaata tööjärjekorda (#14) ja võta issue, mille kõik blokeerijad on suletud.
2. Võta värske `main` ja tee haru: `git checkout main && git pull && git checkout -b <nr>-<lühike-nimi>`.
3. Commiti väikeste tükkidena, sõnum eesti keeles ja viitega issuele (`Refs #3`).
4. Ava PR `main`-i vastu, kirjelduses `Closes #<nr>`.
5. **CI** (`.github/workflows/ci.yml`) käivitab igal PR-il `npm ci`, `lint`, `test` ja `build`.
6. Teine tiimiliige vaatab PR-i üle. **Otse `main`-i ei pushi keegi** (kokkulepe). Tehniline kaitse (roheline CI ja heakskiit kohustuslikud) lisandub, kui õpetaja selle seadistab (#16).

Täpsemad reeglid on failis [AGENTS.md](AGENTS.md).

## Projekti seis (Projekt 2)

Kursuse nõuded on failis [SPEC.md](SPEC.md). Tiimi tööreeglid on failis [AGENTS.md](AGENTS.md).
