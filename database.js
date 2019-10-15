'use strict';

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbname = 'books';

const faker = require('faker');

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err);
    throw err;
  }

  const db = client.db(dbname);
  const collection = db.collection('books');

  collection.insert(
    [
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "Game of Thrones",
        "author": "George R. R. Martin",
        "date": faker.date.recent(60),
        "bookType": "Read",

      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "Harry Potter",
        "author": "J. K. Rowling",        
        "date": faker.date.recent(60),
        "bookType": "Read",

      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "The Shining",
        "author": "Stephen King",    
        "date": faker.date.recent(60),
        "bookType": "Read",

      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "1984",
        "author": "George Orwell",    
        "date": faker.date.recent(60),
        "bookType": "Read",
   
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "The Shining",
        "author": "Stephen King",    
        "date": faker.date.recent(60),
        "bookType": "Read",
  
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "1984",
        "author": "George Orwell", 
        "date": faker.date.recent(60),
        "bookType": "Read",
     
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "1984",
        "author": "George Orwell",    
        "date": faker.date.recent(60),
        "bookType": "Read",
       
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "1984",
        "author": "George Orwell",    
        "date": faker.date.recent(60),
        "bookType": "Read",
       
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "1984",
        "author": "George Orwell",    
        "date": faker.date.recent(60),
        "bookType": "Read",
   
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "1984",
        "author": "George Orwell",    
        "date": faker.date.recent(60),
        "bookType": "Read",
     
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "title": "1984",
        "author": "George Orwell",    
        "date": faker.date.recent(60),
        "bookType": "Read",
   
      }

    ],
    (err, result) => {
      collection.find({}).toArray((err, items) => {
        if (err) {
          throw err;
        }
        console.log('items', items);
        client.close();
      });
    }
  )
});