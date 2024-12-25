export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),// cookie_expire na default ah 7 nu vaichiruka next varuthu ella time format 24hr 60min 60sec and 1000milisecond,
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

