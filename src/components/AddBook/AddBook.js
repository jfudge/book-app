import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../services/tokenService';

import './AddBook.css';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class AddBook extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      bookDate: new Date(),
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTimeChange = date => {
    this.setState({ bookDate: date });
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {

      const res = await axios.post(`/api/books/new`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        data: {
          title: this.state.title,
          author: this.state.author,
          date: this.state.bookDate,
          userId: this.props.userId,

        }
      });

      console.log(`Created new record: ${res}`);
      this.props.setShowAddBook(false);
    } catch (e) {
      this.setState({ message: e });
      console.log(this.state.message);
    }
  }

  render() {
    return (
      <div className='add-new-modal'>
        <div className='add-new-wrapper'>
          <h4>Add New Book</h4>
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
                value={this.state.bookDate}
                onChange={this.handleTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <Button variant="contained" color="primary" className="add" type='submit' onClick={this.handleSubmit}>
              Add Book
            </Button>

            <Button variant="contained" color="primary" className="cancel" onClick={() => this.props.setShowAddBook(false)}>
              Cancel
            </Button>

          </form>
        </div>
      </div>
    );
  }
}

export default AddBook;