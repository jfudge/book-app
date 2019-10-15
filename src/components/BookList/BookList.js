import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { getToken } from '../../services/tokenService';
import ShowMore from '../ShowMore/ShowMore';
import AddBook from '../AddBook/AddBook';
import './BookList.css';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';

const BookList = (props) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);

  const fetchBooks = async (id) => {
    try {
      const res = await axios.post(`/api/books`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        data: {
          'userId': id
        }
      });

      const sortedBooks = res.data.data;
      sortedBooks.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else {
          return -1;
        }

      });

      setBooks(sortedBooks);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchBooks(props.userId);
  }, [props.userId, books]);

  const showMoreInfo = (book) => {
    setSelectedBook(book);
    setIsShowMoreVisible(true);
  }

  const hideMoreInfo = () => {
    setSelectedBook({});
    setIsShowMoreVisible(false);
  }

  const userName = props.userName;
  return (

    <section className='book-list'>
      <h1>
        Books Library
      </h1>
      <div className="addbtn">
        <Button onClick={() => setShowAddBook(true)} variant="contained" color="secondary" className="add-new-button classes.button"
          startIcon={<AddCircleIcon />}>
          Add Book
        </Button>
      </div>

      {showAddBook && <AddBook setShowAddBook={setShowAddBook} userId={props.userId} />}
      {isShowMoreVisible && <ShowMore book={selectedBook} hideMoreInfo={hideMoreInfo} />}
      <div>
        {books.map(book => {
          return (
            <div className="library">
              <Paper className="classes.paper">
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className="classes.image">
                      <BookmarkIcon className="largeIcon" />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography className="title" gutterBottom variant="subtitle1">
                          {book.title}
                        </Typography>
                        <Typography className="author" variant="subtitle1" gutterBottom>
                          Author: {book.author}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" style={{ cursor: 'pointer' }}>
                          <Moment date={book.date} format='YYYY-D-M' />
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item className="remove">
                      <Typography variant="subtitle1">
                        <Button variant="contained" color="primary" className="more" onClick={() => showMoreInfo(book)}>
                          Edit
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BookList;