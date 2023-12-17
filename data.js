const fs = require('fs');

const NAME = "GEN";
const TXT = "gen-verse.txt"

function generateVerseIds(section, chaptersAndVerses) {
   
    const urls = [];
    for (var chapter in chaptersAndVerses) {
        var numVerses = chaptersAndVerses[chapter];
        for (var verse = 1; verse <= numVerses; verse++) {
            urls.push(`${section}.${parseInt(chapter)+1}.${verse}`);
        }
    }
    console.log(urls.length)
    return urls;
}


const data = fs.readFileSync(TXT,{ encoding: 'utf8', flag: 'r' });

const lines = data.trim().split('\n');
// Map each line to an integer after splitting by space
const chaptersAndVerses = lines.map(line => {
    
    return parseInt(line, 10);
});

const generatedVerses = generateVerseIds(NAME, chaptersAndVerses)

function chunkArray(array, chunkSize) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, Math.min(i + chunkSize, array.length));
      result.push(chunk);
    }
    return result;
}

// Example usage:
const myList = generatedVerses; // your list with many elements
const chunkSize = 100;
const sublists = chunkArray(myList, chunkSize);

console.log(sublists.length);
  


module.exports = sublists;
