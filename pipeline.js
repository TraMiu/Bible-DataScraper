const fs = require('fs').promises;
const BibleScraper = require("bible-scraper");

// Function to generate verse IDs
function generateVerseIds(section, chaptersAndVerses) {
    const urls = [];
    for (let chapter = 0; chapter < chaptersAndVerses.length; chapter++) {
        let numVerses = chaptersAndVerses[chapter];
        for (let verse = 1; verse <= numVerses; verse++) {
            urls.push(`${section}.${chapter + 1}.${verse}`);
        }
    }
    console.log("Number of verses:", urls.length);
    return urls;
}

// Read and process data from the verse-count.txt file
async function readData(file) {
    const data = await fs.readFile(file, { encoding: 'utf8', flag: 'r' });
    const lines = data.trim().split('\n');
    return lines;
}

// Function to get verse content
async function getVerse(v) {
    const vietnamese = new BibleScraper(114);
    const bahnar = new BibleScraper(2137);
    const versVN = await vietnamese.verse(v);
    const versBA = await bahnar.verse(v);
    return {
        'vn': versVN.content,
        'ba': versBA.content
    };
}

// Function to write data to CSV
async function writeToCSV(data, filePath) {
    // Replace newlines in the text with spaces or another suitable character
    const vnText = data.vn.replace(/\n/g, ' ');
    const baText = data.ba.replace(/\n/g, ' ');

    const csvRow = `"${vnText}","${baText}"\n`;
    await fs.appendFile(filePath, csvRow, 'utf8');
}

// Function to process URLs and write the results to CSV
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

// Main function to read data, generate URLs, and process them
async function main() {
    const lines = await readData('test6.txt');
    for (const line of lines) {
        const parts = line.split(' ');
        const NAME = parts[0];
        const chaptersAndVerses = parts.slice(1).map(Number);
        console.log(NAME, chaptersAndVerses)
        const filePath = 'crawled/' + NAME + '.csv';

        console.log(`Processing ${NAME}...`);
        const urls = generateVerseIds(NAME, chaptersAndVerses);
        await processRequests(urls, filePath);
    }
}

// Execute the main function
main().catch(console.error);
