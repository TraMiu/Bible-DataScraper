const NAME = "EXO";
const NO = 100;

bible_books = [
    // Old Testament
    "GEN",  // Genesis
    "EXO",  // Exodus
    "LEV",  // Leviticus
    "NUM",  // Numbers
    "DEU",  // Deuteronomy
    "JOS",  // Joshua
    "JDG",  // Judges
    "RUT",  // Ruth
    "1SA",  // 1 Samuel
    "2SA",  // 2 Samuel
    "1KI",  // 1 Kings
    "2KI",  // 2 Kings
    "1CH",  // 1 Chronicles
    "2CH",  // 2 Chronicles
    "EZR",  // Ezra
    "NEH",  // Nehemiah
    "EST",  // Esther
    "JOB",  // Job
    "PSA",  // Psalms
    "PRO",  // Proverbs
    "ECC",  // Ecclesiastes
    "SNG",  // Song of Solomon
    "ISA",  // Isaiah
    "JER",  // Jeremiah
    "LAM",  // Lamentations
    "EZK",  // Ezekiel
    "DAN",  // Daniel
    "HOS",  // Hosea
    "JOL",  // Joel
    "AMO",  // Amos
    "OBA",  // Obadiah
    "JON",  // Jonah
    "MIC",  // Micah
    "NAM",  // Nahum
    "HAB",  // Habakkuk
    "ZEP",  // Zephaniah
    "HAG",  // Haggai
    "ZEC",  // Zechariah
    "MAL",  // Malachi

    // // New Testament
    "MAT",  // Matthew
    "MRK",  // Mark
    "LUK",  // Luke
    "JHN",  // John
    "ACT",  // Acts
    "ROM",  // Romans
    "1CO",  // 1 Corinthians
    "2CO",  // 2 Corinthians
    "GAL",  // Galatians
    "EPH",  // Ephesians
    "PHP",  // Philippians
    "COL",  // Colossians
    "1TH",  // 1 Thessalonians
    "2TH",  // 2 Thessalonians
    "1TI",  // 1 Timothy
    "2TI",  // 2 Timothy
    "TIT",  // Titus
    "PHM",  // Philemon
    "HEB",  // Hebrews
    "JAS",  // James
    "1PE",  // 1 Peter
    "2PE",  // 2 Peter
    "1JN",  // 1 John
    "2JN",  // 2 John
    "3JN",  // 3 John
    "JUD",  // Jude
    "REV"   // Revelation
];

const BibleScraper = require("bible-scraper");

const bahnar = new BibleScraper(2137);

function getChapterList(section, numberOfChapter) {
    const chapterList = []
    for (let i = 0; i < numberOfChapter; i++) {
        chapterList.push(`${section}.${i+1}`)
    }
    return chapterList;
}

async function getNumberOfVerses(chapterList){
    var verse_cnt = book + " "
    for (const chapter of chapterList) {
        const ch = await bahnar.chapter(chapter);
        if(ch.verses.length != 0) {
            verse_cnt = verse_cnt + ch.verses.length + " "
        }
    }
    console.log(verse_cnt)
}

for (id in bible_books) {
    book = bible_books[id]
    const chapterList = getChapterList(book, 200)
    getNumberOfVerses(chapterList)
}


