import React, { useState } from 'react';
import Delete from '../DeleteBook/DeleteBook';
import EditBook from '../EditBook/EditBook';
import Button from '@material-ui/core/Button';
import './ShowMore.css';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ShowMore = ({ book, hideMoreInfo }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const classes = useStyles();

  const finishDelete = () => {
    setIsDeleted(true);
  }

  const displayBook = book;

  const updateDisplay = (newBook) => {
    displayBook.date = newBook.date;
    displayBook.title = newBook.title;
    displayBook.author = newBook.author;

  }

  return (
    <>
      {showEdit ? (
        <EditBook setShowEdit={setShowEdit} book={displayBook} updateDisplay={updateDisplay} />
      ) : (
          <div className='show-more-modal'>
            {showDelete ? (
              <Delete finishDelete={finishDelete} cancel={() => setShowDelete(false)} book={displayBook} />
            ) : (
                <div className='show-more-wrapper'>
                  {!isDeleted ? (
                    <>

                      <div className="close">
                        <Button variant="contained" color="primary" className="cancel" onClick={hideMoreInfo}>
                          Close
                        </Button>
                      </div>
                      <div className="edit-content">
                        <List className="classes.root">
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Title" secondary={displayBook.title} />
                          </ListItem>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <LibraryBooksIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Author" secondary={displayBook.author} />
                          </ListItem>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Date" format="YYYY-D-M" secondary={displayBook.date} />
                          </ListItem>
                        </List>
                      </div>
                      <Button variant="contained" color="primary" className="cancel" onClick={() => setShowDelete(true)}>
                        Delete Book
                      </Button>
                      <Button variant="contained" color="primary" className="cancel" onClick={() => setShowEdit(true)}>
                        Edit Book
                      </Button>
                    </>
                  ) : (
                      <>
                        <p>Book Deleted!</p>
                        <div className='close-wrap'>
                          <Button variant="contained" color="primary" className="close" onClick={hideMoreInfo}>
                            Close
                          </Button>

                        </div>
                      </>
                    )}
                </div>
              )}
          </div>
        )}
    </>
  );
}

export default ShowMore;