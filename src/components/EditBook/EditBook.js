import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import '../AddBook/AddBook';


import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: this.props.book._id,
      userId: this.props.book.userId,
      title: this.props.book.title,
      author: this.props.book.author,
      date: this.props.book.date,

    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTimeChange = date => {
    this.setState({ date: date });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/books/edit`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'bookId': this.state.bookId
        },
        data: {
          title: this.state.title,
          author: this.state.author,
          date: this.state.date,
          userId: this.state.userId,

        }
      });

      const newBook = {
        title: this.state.title,
        author: this.state.author,
        date: this.state.date,
        userId: this.state.userId,

      }
      this.props.updateDisplay(newBook);

      console.log(`Edited record: ${res}`);
      this.props.setShowEdit(false);
    } catch (e) {
      this.setState({ message: e });
      console.log(this.state.message);
    }
  }

  render() {
    return (
      <div className='add-new-modal'>
        <div className='add-new-wrapper'>
          <h4>Edit Book</h4>
          <form autoComplete='off' onSubmit={this.handleSubmit}>
            <Input onChange={this.handleChange}
              type="text"
              name="title"
              label="With normal TextField"
              id="title"
              placeholder="Title"
              className="classes.input"
            />

            <Input onChange={this.handleChange}
              name="author"
              type="text"
              label="With normal TextField"
              id="author"
              placeholder="Author"
              className="classes.input"
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name='bookDate'
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id='bookDate'
                onChange={this.handleTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <Button variant="contained" color="primary" className="submit" type='submit' onClick={this.handleSubmit}>
              Save
            </Button>

            <Button variant="contained" color="primary" className="cancel" onClick={() => this.props.setShowEdit(false)}>
              Cancel
            </Button>

          </form>
        </div>
      </div>
    );
  }
}

export default EditBook;