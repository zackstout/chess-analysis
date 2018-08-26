
import pandas as pd
import numpy as np

openings_tree = dict()

all_the_openings = dict()


# total_history = []

df = pd.read_csv('games.csv')
print(len(df))

def addToDF():
    # Create a column with just the opening moves:
    # Hmm, but pandas does not like working with lists as values...
    df['moves_list'] = [move.split() for move in df['moves']]
    df['opening_moves'] = [df['moves_list'][i][ : df['opening_ply'][i]] for i in range(len(df))]
    df['opening_moves_text'] = [" ".join(df['moves_list'][i][ : df['opening_ply'][i]]) for i in range(len(df))]

addToDF()
print(df.head(15))


# This won't quite work, because some names (e.g. "Queen's Pawn" refer to both 1- and 2-move openings):
def getMovesFromName(opening, target_len):
    que = df[df['opening_name'] == opening]
    result = ''
    i = 0
    move = que['opening_moves_text'].tolist()[i]
    move_list = move.split()

    while len(move_list) is not target_len:
        move = que['opening_moves_text'].tolist()[i]
        move_list = move.split()
        i += 1

    return move


def generateOneMoveOpenings():
    d_open = df[df['opening_ply'] == 1]

    # for d in d_open:
        # print(d) # Why col names?? Must be because this construction returns a DATAFRAME, not a Series
    print(len(d_open))

    for d in d_open['opening_name']:
        # print(d)
        # print(df[df['opening_name'] == d]['opening_moves_text'])

        # A bit surprised we didn't have to say 'global' here:
        if not hasattr(openings_tree, d):
            openings_tree[d] = dict()
            if not hasattr(openings_tree[d], 'move'):
                move_text = getMovesFromName(d, 1)
                openings_tree[d]['move'] = move_text

    print(openings_tree)


print('hi there')

# generateOneMoveOpenings()

# print(getMovesFromName("Queen's Pawn", 2))


def generateTwoMoveOpenings():
    d2_open = df[df['opening_ply'] == 2]

    # We are already being really inefficient, looping through this whole list. Could we first turn it into a set?
    for d in d2_open['opening_name']:
        o_moves = getMovesFromName(d, 2) # e.g. "e4 d4"

        for o, v in openings_tree.items(): # iteritems was removed in python3!
            o_move = v['move'] # e.g. "e4"

            # If current move started with other move, add this to that other move's dictionary:
            if o_moves.startswith(o_move) and not hasattr(o, d): # We don't need the .str startswith method, because it's already a string!
                v[d] = dict()
                v[d]['move'] = o_moves
        # We'll need an else here in order to capture those 2-move openings that don't have a 1-move named start (if such there be).
        # To do that, we should add a Break inside the If statement.
        # Basically, we need to be thoughtful about how to store this data in the most efficient way.

    print("TREE 2: ", openings_tree)


# generateTwoMoveOpenings()




# print(d_open.groupby('opening_name').count())




d4_start = df[df['moves'].str.startswith('d4')]
# print(d4_start)

all_openings = df.groupby('opening_name')
# print(all_openings.count())



def findLinesStartingWith(open):
    # return 'hi'
    result = dict()
    all_moves = df[df['moves'].str.startswith('d4')]
    result['group'] = all_moves.groupby('opening_name').count() # I'd like to know why this changes every column's value...
    # result['count'] = len(all_moves) # It already has this

    # print(result)
    return result

# res = findLinesStartingWith('d4')
# print(res)




print('ahoy')


def getHistory(line): # e.g. line = "e4 e5 Nf3 d6 d4"
    num_moves = len(line.split())
    # print(num_moves)
    line_name = df[df['opening_moves_text'] == line]['opening_name'].tolist()[0]
    # print('line name is: ', line_name)

    history = []

    for i in range(1, num_moves): # e.g. 1, 2, 3, 4
        moves = line.split()[ : i]
        # print('moves are: ', moves)
        move_str = " ".join(moves)
        # print('move_str is: ', move_str)
        res = False
        if len(df[df['opening_moves_text'] == move_str]) > 0:
            res = True

        if res:
            name = df[df['opening_moves_text'] == move_str]['opening_name'].tolist()[0]
            # print('name is: ', name)
            history.append(name)
        else:
            history.append('nada nada')

    return history


getHistory("e4 e5 Nf3 d6 d4")

# Populates all_the_openings:
def getUniqueOpenings():
    for i, row in df.iterrows():
        attr = row['opening_moves_text']
        if not hasattr(all_the_openings, attr):
            all_the_openings[attr] = dict()
            all_the_openings[attr]['name'] = row['opening_name']
        # print(row)


getUniqueOpenings()
print(len(all_the_openings))
print(len([x for x in all_the_openings if len(x.split()) < 3]))
# print(all_the_openings)


# Refers to all_the_openings
def getTotalHistory():
    # should use defaultdict():
    for o, v in all_the_openings.items():
        if len(o.split()) < 3:
            v['opening_hist'] = getHistory(o)


getTotalHistory()
# print(all_the_openings)

# filtered_openings = list(filter(lambda x: hasattr(x, 'opening_hist'), all_the_openings)) # Note must convert to list

filtered_openings = []

for k, v in all_the_openings.items():
    print(v)
    # Huh...maybe we're only looking at a copy of the unmodified original...?cd
    if hasattr(v, 'opening_hist'):
        filtered_openings.append((k, v))

print(filtered_openings)











# Chessin!
