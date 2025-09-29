//wrapAsync function
module.exports = wrapAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}

/* it is a helper fun. used for async route handlers.
it simplifies err handling in async/await funs.
without it we have to add try{}catch{} in every route */