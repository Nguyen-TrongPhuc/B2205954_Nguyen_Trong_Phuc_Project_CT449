const express = require("express");
const books = require("../controllers/book.controller");

const router = express.Router();

// Route gốc: /api/books
router.route("/")
  .get(books.findAll)        // Lấy danh sách tất cả sách
  .post(books.create)        // Thêm mới 1 sách
  .delete(books.deleteAll);  // Xóa tất cả sách

// Route: /api/books/borrowed
router.route("/borrowed")
  .get(books.findAllBorrowed); // Lấy danh sách sách đang được mượn

// Route: /api/books/:id
router.route("/:id")
  .get(books.findOne)        // Lấy 1 sách theo ID
  .put(books.update)         // Cập nhật sách theo ID
  .delete(books.delete);     // Xóa 1 sách theo ID

module.exports = router;
