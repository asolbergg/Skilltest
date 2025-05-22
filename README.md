En enkel app som lar deg søke etter bedrifter i Brønnøysundregisteret og lagre informasjon om dem

## funksjonalitet

- Søke etter bedrifter i Brønnøysundregisteret
- Lagre bedrifter du er interessert i
- Legge til egne notater om bedriftene
- Slette lagrede bedrifter
- Søke i dine lagrede bedrifter

## Teknologier

### Frontend
- React - For å bygge brukergrensesnittet
- Tailwind CSS - Koseligere enn vanlig css
- Next.js - For å bygge applikasjonen
- TypeScript 

### Backend
- .NET 8.0
- Entity Framework Core 
- SQLite - Database 


## Oppsett

### Du trenger dette først:
- Node.js (versjon 18 eller nyere) 
- .NET 8.0 SDK 
- Entity Framework (installeres i neste steg)

### Frontend (React-appen)

1. Åpne terminalen og gå til app-mappen:
   ```bash
   cd app
   ```

2. Kopier miljøvariabel-filen:
   ```bash
   cp .env.example .env
   ```
  (http://localhost:5064/api)

3. Installer alle pakkene som trengs:
   ```bash
   npm install
   ```

4. Start appen:
   ```bash
   npm run dev
   ```
åpnes på [http://localhost:3000]


### Backend

1. Gå til backend-mappen i terminalen:
   ```bash
   cd backend/CustomerApi
   ```

2. Installer Entity Framework (hvis ikke allerede installert):
   ```bash
   dotnet tool install --global dotnet-ef
   ```

3. Opprett databasen:
   ```bash
   dotnet ef database update
   ```

4. Start backend-serveren:
   ```bash
   dotnet run
   ```

NB: både backend og frontend må kjøres samtidig for å funke


## Filstruktur

```
skilltest/
├── app/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── .env.example
│   ├── package.json
│   └── next.config.ts
│
└── backend/
    └── CustomerApi/
        ├── Controllers/
        ├── Data/
        ├── Models/
        ├── Migrations/
        ├── Program.cs
        └── appsettings.json
```


## Tidsbruk

Her er en oversikt over hvor lang tid jeg brukte på de ulike delene:

- Planlegging og oppsett**: 2 timer
  - Lese oppgaven og planlegge løsningen
  - Sette opp prosjektstruktur
  - Velge teknologier

- Backend-utvikling**: 6-8 timer
  - Sette opp .NET-prosjekt
  - Implementere API-endepunkter
  - Koble til Brønnøysundregisteret
  - Sette opp database

- Frontend-utvikling**: 6-8 timer
  - Sette opp React-prosjekt
  - Lage brukergrensesnitt
  - Implementere funksjonaliteter
  - Styling 

- Testing og feilsøking**: 4 timer
  - Teste at alt fungerer sammen
  - Fikse bugs
  - Forbedre brukeropplevelsen

- Dokumentasjon**: 2 timer
  - Skrive README
  - kommentarer

totalt antall tid brukt: ca 20t

---

Takk for morsom test!