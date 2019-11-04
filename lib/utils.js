module.exports = {

    requiredBody: (body, required) => {

        notFound = required.map(item => {
            if(body[item] == null)
                return item;
        });
        
        return ((notFound.lenght === 0)? null : notFound, (notFound.lenght === 0)? true : false);

    },
    requiredBodyMiddleware: (required) => {
        
        return function (req, res, next) {

            var notfound, hasErrored = requiredBody(req.body, required);

            if(hasErrored)
            {
                next(req, res);
                return;
            }

            res.json({
                "mata": {
                    "status": "fail",
                    "massage": notfound.map((item) => {return item + " not set.";})
                }
            });
    
        };

    }

};