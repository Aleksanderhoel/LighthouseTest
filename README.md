# LighthouseTest
En test slik at man kan kjøre verktøyet Lighthouse så mange ganger som ønskelig. \
Endre "const numberOfTests = 1;" med ønskelig runder. \
Du kan også legge til egne URLs ved å bytte ut i linje 6-9. \
Når testen kjøres vil det bli lagd csv-filer for hver url. Husk å slette mappen om du ønsker å fjerne resultatene dine. Den vil legge til nye resultater under de du allerede har om det er lagret data i csv-filen.
## Hvordan kjøre testen
- Først må man ha node.js lastet ned på PC-en. Download til nodejs er: https://nodejs.org/en/download/. 
- I terminal må du laste ned Lighthouse med kommandoen "npm install -g lighthouse". 
- Deretter kan du kjøre filen med kommandolinjen "node lighthouse-test.js"
