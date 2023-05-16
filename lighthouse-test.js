// Importerer execSync-funksjonen fra child_process-modulen. For å kjøre shell-kommandoer, og venter på fullført før neste js-kode kjøres.
// Importerer fs-modulen (File System) slik at vi kan jobbe med filsystemet.
// Importerer path-modulen som gir funksjoner for å jobbe med fil- og mappestier.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

//Definerer et array med URLen og navn til webapplikasjonene som objekter.
const apps = [
  { name: 'Nextjs', url: 'https://bachelor23-nextjs-app.vercel.app/' },
  { name: 'React', url: 'https://bachelor23-react.vercel.app/' },
  { name: 'Svelte', url: 'https://bachelor23.vercel.app/' },
  { name: 'Astro', url: 'https://bachelor23-astro.vercel.app/' },
];
//Definerer antall ganger testen skal kjøres per app.
const numberOfTests = 50;

//Skriver ut performancen til en CSV-fil. Hvis den ikke finnes blir den opprettet.
function writePerformanceToCSV(appName, performanceScore, outputPath) {
  const csvRow = `"${appName}";${performanceScore.toFixed(2)}\n`;

  // Sjekker om filen eksisterer
  if (!fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, 'App;Performance Score\n', 'utf8');
  }

  fs.appendFileSync(outputPath, csvRow, 'utf8');
}

//Kjører Lighthouse-testen for hver app i apps-arrayet.
apps.forEach((app, index) => {
  // Definerer stien der CSV-resultatene for spesifikk applikasjon skal lagres.
  const csvOutputPath = path.join(__dirname, `results/${app.name}-performance.csv`);

  // For hvert testnummer opp til det definerte antallet tester.
  for (let i = 0; i < numberOfTests; i++) {
    // Logger til konsollen hvilken test som kjøres
    // Og definerer stien der JSON-resultatene for denne testen skal lagres
    console.log(`Running Lighthouse test #${i + 1} for ${app.name}`);
    const outputPath = `./results/${app.name}/report-${i + 1}.json`;

    // Forsikrer at resultatmappen finnes
    fs.mkdirSync(`./results/${app.name}`, { recursive: true });

    //Kjører Lighthouse-testen og lagrrer resultatene til en JSON-fil.
    const command = `lighthouse "${app.url}" --output json --output-path "${outputPath}"`;
    execSync(command, { stdio: 'inherit' });

    // Leser JSON rapporten og extracter performance scoren
    const reportJson = JSON.parse(fs.readFileSync(outputPath));
    const performanceScore = reportJson.categories.performance.score * 100;

    //Skriver performance score til CSV filen
    writePerformanceToCSV(app.name, performanceScore, csvOutputPath);
  }
});
