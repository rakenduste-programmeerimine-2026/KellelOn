<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KellelOn: tiimi tööreeglid

Need reeglid kehtivad nii inimestele kui ka AI-agentidele (Claude Code jt). Igaühel on oma sessioon ja agendid ei näe teineteise vestlusi. **Kõik, mida teised peavad teadma, kirjuta repo faili või issue kommentaari.**

## Tiim (Projekt 2, rollid roteeritud)

Rotatsioon SPEC-i järgi: Frontend → Backend → Andmebaas ja kvaliteet → Frontend.

| Inimene | GitHub | Roll Projekt 1-s | Roll Projekt 2-s |
|---|---|---|---|
| Glen Paas | `GlenPaas32` | frontend ja UX | **backend (server actionid) ja turvalisus** |
| Maiko Nigul | `maiko-nigul` | backend ja turvalisus | **andmebaas (Supabase), testid ja kvaliteet** |
| Mirko Aadva | `Aadva` | andmebaas ja kvaliteet | **frontend ja UX** |

Repo: `rakenduste-programmeerimine-2026/KellelOn`. Tähtaeg: esitamine ja salvestatud tagasiside **2. detsembriks**.
Tööjärjekord, kuupäevad ja sõltuvused on kinnitatud issue's **#14**. Me töötame eri aegadel, seega otsused kirjutatakse issue kommentaari.

## Enne töö alustamist

1. Loe issue koos kommentaaridega: `gh issue view <nr> --comments`.
2. Vaata issue alguses rida **"⏳ Ootab"**. Kui mõni seal nimetatud issue on veel lahti, **ära alusta**.
3. Võta tööle värske `main`:
   ```bash
   git checkout main && git pull
   git checkout -b <issue-nr>-<lühike-nimi>
   ```

## Commitid ja PR-id

- Commiti sõnum eesti keeles ja viitega issuele, nt `Refs #3`.
- PR-i kirjeldusse `Closes #<nr>`.
- Ülevaataja on teine tiimiliige. **Oma PR-i ära mergi ilma heakskiiduta.**
- Enne PR-i peavad läbima: `npm test`, `npm run lint`, `npm run build`.
- **Saladused ei lähe kunagi gitti**: `.env.local`, Supabase'i `service_role` võti, paroolid. Uus muutuja lisatakse `.env.example`-sse ilma väärtuseta.
- Kontakti nime ega kontaktandmeid ei kirjutata reposse, issue'desse ega slaididele.

## Koodi kokkulepped

- **Frontend loeb ja muudab andmeid ainult `src/lib/actions.ts` kaudu.** Actionite signatuuri muutmine vajab backendi ja frontendi kokkulepet.
- Iga action tagastab `Result<T>`. Kasutajale näidatavad vead on eesti keeles.
- Valideerimine on ühes kohas ja kasutatakse nii kliendis kui ka serveris.
- **Kasutaja id võetakse alati sessioonist, mitte kliendi saadetud andmetest.**
- Andmebaasi muudatused tehakse **ainult migratsioonidena** (`npx supabase migration new <nimi>`). Juba mergitud migratsiooni ei muudeta.
- Uus tabel → RLS sisse samas migratsioonis.
- UI tekstid on eesti keeles.
