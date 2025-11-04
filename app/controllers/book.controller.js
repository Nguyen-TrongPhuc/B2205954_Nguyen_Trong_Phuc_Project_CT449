// Controller cho chức năng quản lý sách (LibraryBook)

exports.create = (req, res) => {
  res.send({ message: "create book handler" });
};

exports.findAll = (req, res) => {
  res.send({ message: "findAll books handler" });
};

exports.findOne = (req, res) => {
  res.send({ message: "findOne book handler" });
};

exports.update = (req, res) => {
  res.send({ message: "update book handler" });
};

exports.delete = (req, res) => {
  res.send({ message: "delete book handler" });
};

exports.deleteAll = (req, res) => {
  res.send({ message: "deleteAll books handler" });
};

exports.findAllBorrowed = (req, res) => {
  res.send({ message: "findAllBorrowed books handler" });
};
