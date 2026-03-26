function errorHandler(err, req, res, next) {
  //   console.log(err);

  switch (err.name) {
    case "SequelizeDatabaseError":
      code = 400;
      message = "Invalid input";
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeValidationError":
      code = 400;
      message = err.errors[0].message;
      break;
    case "notFound":
      code = 404;
      message = err.message;
      break;
    case "unauthorized":
      code = 401;
      message = err.message;
      break;
    case "forbidden":
      code = 403;
      message = err.message;
      break;
    default:
      code = 500;
      message = "Internal Server Error";
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
