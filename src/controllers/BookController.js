const User = require('../models/User');
const Book = require('../models/Book');

module.exports = {
  async index(req, res) {
    const user_id = req.userId;

    const user = await User.findByPk(user_id, {
      include: { association: 'books' },
    });
    if (!user) {
      res.status(400).json({ error: 'User not found' });
    }
    console.log('Id de usuário', req.userId);
    return res.json(user);
  },

  async store(req, res) {
    const { name, url } = req.body;
    const user_id = req.userId;

    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(400).json({ error: 'User not found' });
    }

    const book = await Book.create({
      name,
      url,
      user_id: req.userId,
    });

    return res.json(book);
  },

  async delete(req, res) {
    const { book_id } = req.params;
    const user_id = req.userId;

    const user = await User.findByPk(user_id);
    if (!user) {
      res.status(400).json({ error: 'User not found' });
    }

    const book = await Book.findByPk(book_id);
    if (!book) {
      res.status(400).json({ error: 'Book not found' });
    }

    if (book.user_id == req.userId) {
      await book.destroy();
      res.status(200).json({ success: 'Success' });
    } else {
      res.status(400).json({ error: 'Without permission' });
    }
  },
};
