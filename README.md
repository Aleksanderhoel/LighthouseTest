# LighthouseTest
En test slik at man kan kjøre verktøyet Lighthouse så mange ganger som ønskelig. \
Endre "const numberOfTests = 1;" med ønskelig runder. \
Du kan også legge til egne URLs ved å bytte ut i linje 6-9. \
Når testen kjøres vil det bli lagd csv-filer for hver url. Hvis du laster ned repo med "Results" mappen vil tidligere kjøringer allerede vises. Du kan slette hele "Results" mappen før du kjører din egen URL.
## Hvordan kjøre testen
- Først må man ha node.js lastet ned på PC-en. Download til nodejs er: https://nodejs.org/en/download/. 
- I terminal må du laste ned Lighthouse med kommandoen "npm install -g lighthouse". 
- Deretter kan du kjøre filen med kommandolinjen "node lighthouse-test.js"

## Litt småfeil i koden
- Hvis du åpner csv-filene i excel vil de gis ut i samme kolonne. Hvis du åpner i "numbers" på Mac vil utskriften se riktig ut.