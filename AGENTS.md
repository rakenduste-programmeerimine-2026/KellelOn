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
- Enne PR-i lase üle vaadata ka agendil `code-reviewer` (vt "Koodiülevaatus"). See ei asenda tiimiliikme ülevaatust.
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

## Koodiülevaatus

Repos on ülevaatusagent `.claude/agents/code-reviewer.md`. Claude Code'is: *"Kasuta code-reviewer agenti ja vaata see haru üle"*. Agent ainult loeb ega muuda midagi.

- **Baas on alati `origin/main`**, mitte haru enda upstream.
- Raport kirjutatakse **eesti keeles**.
- 🔴 leiud parandatakse enne PR-i. 🟡 ja 🟢 leiud kas parandatakse või kirjutatakse PR-i kirjeldusse, miks need jäävad.
- Agent ei asenda tiimiliikme ülevaatust. SPEC nõuab, et iga liige oskab koodi ja otsuseid selgitada, ka AI abiga tehtud tööd.

### Selle projekti kontrollnimekiri

Vaata need üle enne üldist kontrollnimekirja:

1. **Ligipääs:** igal tabelil on RLS ja reegel `owner_id = auth.uid()` iga operatsiooni (select, insert, update, delete) jaoks. Server ei usalda kliendi saadetud `owner_id`-d ega teise kasutaja `id`-d: `markReturned`/`undoReturned` võõra asjaga ei muuda midagi ja tagastab vea.
2. **Valideerimine:** reeglid (asi 1–80 märki, laenaja 1–50 märki, kuupäev mitte tulevikus, tühikud trimmitud) on ühes failis ja seda kasutavad nii vorm kui ka server. Andmebaasi check-piirangud on samad.
3. **Leping:** `src/lib/actions.ts` signatuur ja `Loan`/`Result<T>` tüübid on samad, mis issue #2-s kokku lepiti. Kui need muutuvad, peavad muutuma kõik kasutajad (vaated, mock, testid).
4. **Põhifunktsioonid:** nimekirjas on ainult `returnedAt = null` asjad, vanim `lentOn` eespool. Otsing leiab nii asja kui ka inimese järgi, suur- ja väiketähtedest sõltumata. Kuupäevad ja "kui kaua väljas" arvestavad Eesti ajavööndit (päev ei vahetu kell 02:00).
5. **Saladused ja privaatsus:** `.env*` (v.a `.env.example`) pole gitis, `service_role` võtit rakendus ei kasuta, vead ega logid ei näita kasutajale tehnilisi detaile. Kontakti nime ega kontaktandmeid pole koodis, testides ega dokumentides.
6. **Migratsioonid:** muudatus on uues migratsioonifailis, juba mergitud migratsiooni ei muudeta, uus tabel saab RLS-i samas failis.
7. **Testid:** muutunud käitumisel (valideerimine, RLS, järjestus, tagastamine) on test, mis kukuks läbi, kui käitumine katki läheks.
8. **Kasutaja:** UI tekstid ja veateated on eesti keeles. Lisamine jääb kiireks (kontakt: "paar sekundit"), uus kohustuslik väli või lisasamm on leid.
