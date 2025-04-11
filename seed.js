const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB, seeding users...');
    await User.deleteMany(); // optional: clear existing users
    const users = await User.insertMany([
      { username: 'user1' },
      { username: 'user2' }
    ]);
    console.log('Inserted users:', users);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
