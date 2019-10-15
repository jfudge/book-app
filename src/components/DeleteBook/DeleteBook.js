import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const Delete = ({ cancel, finishDelete, book }) => {
  const handleDelete = async () => {
    try {
      console.log(book._id);

      const res = await axios.delete(`/api/books/delete/${book._id}`);
      console.log(`Deleted: ${res}`);
      finishDelete();
      cancel();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='show-more-wrapper'>
      <h4>Are you sure you want to delete this book?</h4>
      <Button variant="contained" color="primary" className="cancel" onClick={cancel}>
        Cancel
      </Button>

      <Button variant="contained" color="primary" className="submit" onClick={handleDelete}>
        Delete
      </Button>

    </div>
  );
}

export default Delete;