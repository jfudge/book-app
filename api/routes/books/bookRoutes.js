'use strict';

const express = require('express');
const router = express.Router();
const bookService = require('./bookService');
const requireAuth = require('../../middleware/auth');

router.route('/new')
  .post(requireAuth, async (req, res, next) => {
    try {
      const book = await bookService.createBook(req.body.data);
      res.status(201).json({
        data: [book]
      });
    } catch (e) {
      next(e);
    }
  });

router.route('/edit')
  .post(requireAuth, async (req, res, next) => {
    try {
      const book = await bookService.editBook(req.body.headers.bookId, req.body.data);
      res.status(201).json({
        data: [book]
      });
    } catch (e) {
      next(e);
    }
  });

router.route('/')
  .post(requireAuth, async (req, res, next) => {
    try {
      const allBooks = await bookService.listBooks(req.body.data['userId']);
      res.status(200).send({
        data: allBooks
      });
    } catch (e) {
      next(e);
    }
  });

router.route('/book/:id')
  .get(requireAuth, async (req, res, next) => {
    try {
      const book = await bookService.getBookById(req.params.id);
      res.status(200).send({
        data: book
      });
    } catch (e) {
      next(e);
    }
  });

router.route('/delete/:id')
  .delete(async (req, res, next) => {
    try {
      const book = await bookService.deleteBook(req.params.id);
      if (book) {
        res.status(204).send('record deleted');
      } else {
        res.status(404).send('record not found');
      }
    } catch (e) {
      next(e);
    }
  })

exports.router = router;