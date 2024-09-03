import numpy as np 
import pandas as pd

import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from sklearn.neighbors import NearestNeighbors

movie_df = pd.read_csv('../py2/exported.csv')
keywords = pd.read_csv('../py2/keywords.csv')
credits = pd.read_csv('../py2/credits.csv')

movie_df['genres'] = movie_df['genres'].tolist()
movie_df['title'] = movie_df['title'].astype('string')
movie_df['vote_average'] = movie_df['vote_average'].astype('float16')
keywords['id'] = keywords['id'].astype('string')
movie_df['id'] = movie_df['id'].astype('string')
credits['id'] = credits['id'].astype('string')

credits = credits.drop(columns='cast', axis=1)

selectColumns = ['title','genres', 'imdb_id', 'release_date', 'vote_average']

i = 1
for column in selectColumns:
    movie_df[column] = movie_df[column].fillna('') 

movie_df = movie_df.drop(columns=['Unnamed: 0'])

keywords['id'].info

use_df = pd.merge(movie_df, keywords, on='id', how='inner')

use1_df = pd.merge(use_df, credits, on='id', how='inner')

use1_df.to_csv('use.csv', index=False)

selectColumns2 = ['crew', 'keywords']

i = 1
for column in selectColumns2:
    use1_df[column] = use1_df[column].fillna('') 


use1_df['vote_average'] = use1_df['vote_average'].astype('string')

useColumns = use1_df['title']+""+use1_df['crew']+''+use1_df['genres']+''+use1_df['keywords']+''+use1_df['vote_average']

useColumns

vectorizer = TfidfVectorizer()

useVectorize = vectorizer.fit_transform(useColumns)


nn = NearestNeighbors(metric='cosine', algorithm='brute')

nn.fit(useVectorize)

distances, indices = nn.kneighbors(useVectorize, n_neighbors=30)

distances.shape

moviesList = use1_df['title']
moviesList

def find_similar_movies(movie_title, n =29):
    movie_title = difflib.get_close_matches(movie_title, moviesList)
    
    title = movie_title

    errorMsg = {'Error': 'Could not find movie'}

    if not title:
        return (errorMsg)


    if title:

        movie = title[0]
        idx = use1_df[use1_df['title'] == movie].index[0]
        distances, indices = nn.kneighbors(useVectorize[idx], n_neighbors=n+1)
        return use1_df.iloc[indices[0][1:]][['title','vote_average']]




from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/recommend', methods=['GET'])
def recommend():

    movie_title = request.args.get('title')
    n = int(request.args.get('n', 29))
    similar_movies = find_similar_movies(movie_title, n)

    if 'Error' in similar_movies:
        return jsonify(similar_movies), 404
    
    return jsonify(similar_movies.to_dict(orient ='records'))

if __name__ == '__main__':
    app.run(debug=True)
