const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../auth/checkAuthentication');
const Course =  require('../../models/course');
const Student =  require('../../models/student');
const Teacher =  require('../../models/teacher');

router.get('/', ensureAuthenticated, function(req, res, next) {
	res.render('mongo/mongo');
});

router.post('/course', ensureAuthenticated, function(req, res, next) {

    // Creating array of course data object
    const courseData = [
        {
            _id: 01,
            name: "NodeJS",
            category: "Backend"
        },
        {
            _id: 02,
            name: "MongoDB",
            category: "Database"
        },
        {
            _id: 03,
            name: "Postman",
            category: "Testing"
        },
        {
            _id: 04,
            name: "Hyperleder fabric",
            category: "Blockchain"
        },
        {
            _id: 05,
            name: "Linux - CI/CD",
            category: "Devops"
        }
    ];

    // Inserting course data
    Course.insertMany(courseData)
        .then(value => {
        console.log("courseData Saved Successfully");
        res.render('mongo/mongo');
    })
    .catch(error => {
        console.log(error);
    });
});

router.post('/student', ensureAuthenticated, function(req, res, next) {
	// Creating array of student data objects
    const studentData = [
        {
            name: "Ajith",
            enroll: 1801,
            courseId: 01
        }, {
            name: "vijay",
            enroll: 1802,
            courseId: 01
        },
            {
            name: "vikram",
            enroll: 1803,
            courseId: 01
        }, {
            name: "surya",
            enroll: 1804,
            courseId: 01
        }, {
            name: "dhanush",
            enroll: 1805,
            courseId: 01
        }, {
            name: "simbu",
            enroll: 1806,
            courseId: 02
        }, {
            name: "siva",
            enroll: 1807,
            courseId: 02
        }, {
            name: "sethupathi",
            enroll: 1808,
            courseId: 02
        }, {
            name: "vishal",
            enroll: 1809,
            courseId: 02
        }, {
            name: "arya",
            enroll: 1810,
            courseId: 02
        }, {
            name: "udaya",
            enroll: 1811,
            courseId: 03
        }, {
            name: "vikaranth",
            enroll: 1812,
            courseId: 03
        }, {
            name: "bharath",
            enroll: 1813,
            courseId: 03
        }, {
            name: "jeeva",
            enroll: 1814,
            courseId: 03
        }, {
            name: "sibi",
            enroll: 1815,
            courseId: 03
        }, {
            name: "Nasar",
            enroll: 1816,
            courseId: 04
        }, {
            name: "sathiyaraj",
            enroll: 1817,
            courseId: 04
        }, {
            name: "vaiyaburi",
            enroll: 1818,
            courseId: 04
        }, {
            name: "manobala",
            enroll: 1819,
            courseId: 04
        }, {
            name: "govdamani",
            enroll: 1820,
            courseId: 04
        }, {
            name: "shankar",
            enroll: 1821,
            courseId: 05
        }, {
            name: "mani ratham",
            enroll: 1822,
            courseId: 05
        }, {
            name: "murga doss",
            enroll: 1823,
            courseId: 05
        }, {
            name: "vishnuvarathan",
            enroll: 1824,
            courseId: 05
        }, {
            name: "atlee",
            enroll: 1825,
            courseId: 05
        }
    ];

    // Inserting student data
    Student.insertMany(studentData)
        .then(value => {
            console.log("studentData Saved Successfully");
            res.render('mongo/mongo');
        })
        .catch(error => {
            console.log(error);
    });

});

router.post('/teacher', ensureAuthenticated, function(req, res, next) {
	// Creating array of teacher data object
    const teacherData = [{
            name: "Vanathi",
            teacher_id: 9901,
            courseId: 01
        },
        {
            name: "Sumathi",
            teacher_id: 9902,
            courseId: 02
        },
        {
            name: "Gomathi",
            teacher_id: 9903,
            courseId: 03
        },
        {
            name: "Sarathi",
            teacher_id: 9904,
            courseId: 04
        },
        {
            name: "Boopathi",
            teacher_id: 9905,
            courseId: 05
        }
    ];

    // Inserting teacher data
    Teacher.insertMany(teacherData)
        .then(value => {
            console.log("teacherData Saved Successfully");
            res.render('mongo/mongo');
        })
        .catch(error => {
            console.log(error);
        }
    );
});

router.get('/joinCollections', ensureAuthenticated, function(req, res, next) {
	
    //three collection join
    Teacher.aggregate([ {
        $lookup: {
            from: "students", // collection to join
            localField: "courseId",//field from the input documents
            foreignField: "courseId",//field from the documents of the "from" collection
            as: "registar"// output array field
        }
        }, {
            $lookup: {
                from: "courses", // from collection name
                localField: "courseId",
                foreignField: "_id",
                as: "class"
            }
        }], function( err, data ) {
            if ( err )
                throw err;
            console.log( JSON.stringify(data, undefined, 2));
            // res.write("The three collection join: ", JSON.stringify(data, undefined, 2));
            res.render("mongo/mongo", { threeCollection : JSON.stringify(data, undefined, 2) })
        }
    );
});

module.exports = router;