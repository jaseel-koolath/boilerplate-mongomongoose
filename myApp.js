require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});
let Person = new mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = Person({ name: "Jaseel", age: 10, favoriteFoods: ["Mandi"] });
  result = person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  // Person.find({name: personName}, (err, data) => {
  //   if (err) return done(err);
  //   done(null, data);
  // });
  // done(null /*, data*/);
  Person.find({ name: personName })
    .then((data) => done(null, data))
    .catch((err) => done(err));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food })
    .then((data) => done(null, data))
    .catch((err) => done(err));
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId)
    .then((data) => done(null, data))
    .catch((err) => done(err));
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId)
    .then((person) => {
      person.favoriteFoods.push(foodToAdd);
      person
        .save()
        .then((result) => done(null, result))
        .catch((err) => done(err));
    })
    .catch((err) => done(err));
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  let doc = Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }
  );
  doc.then((doc) => done(null, doc)).catch((err) => done(err));

  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) done(err);
    else done(null, data);
  });
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, doc) => {
    if (err) done(err);
    else done(null, doc);
  });
  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select({ age: false })
    .exec((err, result) => {
      if (err) done(err);
      else done(null, result);
    });
  // done(null /*, data*/);
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
