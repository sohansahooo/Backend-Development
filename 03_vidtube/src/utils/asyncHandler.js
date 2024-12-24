const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}


export { asyncHandler }



/*
-- asyncHandler: Utility function to simplify error handling in asynchronous functions. 

-- This function wraps async route handlers to catch and pass errors to Express middleware. 

-- Instead of using try-catch blocks within each async function, simply wrap the function with asyncHandler.

project-root/
  ├── controllers/
  │   └── exampleController.js
  ├── routes/
  │   └── exampleRoute.js
  ├── util/
  │   └── asyncHandler.js
  └── app.js

The asyncHandler is imported from the util folder and is used in your controllers or route handlers to handle errors in asynchronous functions efficiently.
*/