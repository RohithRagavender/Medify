import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users


//ithu ena panum nah admin ku authentication panum epdi nah already nah config la na JWT  key na fix pani vaichiruka 
export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
      return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

// Middleware to authenticate frontend users

// //ithu yathuku nah patient Token generate panum so paitent ku create panaum just like admin mari 
// export const isPatientAuthenticated = catchAsyncErrors(
//   async (req, res, next) => {
//     const token = req.cookies.patientToken;
//     if (!token) {
//       return next(new ErrorHandler("User is not authenticated!", 400));
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);
//     if (req.user.role !== "Patient") {
//       return next(
//         new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
//       );
//     }
//     next();
//   }
// );

// export const isAuthorized = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `${req.user.role} not allowed to access this resource!`
//         )
//       );
//     }
//     next();
//   };
// };



// import jwt from "jsonwebtoken";
// import User from "../models/User.js"; // Adjust the import path to your User model
// import ErrorHandler from "../utils/errorHandler.js"; // Custom error handler
// import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"; // Async error wrapper

export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken;

  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify JWT
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resource!`,
          403
        )
      );
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }
});
