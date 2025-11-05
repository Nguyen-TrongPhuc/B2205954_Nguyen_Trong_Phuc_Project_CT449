// Controller cho chức năng quản lý sách (LibraryBook)
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    // 1️⃣ Kiểm tra dữ liệu đầu vào
    if (!req.body?.title) {
        return next(new ApiError(400, "Title cannot be empty"));
    }

    try {
        // 2️⃣ Tạo đối tượng service để làm việc với MongoDB
        const bookService = new BookService(MongoDB.client);

        // 3️⃣ Gọi hàm create() trong service để thêm sách mới
        const book = await bookService.create(req.body);

        // 4️⃣ Gửi phản hồi lại cho client
        return res.send(book);
    } catch (error) {
        // 5️⃣ Nếu có lỗi trong quá trình thêm sách
        return next(
            new ApiError(500, "An error occurred while creating the book")
        );
    }
};


exports.findAll = async (req, res, next) => {
    let books = [];

    try {
        const bookService = new BookService(MongoDB.client);
        const { title } = req.query;  // Lấy query parameter "title" từ URL

        if (title) {
            // Nếu có title, tìm sách theo tiêu đề
            books = await bookService.findByTitle(title);
        } else {
            // Nếu không có title, lấy tất cả sách
            books = await bookService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving books")
        );
    }

    return res.send(books);
};


// controller/book.controller.js

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const book = await bookService.findById(req.params.id); // tìm sách theo id

        if (!book) {
            return next(new ApiError(404, "Book not found"));
        }

        return res.send(book);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving book with id=${req.params.id}`
            )
        );
    }
};

// controller/book.controller.js

exports.update = async (req, res, next) => {
  // 1️⃣ Kiểm tra dữ liệu đầu vào
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  try {
    const bookService = new BookService(MongoDB.client);
    const updatedBook = await bookService.update(req.params.id, req.body);

    if (!updatedBook) {
      return next(new ApiError(404, "Book not found"));
    }

    return res.send({ message: "Book was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating book with id=${req.params.id}`)
    );
  }
};


// controller/book.controller.js

exports.delete = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const book = await bookService.delete(req.params.id);

    if (!book) {
      return next(new ApiError(404, "Book not found"));
    }

    return res.send({ message: "Book was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not delete book with id=${req.params.id}`
      )
    );
  }
};


exports.deleteAll = async (_req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const deletedCount = await bookService.deleteAll();
    return res.send({
      message: `${deletedCount} books were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all books")
    );
  }
};


// controller/book.controller.js

exports.findAllBorrowed = async (_req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const books = await bookService.findBorrowed(); // lấy sách borrowed
    return res.send(books);
  } catch (error) {
    return next(
      new ApiError(
        500,
        "An error occurred while retrieving borrowed books"
      )
    );
  }
};

