require('dotenv').config();
const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'John',
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Magnus Nielsen',
    age: 33,
    favoriteFoods: ['salad', 'seafood', 'sushi']
  })
  person.save((err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, (err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd)
    data.save((err, data) => {
      console.error('Error : ', err)
      console.log('Data : ', data)
      done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    console.error('Error : ', err)
    console.log('Data : ', data)
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name: 'asc'})
        .limit(2)
        .select(['name','favoriteFoods'])
        .exec((err, data) => {
          console.error('Error : ', err)
          console.log('Data : ', data)
          done(err, data)
        })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
