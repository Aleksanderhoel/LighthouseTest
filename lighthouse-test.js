const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apps = [
  { name: 'Nextjs', url: 'https://bachelor23-nextjs-app.vercel.app/?fbclid=IwAR2KTdxMR1WHj5YmuRjHzcN_UgUMLeLS2yZNTE_zl5g5GDmev9mr_Aki6to' },
  { name: 'React', url: 'https://bachelor23-react.vercel.app/?fbclid=IwAR1BtubzlLt5CnPe88MDvNXFfuEiIl06uSGyDkf3z-tB_JSo_Spxiq2ET58' },
  { name: 'Svelte', url: 'https://bachelor23.vercel.app/?fbclid=IwAR1BtubzlLt5CnPe88MDvNXFfuEiIl06uSGyDkf3z-tB_JSo_Spxiq2ET58' },
  { name: 'Astro', url: 'https://bachelor23-astro.vercel.app/?fbclid=IwAR1t4IKMJU36GGpWqmovjTsjC_12HtQeA1JwCS-RqBg7NWB9LdUSqmCBeZs' },
];

const numberOfTests = 1;

function writePerformanceToCSV(appName, performanceScore, outputPath) {
  const csvRow = `"${appName}",${performanceScore.toFixed(2)}\n`;

  // Check if the file exists, if not, add headers
  if (!fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, '"App","Performance Score"\n', 'utf8');
  }

  fs.appendFileSync(outputPath, csvRow, 'utf8');
}

apps.forEach((app, index) => {
  const csvOutputPath = path.join(__dirname, `results/${app.name}-performance.csv`);

  for (let i = 0; i < numberOfTests; i++) {
    console.log(`Running Lighthouse test #${i + 1} for ${app.name}`);
    const outputPath = `./results/${app.name}/report-${i + 1}.json`;

    // Make sure the output directory exists
    fs.mkdirSync(`./results/${app.name}`, { recursive: true });

    // Run Lighthouse test and save the results to a file
    const command = `lighthouse "${app.url}" --output json --output-path "${outputPath}"`;
    execSync(command, { stdio: 'inherit' });

    // Read JSON report and extract performance score
    const reportJson = JSON.parse(fs.readFileSync(outputPath));
    const performanceScore = reportJson.categories.performance.score * 100;

    // Write performance score to CSV file
    writePerformanceToCSV(app.name, performanceScore, csvOutputPath);
  }
});
