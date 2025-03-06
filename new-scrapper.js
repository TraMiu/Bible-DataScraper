const BibleScraper = require("bible-scraper");
const fs = require('fs').promises;
const filePath = 'EXO.csv';

// Code section for the get data

async function getVerse(v) {
    const vietnamese = new BibleScraper(1);
    const bahnar = new BibleScraper(2137);
    const versVN = await vietnamese.verse(v);
    const versBA = await bahnar.verse(v);
    return {
        'vn': versVN.content,
        'ba': versBA.content
    }
}

async function writeToCSV(data, filePath) {
    const csvRow = `"${data.vn}","${data.ba}"\n`;
    await fs.appendFile(filePath, csvRow, 'utf8');    
}

async function processRequests(urls, filePath) {
    const totalUrls = urls.length;
    let processedUrls = 0;

    for (const url of urls) {
        try {
            const data = await getVerse(url);
            await writeToCSV(data, filePath);
            processedUrls++;
            const progress = ((processedUrls / totalUrls) * 100).toFixed(2);
            console.log(`Processed ${processedUrls}/${totalUrls} verses (${progress}%)`);
        } catch (error) {
            console.error('Error processing request:', error);
        }
    }
    console.log('Processing complete.');
}

const sublists = require('./data');
const urls = sublists; // Your URLs here
console.log("Number of verses", urls.length)


processRequests(urls, filePath);

module.exports = writeToCSV;
