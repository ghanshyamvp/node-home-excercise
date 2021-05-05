const { validationResult } = require('express-validator');

/** Request will be forwarded here after validation */
module.exports = {
	baseValidator: async (req, res, next) => {
		
        //get errors from request object
        const errors = validationResult(req);
		
        //if error in validation then response error
		if (!errors.isEmpty()) {
			return res.status(422).json({
				success: false,
				status: 422,
				errors: errors.errors,
			});
		}
        //if not any error found then pass to next middleware
		next();
	},
};
