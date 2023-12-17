import requests 
from bs4 import BeautifulSoup
import urllib


  



if __name__ == "__main__":
    r = requests.get('https://www.bible.com/bible/2137/GEN.2.BDQ')



    # Parsing the HTML 
    soup = BeautifulSoup(r.content, 'html.parser') 
   
    print(r.status_code)
          
    content = soup.find('span', class_= 'ChapterContent_content__RrUqA')
    label = soup.find('span', class_= 'ChapterContent_label__R2PLt') 
    book = soup.find('span', class_='ChapterContent_book__VkdB2')
    # refer = soup.find('a', rel_='noreferrer')
    text = ""
    label = ""
    i = content
    text+=" ".join(list(i.stripped_strings))
    text+=" "
    # Open text file in write mode
    text_file = open("output.txt", "w")

    # Take content
    content = content.text

    # Write content to file
    n = text_file.write(soup.prettify())

    # if n == len(content):
    #     print("Success! String written to text file.")
    # else:
    #     print("Failure! String not written to text file.")

    # Close file
    text_file.close()