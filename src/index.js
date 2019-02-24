import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Song from '../build/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/songs', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});



router.route('/issues').get((req, res) => {

    Song.find().sort({rank: 1}).limit(50).exec( 
        function(err, issues) {

            if (err)
            console.log(err);
        else
            res.json(issues);

    });
});

router.route('/issues/:id').get((req, res) => {

 

   var sid=new RegExp(req.params.id, 'i');

    Song.findOne( {$or: [{'name':sid},{'artists':sid}] }, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});

router.route('/sort/issues/:id').get((req, res) => {

    var sortId=req.params.id;

    Song.find().sort({[sortId]: 1}).limit(50).exec( 
        function(err, issues) {

            if (err)
            console.log(err);
        else
            res.json(issues);

    });


});



app.use('/', router);

app.listen(process.env.PORT ||4000, () => console.log(`Express server running on port 4000`));