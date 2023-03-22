const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Create database instance
const adapter = new FileSync('db.json');
const db = low(adapter);

// Retrieve all users from the database
function getAllUsers() {
  return db.get('users').value();
}

module.exports = {
  getAllUsers,
};
