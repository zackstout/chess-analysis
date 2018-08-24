
import pandas as pd
import numpy as np

openings_tree = dict()

df = pd.read_csv('games.csv')
print(len(df))

def addToDF():
    # Create a column with just the opening moves:
    # Hmm, but pandas does not like working with lists as values...
    df['moves_list'] = [move.split() for move in df['moves']]
    df['opening_moves'] = [df['moves_list'][i][ : df['opening_ply'][i]] for i in range(len(df))]
    df['opening_moves_text'] = [" ".join(df['moves_list'][i][ : df['opening_ply'][i]]) for i in range(len(df))]

addToDF()
# print(df.head(15))


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
generateOneMoveOpenings()
print(getMovesFromName("Queen's Pawn", 1))




def generateTwoMoveOpenings():
    d2_open = df[df['opening_ply'] == 2]

    for d in d2_open['opening_name']:
        o_moves = getMovesFromName(d, 2) # e.g. "e4 d4"

        for o, v in openings_tree.items(): # iteritems was removed in python3!
            o_move = v['move'] # e.g. "e4"

            if o_moves.startswith(o_move) and not hasattr(o, d):
                v[d] = dict()
                v[d]['move'] = o_moves

            # curr_move = getMovesFromName()
            # move = df[df['opening_name'] == o]


    print("TREE 2: ", openings_tree)


generateTwoMoveOpenings()


# print(d_open.groupby('opening_name').count())




d4_start = df[df['moves'].str.startswith('d4')]
# print(d4_start)

all_openings = df.groupby('opening_name')
# print(all_openings.count())
















# Chessin!
