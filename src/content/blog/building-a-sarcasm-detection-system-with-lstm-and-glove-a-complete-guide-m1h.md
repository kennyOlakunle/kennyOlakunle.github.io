---
title: "Building a Sarcasm Detection System with LSTM and GloVe: A Complete Guide"
description: "Before We Begin :) Detecting sarcasm is more than just spotting ironic statements. It involves..."
publishedAt: "2025-01-02T10:28:53Z"
featured: false
sourceName: "DEV Community"
sourceUrl: "https://dev.to/_ken0x/building-a-sarcasm-detection-system-with-lstm-and-glove-a-complete-guide-m1h"
tags:
  - "ai"
  - "nlp"
  - "lstm"
  - "deeplearning"
---

> Originally published on [DEV Community](https://dev.to/_ken0x/building-a-sarcasm-detection-system-with-lstm-and-glove-a-complete-guide-m1h).

Before We Begin :)

Detecting sarcasm is more than just spotting ironic statements. It involves understanding tone, context, and sometimes even cultural nuances. Sarcasm can be difficult for machines to detect in social media posts, news headlines, or everyday conversations because it contradicts the literal meaning of words. Yet, modern NLP techniques can pick up on these subtleties better than ever with the right approach and data preprocessing.

Below, you’ll find a detailed, step-by-step guide on how to build your sarcasm detection model using LSTM (Long Short-Term Memory) networks and GloVe embeddings. From data cleaning and preprocessing to model deployment in a Streamlit application, this post covers every element you need to create a robust sarcasm detection system.


## Table of Contents

- Introduction
- Tools and Environment Setup
- Importing Libraries
- Loading and Inspecting Data
- Data Cleaning
- Removing Special Characters
- Additional Noise Removal (URLs, HTML, Non-ASCII, Punctuation)
- Handling Slang, Acronyms, and Common Abbreviations
- Stopword Removal and Lemmatization
- Using GloVe Embeddings
- Creating the Embedding Matrix
- Creating Feature Vectors
- Building the LSTM Model
- Preparing Data for the LSTM Model
- Defining the LSTM Architecture
- Training the Model
- Saving the Model and Tokenizer
- Deployment with Streamlit
- Putting It All Together
- Conclusion
- Next Steps

## 1. Introduction

Sarcasm detection is a fascinating natural language processing (NLP) challenge. Sarcastic statements often convey the opposite of their literal meaning, making them tricky for machines to identify. For instance, the sentence “I love getting stuck in traffic for hours” may say you enjoy traffic, but in reality, you mean the opposite. Automated sarcasm detection requires models that can glean subtle contextual cues. In this post, we’ll train an LSTM model on a sarcasm headlines dataset and deploy it using Streamlit to create a friendly, interactive web interface.

This step-by-step guide will show you how to:

1. **Load and analyze a sarcasm dataset**.
2. **Clean and preprocess the text data** (removing special characters, URLs, punctuation, etc.).
3. **Use GloVe embeddings** (a widely used word embedding technique) to represent our text.
4. **Build and train an LSTM model** to classify whether a sentence is sarcastic.
5. **Deploy our trained model on Streamlit** for a user-friendly web interface.


By the end of this tutorial, you will have a functional sarcasm-detection application!

## 2. Tools and Environment Setup
To run this project, you’ll need a few key tools and libraries:

1. **Python 3.x** (preferably 3.7+)
2. **Pip** or **conda** for installing packages
3. **TensorFlow** and **Keras** for building deep learning models
4. **NLTK** for text processing
5. **GloVe embeddings** – specifically `glove.6B.100d.txt`
6. **Streamlit** for deployment

**Recommended steps to set up a virtual environment** (using `pip` and `venv` as an example):

```
# Create and activate virtual environment
python -m venv sarcasm-env
source sarcasm-env/bin/activate  # Linux/Mac
# or:
sarcasm-env\Scripts\activate  # Windows

# Install necessary libraries
pip install numpy pandas matplotlib plotly scikit-learn nltk tensorflow joblib streamlit xgboost lightgbm catboost
```
Then, **download** the GloVe file (`glove.6B.100d.txt`) and place it in a folder named `dataset/`.


## 3. Importing Libraries

We start by importing libraries for data manipulation and NLP tasks and building deep learning models. Below is the code snippet we use in our Jupyter Notebook or Python script. This includes everything for data manipulation, NLP tasks, and building deep learning models.

```
# Ignore warnings
import warnings
warnings.filterwarnings('ignore')

import joblib
import numpy as np
import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt
import re
import itertools    
import wordcloud

# For data preprocessing
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import WordNetLemmatizer

# For building our Models
import tensorflow as tf
from tensorflow.keras.layers import Input, Dense, LSTM, Embedding, Conv1D, Bidirectional, SpatialDropout1D, Dropout
from tensorflow.keras import Sequential
from tensorflow.keras.optimizers import Adam
from sklearn.svm import LinearSVC, SVC
from sklearn.model_selection import cross_val_score, KFold, cross_val_predict, cross_validate

from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from tensorflow.keras.models import Model

# For Lazy Predict (commented out)
# from lazypredict.Supervised import LazyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, GradientBoostingClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier

# For hyperparameter tuning
from scipy.stats import uniform

# Reduce dimensions to 2 for faster training
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# For creating vocabulary dictionary
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# For model evaluation
from sklearn.model_selection import LearningCurveDisplay, learning_curve
from sklearn.metrics import confusion_matrix, classification_report, log_loss, make_scorer, accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, auc, DetCurveDisplay, RocCurveDisplay, roc_curve, ConfusionMatrixDisplay
from sklearn.model_selection import GridSearchCV

# For processing texts
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
```
**What’s happening here?**

- `warnings.filterwarnings('ignore')`: Suppresses any warnings for cleaner output.
- `pandas`, `numpy`, `matplotlib`, `plotly`, **etc**.: Data handling, visualization libraries.
- `nltk`, `WordNetLemmatizer`, `stopwords`: Common NLP libraries for text processing.
- `tensorflow`, `keras`: Building and training our deep learning model (LSTM).
- `sklearn`: Traditional machine learning tools, plus utilities for train/test split, hyperparameter tuning, etc.
- `joblib`: For saving and loading models/tokenizers.


## 4. Loading and Inspecting Data
Here, we load a CSV file that contains sarcasm headlines data. Let’s see how many records we have and if there are duplicates.

```
data = pd.read_csv('dataset/sarcasm_headlines.csv')

def check_duplicates(data):
    duplicate = data.duplicated().sum()
    return duplicate

print(check_duplicates(data))
```
- `pd.read_csv(...)` loads our CSV data into a DataFrame named `data`.
- `check_duplicates` function sums up duplicated rows (if any).
- `print(check_duplicates(data))` shows how many duplicate entries exist.

## 5. Data Cleaning
Sarcasm detection often depends on subtle textual cues, and clean, standardized input can significantly improve model performance.

### 5.1 Removing Special Characters

```
# Show the special characters in the text column
data[data['text'].str.contains(r'[^A-Za-z0-9 ]', regex=True)]

# Function to remove special characters
def remove_special_characters(text):
    text = re.sub(r'[^A-Za-z0-9 ]', '', text)
    return text

# Apply function to remove special characters
data['text'] = data['text'].apply(remove_special_characters)
```

- `data['text'].str.contains(...)`: Check if special characters exist in each row’s text.
- `remove_special_characters`: Uses a regular expression to replace all non-alphanumeric characters (excluding space) with nothing.
- `apply(...)`: This function applies to each row in the text column.

**Further Checks**

```
def special_characters(data):
    special = data.str.contains(r'[^A-Za-z0-9 ]', regex=True).sum()
    return special

special_characters(data['text'])
```
This confirms if any special characters remain after we’ve removed them.

### 5.2 Additional Noise Removal (URLs, HTML, Non-ASCII, Punctuation)

Here, we define small utility functions:

```
def remove_URL(text):
    return re.sub(r"https?://\S+|www\.\S+", "", text)

def remove_html(text):
    html = re.compile(r"<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});")
    return re.sub(html, "", text)

def remove_non_ascii(text):
    return re.sub(r'[^\x00-\x7f]',r'', text)

def remove_punct(text):
    return re.sub(r'[]!"$%&\'()*+,./:;=#@?[\\^_`{|}~-]+', "", text)
```

- `remove_URL`: Removes URLs.
- `remove_html`: Removes HTML tags or entities.
- `remove_non_ascii`: Removes non-ASCII characters.
- `remove_punct`: Removes punctuation.

**Additional Slang, Acronyms, and Common Abbreviations**

```
def other_clean(text):
    # Contains dictionaries of slang, acronyms, abbreviations
    # Replaces them with their expanded forms
    ...
    return text
```

This function corrects typos and expands acronyms like “wtf” to “what the fuck” to make the text more standardized.

Finally, we apply them all:

```
data["text"] = data["text"].apply(lambda x: remove_URL(x))
data["text"] = data["text"].apply(lambda x: remove_html(x))
data["text"] = data["text"].apply(lambda x: remove_non_ascii(x))
data["text"] = data["text"].apply(lambda x: remove_punct(x))
data["text"] = data["text"].apply(lambda x: other_clean(x))
```
**Stopword Removal and Lemmatization**

**Stopwords** like “the,” “is,” “at” often don’t contribute much to classification. **Lemmatization** ensures words are reduced to their base form.

```
nltk.download('stopwords')
nltk.download('wordnet')
stop = stopwords.words('english')

data['removed_stopwords'] = data['text'].apply(
    lambda x: ' '.join([word for word in x.split() if word not in (stop)])
)

def lemmatized_text(corpus):
    lemmatizer = WordNetLemmatizer()
    return [' '.join([lemmatizer.lemmatize(word) for word in review.split()]) for review in corpus]

data['lemmatized_texts'] = lemmatized_text(data['removed_stopwords'])
```
Now, each headline is clean, de-noised, and lemmatized, forming our final text data.

### 6. Using GloVe Embeddings

We’ll use **GloVe** (Global Vectors for Word Representation) as our word embeddings, specifically the `glove.6B.100d.txt` file. You must have this file in your dataset/ directory for the code to work.

```
import os

file_path = "dataset/glove.6B.100d.txt"
print("File exists:", os.path.isfile(file_path))

def load_glove_embeddings(file_path):
    embeddings_index = {}
    with open(file_path, encoding="utf8") as file:
        for line in file:
            values = line.split()
            word = values[0]
            vector = np.asarray(values[1:], dtype='float32')
            embeddings_index[word] = vector
    return embeddings_index

if os.path.isfile(file_path):
    embeddings_index = load_glove_embeddings(file_path)
else:
    raise FileNotFoundError("GloVe file not found. Please check the file path.")

print("Number of words in GloVe embeddings:", len(embeddings_index))
```
- **load_glove_embeddings**: Reads the GloVe file line by line, splitting each line into a `word` and its corresponding `vector`.
- The dictionary `embeddings_index` holds a mapping from words -> 100-dimensional float vectors.

### 6.1 Creating the Embedding Matrix
We’ll **tokenize** our texts and build an embedding matrix with shape (vocab_size, 100):

```
tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(data['lemmatized_texts'])
word_index = tokenizer.word_index

embedding_dim = 100
vocab_size = len(word_index) + 1
embedding_matrix = np.zeros((vocab_size, embedding_dim))

for word, i in word_index.items():
    embedding_vector = embeddings_index.get(word)
    if embedding_vector is not None:
        embedding_matrix[i] = embedding_vector

X_seq = tokenizer.texts_to_sequences(data['lemmatized_texts'])
X_pad = pad_sequences(X_seq, maxlen=100)
```
- `tokenizer`: Converts words to integer indices.
- `num_words=5000`: We limit ourselves to the top 5,000 words in the dataset.
- `embedding_matrix`: Each row corresponds to a word in our vocabulary; columns are the vector values (100).
- `texts_to_sequences`: Replaces words in each text with their integer representation.
- `pad_sequences`: Ensures all sequences are of equal length (here, maxlen=100).

We can also create a **feature matrix** by averaging the embeddings of each token in a sequence:

```
def create_feature_matrix(sequences, embedding_matrix):
    features = np.zeros((sequences.shape[0], embedding_matrix.shape[1]))
    for i, seq in enumerate(sequences):
        features[i] = np.mean(embedding_matrix[seq], axis=0)
    return features

X_features = create_feature_matrix(X_pad, embedding_matrix)
print("Shape of feature matrix:", X_features.shape)
```
- For each sequence, we average the GloVe embeddings of all tokens to get a single vector representation.
- This yields `(num_samples, embedding_dim)` shape in `X_features`.

This can be used for certain ML models, though for an LSTM, we typically feed the **sequences** themselves.

## 7. Building the LSTM Model

We now define and train our LSTM model. LSTM is a special Recurrent Neural Network (RNN) well-suited for long sequences and capturing context across words.

### 7.1 Preparing Data for the LSTM Model

```
texts = data['text'].tolist()
labels = data['is_sarcastic'].tolist()

MAX_SEQUENCE_LENGTH = 30
EMBEDDING_DIM = 100

tokenizer = Tokenizer()
tokenizer.fit_on_texts(texts)
word_index = tokenizer.word_index

sequences = tokenizer.texts_to_sequences(texts)
X_data = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)
y_data = np.array(labels)
```
We do a fresh tokenize specifically for the model (ensuring we have the correct sequence length, etc.).

- `MAX_SEQUENCE_LENGTH = 30`: We choose 30 as the maximum number of tokens per headline. Which means we we limit sequences to 30 tokens
- y_data: The binary labels (0 for not sarcastic, 1 for sarcastic).

**Loading GloVe Again (For the Model)**

```
def load_glove_embeddings(file_path, embedding_dim):
    embeddings_index = {}
    with open(file_path, 'r', encoding='utf8') as f:
        for line in f:
            values = line.split()
            word = values[0]
            coefs = np.asarray(values[1:], dtype='float32')
            embeddings_index[word] = coefs
    return embeddings_index

def create_embedding_matrix(word_index, embeddings_index, embedding_dim):
    embedding_matrix = np.zeros((len(word_index) + 1, embedding_dim))
    for word, i in word_index.items():
        embedding_vector = embeddings_index.get(word)
        if embedding_vector is not None:
            embedding_matrix[i] = embedding_vector
    return embedding_matrix

embeddings_index = load_glove_embeddings(file_path, EMBEDDING_DIM)
embedding_matrix = create_embedding_matrix(word_index, embeddings_index, EMBEDDING_DIM)
vocab_size = len(word_index) + 1
```
We repeat the creation of `embeddings_index` and `embedding_matrix` for these new tokens.

### 7.2 Defining the LSTM Architecture

```
def LSTM_RNN(vocab_size, embed_dim, embed_matrix, max_seq_len):
    embedding_layer = Embedding(vocab_size, embed_dim, weights=[embed_matrix], 
                                input_length=max_seq_len, trainable=False)

    sequence_input = Input(shape=(max_seq_len,), dtype='int32')
    embedding_sequences = embedding_layer(sequence_input)
    x = Dropout(0.2)(embedding_sequences)
    x = Conv1D(64, 5, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01))(x)
    x = Bidirectional(LSTM(64, dropout=0.3, recurrent_dropout=0.2))(x)
    x = Dense(256, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.01))(x)
    x = Dropout(0.5)(x)
    x = Dense(128, activation='relu')(x)
    outputs = Dense(1, activation='sigmoid')(x)
    model = tf.keras.Model(sequence_input, outputs)

    model.compile(optimizer=Adam(learning_rate=1e-4), loss='binary_crossentropy', metrics=['accuracy'])
    model.summary()
    return model

lstm_model = LSTM_RNN(vocab_size, EMBEDDING_DIM, embedding_matrix, MAX_SEQUENCE_LENGTH)
```
Key Layers include:

- `Embedding(...)`: Initializes an embedding layer with our GloVe vectors.
- `trainable=False`: This means we do not update these embeddings during training.
- `Dropout(...)`: Randomly sets input units to 0 to reduce overfitting.
- `Conv1D(...)`: A 1D convolution to capture local patterns in the text.
- `Bidirectional(LSTM(64, ...))`: Our main LSTM layer with 64 units, reading the text forward and backward.
- `Dense(256, activation='relu')`: A fully connected layer for learning higher-level features.
- `Dense(1, activation='sigmoid')`: Outputs a probability of sarcasm (between 0 and 1).
- `model.compile(...)`: Uses the **Adam** optimizer with a learning rate of `1e-4`.

### 7.3 Training the Model

```
batch_size = 100
epochs = 10

early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=3, min_lr=1e-5)
model_checkpoint = ModelCheckpoint('best_model.keras', save_best_only=True, monitor='val_loss')

history = lstm_model.fit(
    X_data, y_data,
    epochs=epochs,
    batch_size=batch_size,
    validation_split=0.2,
    verbose=1,
    callbacks=[early_stopping, reduce_lr, model_checkpoint]
)
```

- `batch_size`: How many samples we process in one go (set to 100).
- `epochs`: The number of times we iterate over the entire dataset (set to 10).
- `EarlyStopping`: Stops training if validation loss doesn’t improve for 5 epochs.
- `ReduceLROnPlateau`: Lowers the learning rate by a factor of 0.2 if no improvement in 3 epochs.
- `ModelCheckpoint`: Saves the best model parameters to `best_model.keras` based on validation loss.

### 7.4 Saving the Model and Tokenizer

```
joblib.dump(tokenizer, 'tokenizer.joblib')
lstm_model.save('best_model.h5')
```
- We save `tokenizer` using `joblib`.
- We also save the trained model weights into `best_model.h5`.


## 8. Deploying with Streamlit

Now that we have a trained model, we can serve it via **Streamlit** for a simple web interface.

Below is the `app.py` (or any Python file you’ll run with `streamlit run app.py`):

```
import streamlit as st
import joblib
import json 
import tensorflow as tf
from tensorflow.keras.models import load_model, save_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import numpy as np

# Load the trained model and tokenizer
@st.cache_resource
def load_resources():
    try:
        model = tf.keras.models.load_model('best_model.keras')
        tokenizer = joblib.load('tokenizer.joblib')
        return model, tokenizer
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

model, tokenizer = load_resources()

# Define constants
MAX_SEQUENCE_LENGTH = 30

# Title
st.title("Sarcasm Detection Model")

# Input form
input_text = st.text_input("Enter a sentence to check for sarcasm:", "")

if st.button("Predict"):
    if input_text.strip():
        # Preprocess the input text
        sequences = tokenizer.texts_to_sequences([input_text])
        padded_seq = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH)
        
        # Predict using the model
        prediction = model.predict(padded_seq)[0][0]
        
        # Output prediction
        st.subheader("Prediction:")
        if prediction > 0.5:
            st.write(f"**Sarcastic** with a probability of {prediction:.2f}")
        else:
            st.write(f"**Not Sarcastic** with a probability of {1 - prediction:.2f}")
    else:
        st.warning("Please enter a valid sentence.")

st.markdown("This app uses an LSTM model trained on a sarcasm dataset.")
```

**Explanation**

1. `@st.cache_resource`: Caches the model and tokenizer so they’re loaded only once.
2. `load_model('best_model.keras')`: Loads the best model saved during training.
3. **User Input**: `st.text_input(...)` collects user text.
4. **Preprocessing**: Convert the text input into sequences, pad them to the same length as the training data.
5. **Prediction**: Model outputs a probability, and we decide “Sarcastic” if > 0.5.
6. **Streamlit UI**: We display the result using `st.write(...)` and a neat probability format.

## 9. Putting It All Together

1. **Clean and preprocess** your dataset in a Python script or notebook.
2. **Train** the LSTM model to detect sarcasm, ensuring you save:
3. `best_model.keras (or best_model.h5)`, `tokenizer.joblib`
4. Create a **Streamlit** file (`app.py`) for deployment.
5. **Run** the following command in your terminal:

```
streamlit run app.py
```
6. Open the local **URL** displayed (usually `http://localhost:8501`) to access your web app.
7. Navigate to the displayed local URL, and you’ll see a text box where you can input sentences. The app will then tell you whether the sentence is sarcastic or not!

**Here is the link to the complete code on** [GitHub](https://github.com/kennyOlakunle/sarcasm_detection)

## 10. Conclusion
**Congratulations!** You’ve built a **Sarcasm Detection** application from scratch.

In this blog post, we walked through **end-to-end sarcasm detection**:
- Data ingestion and detailed **cleaning**.
- **Embedding** the text using GloVe vectors.
- Building and **training** an LSTM network with additional convolutional layers.
- **Deploying** to an interactive interface via **Streamlit**.

## 11. Next Steps

This process demonstrates **end-to-end NLP** for a challenging classification task. You can extend this workflow by:

1. **Experiment with more advanced embeddings** like **BERT** or **ELMo** to capture deeper contextual information.
2. **Hyperparameter tuning**: Adjust LSTM units, batch size, or layer configurations for better accuracy.
3. **Data augmentation**: If the dataset is small, consider collecting more sarcastic/non-sarcastic samples or using advanced augmentation strategies.
4. **Expand domain**: Apply this approach to various text sources—tweets, product reviews, etc.
Add interpretability: Use libraries like SHAP or LIME to see which words most influence your model’s decisions.
5. Adding more data or investigating **class imbalance** (if one class is more frequent

I hope this tutorial helps you confidently build your own **NLP** applications for sarcasm detection or any other text classification problem!

**Thank you for reading**. Happy coding, and may your model’s sense of sarcasm improve daily! Feel free to comment or reach out if you have any questions or suggestions.

## References

- [Sarcasm Headlines Dataset (original Kaggle dataset)](https://www.kaggle.com/datasets/rmisra/news-headlines-dataset-for-sarcasm-detection)

- [GloVe: Global Vectors for Word Representation:](https://nlp.stanford.edu/projects/glove/)

- [Numpy](https://numpy.org/)

- [Pandas](https://pandas.pydata.org/)

- [NLTK (Natural Language Toolkit)](https://www.nltk.org/)

- [TensorFlow](https://www.tensorflow.org/)

- [Keras API reference](https://keras.io/)

- [Streamlit](https://streamlit.io/)

- [Scikit-learn](https://scikit-learn.org/stable/)

- [Joblib](https://joblib.readthedocs.io/en/latest/)
