const mongoose = require('mongoose');
const mongoPath = 'mongodb+srv://orion:GSB0rglLmrETZpAL@data.mrttr.mongodb.net/quan-hitters?retryWrites=true&w=majority';

module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	return mongoose;
};