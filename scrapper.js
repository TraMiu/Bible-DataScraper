const BibleScraper = require("bible-scraper");
const fs = require('fs').promises;
const filePath = 'gen-verse.csv';

// Code section for the get data

async function getVerse(v) {
    const vietnamese = new BibleScraper(449);
    const bahnar = new BibleScraper(2137);
    const versVN = await vietnamese.verse(v);
    const versBA = await bahnar.verse(v);
    return {
        'vn': versVN.content,
        'ba': versBA.content
    }
}

function hasMultipleWords(inputString) {
    // Use a regular expression to match one or more word characters separated by spaces
    const pattern = /\w+\s+\w+/;
  
    // Test if the pattern matches the input string
    return pattern.test(inputString);
}

function splitIntoSentences(text) {
    // Basic splitting by period. Adjust the regex as needed for more accuracy.
    return text.split(/\.|\?|!|\n/).filter(sentence => sentence.trim());
}

async function writeToCSV(data, filePath) {
    const sentencesVN = splitIntoSentences(data.vn);
    const sentencesBA = splitIntoSentences(data.ba);

    // Assuming the number of sentences is the same for both languages
    if(sentencesBA.length == sentencesVN.length){
      
        for (let i = 0; i < Math.min(sentencesVN.length, sentencesBA.length); i++) {
            if(hasMultipleWords(sentencesVN[i]) && hasMultipleWords(sentencesBA[i])){
                const csvRow = `"${sentencesVN[i].trim()}","${sentencesBA[i].trim()}"\n`;
                await fs.appendFile(filePath, csvRow, 'utf8');
            }
        }
    } else {
        console.log("Eliminated a verse.")
       
    }
    
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
const urls = sublists[0]; // Your URLs here
console.log("Number of verses", urls.length)




processRequests(urls, filePath);

module.exports = writeToCSV;
