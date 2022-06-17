const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const users = [
  {
    username: 'Tyler',
    password: 'asdf'
  },
  {
    username: 'TheCoolerTyler',
    password: 'thecoolerasdf'
  },
  {
    username: 'TheNotCoolTyler',
    password: 'thenotcoolasdf'
  }
]

const blogs = [
  {
    title: 'This is what it is like to be Tyler',
    body: 'He is not as cool as the Cool Tyler',
    userId: 1
  },
  {
    title: 'Poo poo',
    body: 'Poo poo',
    userId: 1
  },
  {
    title: 'The Cool Tyler kinda sucks',
    body: 'no futher comment',
    userId: 2
  },
]

const createBlogs = async ()=>{
  try{
      await sequelize.sync({force:true})
      await User.bulkCreate(users,{
          individualHooks:true
      });
      await Blog.bulkCreate(blogs);
      process.exit(0);
  } catch(err){
      console.log(err)
  }
}

createBlogs()