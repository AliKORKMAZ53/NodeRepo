
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
/*
createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'John' })
]);*/

async function addAuthor(courseId,author){
  const course=await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

//addAuthor('5f2556214d544b2d78674626',new Author({name:'Amy'}));

async function removeAuthor(courseId,authorId){
  const course=await Course.findById(courseId);
  const author=course.authors.id(authorId);
  author.remove();
  course.save();
}
removeAuthor('5f2556214d544b2d78674626','5f2558feb5b7cc051847ed0a')
/*
async function updateAuthor(courseId){
  const course= await Course.update({_id:courseId},{
    $set:{
      'author.name':'John Smith'
      
      //$unset:{
      //  'author':''                    //this removes author sub-document
     // }
      
    }
  });

}

updateAuthor('5f2545adeb2ec63efcab6f54');
*/