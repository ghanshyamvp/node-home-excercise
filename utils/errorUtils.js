/**Error helper function */
module.exports.throwError = (status, msg) => {
	const error = new Error();
	error.message = msg;
	error.status = status;
	return error;
};
