# Analyzing Chess Games
I stumbled upon this [dataset](https://www.kaggle.com/datasnaek/chess) of previously-played chess games. My first idea is to build a tree of possible openings and variations.

I didn't include the CSV in this repository; you'll need to download the data on your own and add it to this project (it should be called `games.csv`).

## Notes to self
- I've noticed that I'm still writing Python the same way -- the JS way (i.e. the wrong way). Need to study those Pythonic patterns until their use-cases are ingrained.
- This is a challenge. Maybe I'm overthinking it -- could we just pass in a string of previous moves and then query the database for all those lines that begin like that? We could! This raises the question -- why else did we want the tree structure in the first place?
