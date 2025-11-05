const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("books");
    }
    extractBookData(payload) {
    const book = {
        title: payload.title,
        author: payload.author,
        publisher: payload.publisher,
        year: payload.year,
        genre: payload.genre,
        available: payload.available,
        borrowed: payload.borrowed,
    };
    // Xóa các trường undefined
    Object.keys(book).forEach(
        (key) => book[key] === undefined && delete book[key]
    );
    return book;
}

async create(payload) {
    const book = this.extractBookData(payload);
    // Logic hợp lý hơn: tìm sách theo title, nếu chưa có thì tạo mới (upsert)
    // Điều này tránh việc filter theo tất cả các trường bao gồm cả `borrowed`
    const filter = { title: book.title }; 
    const result = await this.Book.findOneAndUpdate(
        filter,
        // Dùng $setOnInsert để chỉ đặt giá trị khi tạo mới
        // và $set để cập nhật các trường khác nếu cần
        { $set: book, $setOnInsert: { available: book.available !== false } },
        { returnDocument: "after", upsert: true }
    );
    return result;
}
 async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }

    // Tìm sách theo title (không phân biệt hoa thường)
    async findByTitle(title) {
        return await this.find({
            title: { $regex: new RegExp(title), $options: "i" },
        });
    }
    async findById(id) {
    return await this.Book.findOne({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
}
async update(id, payload) {
  const filter = {
    _id: ObjectId.isValid(id) ? new ObjectId(String(id)) : null,
  };

  // Chuẩn hóa dữ liệu sách trước khi cập nhật
  const update = this.extractBookData(payload);

  const result = await this.Book.findOneAndUpdate(
    filter,
    { $set: update },
    { returnDocument: "after" }
  );

  return result;
}
async delete(id) {
  const result = await this.Book.findOneAndDelete({
    _id: ObjectId.isValid(id) ? new ObjectId(String(id)) : null,
  });
  return result;
}
async deleteAll() {
  const result = await this.Book.deleteMany({});
  return result.deletedCount;
}
async findBorrowed() {
  return await this.find({ borrowed: true });
}

}
module.exports = BookService;