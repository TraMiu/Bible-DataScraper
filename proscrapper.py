import re
import requests 
from bs4 import BeautifulSoup

def getbbibledata(url):
    html_text = requests.get(url, headers={'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'})
    ### Parse to BeautifulSoup
    soup = BeautifulSoup(html_text.text, "html.parser")
    div = soup.find_all('div',class_=re.compile(r'ChapterContent_chapter'))[0]
    dif = div.find_all('div',class_=re.compile(r'ChapterContent'))
    text = ""
    label = ""
    for i in dif:
        text+=" ".join(list(i.stripped_strings))
        text+=" "
    return text

data = getbbibledata('https://www.bible.com/bible/2137/GEN.2.BDQ')
print(data)