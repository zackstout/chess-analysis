# Analyzing Chess Games
I stumbled upon this [dataset](https://www.kaggle.com/datasnaek/chess) of previously-played chess games. My first idea is to build a tree of possible openings and variations.

I didn't include the CSV in this repository; you'll need to download the data on your own and add it to this project (it should be called `games.csv`).

## How it works
Search a particular line (e.g. "e4 e5 Nf3") to see all the next moves that were played in one of the games in our dataset. See statistics for how often the move was played and what the expected results are (white or black winning).

Click on one of the search results to feed that line in as the new search input, finding yet more moves.

Hover over a research result to view information about the Opening the current line continues.

## Animated Screenshot:
![](https://media.giphy.com/media/l1t965X1maREPWKwcG/giphy.gif)

## Notes to self
- I've noticed that I'm still writing Python the same way -- the JS way (i.e. the wrong way). Need to study those Pythonic patterns until their use-cases are ingrained.
- This is a challenge. Maybe I'm overthinking it -- could we just pass in a string of previous moves and then query the database for all those lines that begin like that? We could! This raises the question -- why else did we want the tree structure in the first place?

- My first thought would be to grab all the 1-length openings, then for each one add it to every 2-lenth opening that started with it as "history". Then each element could know its history.
- One wrinkle is that there are 5-length openings that spawn from 3-length openings without a named 4-length middle opening.
