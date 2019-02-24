"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Issue = _interopRequireDefault(require("../build/Issue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = (0, _express.default)();

var router = _express.default.Router();

app.use((0, _cors.default)());
app.use(_bodyParser.default.json());

_mongoose.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/songs', {
  useNewUrlParser: true
});

var connection = _mongoose.default.connection;
connection.once('open', function () {
  console.log('MongoDB database connection established successfully!');
});
router.route('/issues').get(function (req, res) {
  _Issue.default.find().sort({
    rank: 1
  }).limit(5).exec(function (err, issues) {
    if (err) console.log(err);else res.json(issues);
  });
});
router.route('/issues/:id').get(function (req, res) {
  var sid = new RegExp(req.params.id, 'i');

  _Issue.default.findOne({
    $or: [{
      'name': sid
    }, {
      'artists': sid
    }]
  }, function (err, issue) {
    if (err) console.log(err);else res.json(issue);
  });
});
router.route('/sort/issues/:id').get(function (req, res) {
  var sortId = req.params.id;

  _Issue.default.find().sort(_defineProperty({}, sortId, 1)).limit(5).exec(function (err, issues) {
    if (err) console.log(err);else res.json(issues);
  });
});
app.use('/', router);
app.listen(process.env.PORT || 4000, function () {
  return console.log("Express server running on port 4000");
});
//# sourceMappingURL=index.js.map