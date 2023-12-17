const NAME = "GEN";
const NO = 50;

const BibleScraper = require("bible-scraper");

const bahnar = new BibleScraper(2137);


async function getNumberOfVerses(chapterList){
    
    for (const chapter of chapterList) {
        const ch = await bahnar.chapter(chapter);
        console.log(ch.verses.length);
    }
   
}

function getChapterList(section, numberOfChapter) {
    const chapterList = []
    for (let i = 0; i < numberOfChapter; i++) {
        chapterList.push(`${section}.${i+1}`)
    }

    return chapterList;

}


const chapterList = getChapterList(NAME, NO)

getNumberOfVerses(chapterList)



