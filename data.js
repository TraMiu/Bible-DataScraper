const fs = require('fs');

const NAME = "EXO";
const TXT = NAME+".txt"

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

module.exports = generatedVerses;
