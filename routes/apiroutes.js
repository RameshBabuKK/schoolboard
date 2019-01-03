var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var SchoolMainCategory = require('../models/maincategory');
var StudentList = require('../models/students');


router.post('/register', function(req, res) {
  let userData = res.body;
  let user = new User(userData);
  user.save().then(regUser => {
    return res.json(regUser)
  }).catch(err => {
    return res.send(err)
  })
  
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
})

router.get('/maincategory', (req, res, next) => {
  SchoolMainCategory.find((err, maincategory) => {
    if (err)
      return next(err);
      return res.json(maincategory);
  })
});

//get all list of students

router.get('/listallstudent', function(req, res, next) { 
    StudentList.find (function(err, studentlist) {
      if (err)
        return res.send(err);
        return res.send(studentlist)
    })  
});

router.get('/liststudent', function(req, res, next) { 
    StudentList.find ({class_id: req.query.class_id}, function(err, studentlist) {
      if (err)
        return res.send(err);
        return res.send(studentlist)
    })    
});

router.post('/createstudent', function(req, res) {
  console.log(req.body);
  let newStudent = new StudentList({
    studentid: req.body.formData.name,
    name: req.body.formData.name,
    age: req.body.formData.age,
    gender: req.body.formData.gender,
    class_id: req.body.formData.class_id,
    section: req.body.formData.section,
    admission_date: req.body.formData.admission_date,
    fathername: req.body.formData.fathername,
    mothername: req.body.formData.mothername,
    city: req.body.formData.city,
    phone: req.body.formData.phone
  });
  
 // let formdata = req.body;
  newStudent.save((err, post) => {
    if (err) {
      return res.send(err)
    } else {
      return res.send(post);
    }
  });
});

router.get('/editstudent/:id', (req, res) => {
  console.log(req.params.id);
  StudentList.findById(req.params.id, (err, studentrecord) => {
    if (err)
    return res.send(err)
    return res.json(studentrecord)
  });
})

router.post('/editstudent/update/:id', (req, res) => {
  StudentList.findById(req.params.id, (err, updateData) => {
    updateData.studentid = req.body.formUpdateData.studentid;
    updateData.name = req.body.formUpdateData.name;
    updateData.age = req.body.formUpdateData.age;
    updateData.gender = req.body.formUpdateData.gender;
    updateData.class_id = req.body.formUpdateData.class_id;
    updateData.section = req.body.formUpdateData.section;
    updateData.admission_date = req.body.formUpdateData.admission_date;
    updateData.fathername = req.body.formUpdateData.fathername;
    updateData.mothername = req.body.formUpdateData.mothername;
    updateData.city = req.body.formUpdateData.city;
    updateData.phone = req.body.formUpdateData.phone;

    updateData.save().then (updateRec => {
      return res.json(updateRec)
    }).catch(err => {
      return res.send('Record Not updated...' + err)
    }); 
  })
})

router.delete('/liststudent/delete/:id', (req, res) => {
  console.log(req.params.id);

  StudentList.findByIdAndRemove(req.params.id, req.body, function(err, respose) {
    if (err) 
    return res.send (err);
    return res.json (respose);
  })

  
})


//Get all Class students
// router.get('liststudent', function(req, res, next) {
//   console.log('req.params.classid' + req.params.classid);
//   StudentList.find( {$text: {$search: req.params.classid}}, function(err, alllistofstudents) {
//     if (err)
//       return err
//       return res.json(alllistofstudents)
//   });
//  // res.send('List of student');
// });

//Get particular Class students
/*router.get('/liststudent/', function(req, res, next) {
  var class_id = req.params.classid;
  console.log(class_id);
  StudentList.find(class_id, function(err, liststudents) {
    if (err)
      return err
      return res.json(liststudents)
  })
});*/

//Get particular details of Annoucement
router.get('/annoucementdetails/:id', function(req, res, next) {
  
});

//Get particular details of Gallery
router.get('/gallerydetails/:id', function(req, res, next) {
  
});

module.exports = router;