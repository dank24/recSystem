import numpy as np 
import pandas as pd

import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from sklearn.neighbors import NearestNeighbors

movies_df = pd.read_csv('/home/dans/Downloads/pyp/archive/movies_md.csv', low_memory=False)
keywords = pd.read_csv('/home/dans/Downloads/pyp/archive/keywords.csv', low_memory=False)
links = pd.read_csv("/home/dans/Downloads/pyp/archive/links.csv", low_memory=False)
credits = pd.read_csv("/home/dans/Downloads/pyp/archive/credits.csv")


movies_data = movies_df[['imdb_id','id','genres','adult','runtime', 'tagline', 'vote_average','title']]


keywords_data =  keywords['keywords']

credits_data = credits[['cast', 'crew']]


listData = pd.concat([movies_data, keywords_data, credits_data], axis=1)



columns = ['id','genres','adult','runtime', 'tagline', 'vote_average','keywords','title','cast','crew']

for column in columns:
    listData[column] = listData[column].fillna('')


listData['runtime'] = listData['runtime'].astype('string')
listData['vote_average'] = listData['vote_average'].astype('string')


bases = listData['genres']+""+listData['keywords']+""+listData['tagline']+""+listData['title']+''+listData['runtime']+''+listData['vote_average']



vectorizer = TfidfVectorizer()

vectorizedBases = vectorizer.fit_transform(bases)

from scipy.sparse import csr_matrix

matBases=csr_matrix(vectorizedBases)

moviesList = listData['title']


#similarity = cosine_similarity(matBases)

nn = NearestNeighbors(metric='cosine', algorithm='brute')

nn.fit(vectorizedBases)

distances, indices = nn.kneighbors(vectorizedBases, n_neighbors=30)



def find_similar_movies(imdb_id, n =29):

    if not imdb_id not in movies_data['imdb_id'].values:
        return {'error': 'imdb not found'}
    
    idx = movies_data[movies_data['imdb_id'] == imdb_id].index[0]

    distances, indices = nn.kneighbors(vectorizedBases[idx], n_neighbors=n+1)

    return movies_data.iloc[indices[0][1:]][['title','imdb_id','vote_average',]]


from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": "*"}})

@app.route('/recommend', methods=['GET'])
def recommend():
    imdb_id = request.args.get('imdb_id')
    n = int(request.args.get('n', 29))
    similar_movies = find_similar_movies(imdb_id, n)

    if 'error' in similar_movies:
        return jsonify(similar_movies), 404

    return jsonify(similar_movies.to_dict(orient ='records'))




if __name__ == '__main__':
    app.run(debug=True)