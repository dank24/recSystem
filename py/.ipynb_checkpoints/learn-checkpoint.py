import os 
import pandas as pd
import numpy as np 
import matplotlib.pyplot as plt\

user_ratings_df = pd.read_csv("/home/dans/Downloads/pyp/archive/ratings.csv")
user_ratings_df.head()

print(user_ratings_df)