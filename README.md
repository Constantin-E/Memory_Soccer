# Memory_Soccer

- A game to help memorize all the German soccer players for the upcoming world cup.
- To add more photos (e.g. other teams) to the library, just put the photo in the Gallery folder and add the link of the png to the Memory.allphotos array. They will automatically be included from now on.
- The user can chose the degree of difficulty anywhere between 2 and (currently) 36 cards (with a Memory.allphotos array > 18, the maximum deck size will automatically adjust). 
- In a deck < Memory.allphotos.length*2, the cards of the photo library that are used are randomly selected - not only the order of the cards on the board is random, but also the cards themselves.
- The scoring board can always be accessed. But only if a game is completed, a new game can be added to the scoreboard. 
- The user can freely decide if the wants to add his game to the scoreboard while looking at the scoreboard, so only his best games will be added.
- The scoreboard data is not only saved in local storage, but also always retrieved from local storage. This means that the user can close the browser and will still see his overall scoreboard the next time he accesses the website.
- The Scoring board allows a comparison between games with different deck sizes through a "score" formula, which rewards the user for choosing a bigger deck.
