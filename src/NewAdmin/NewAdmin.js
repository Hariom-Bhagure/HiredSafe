const bcrypt = require('bcryptjs');
const Admin = require('../Server/models/AdminloginModal');

const createAdmin = async () => {
  const username = 'Director@visioment.com';
  const password = 'Visioment@2024';

  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new admin
  const newAdmin = new Admin({
    username,
    password: hashedPassword,
  });

  await newAdmin.save();
  console.log('Admin created');
};

createAdmin();
