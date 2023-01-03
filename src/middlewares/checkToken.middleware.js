import jwt from 'jsonwebtoken';
const SECRET = 'exam';

const checkToken = (req, res, next) => {
  try {
    let { token } = req.headers;

    if (!token) {
      throw new Error ("You must to have a token!")
    }

    let { adminId } = jwt.verify(token, SECRET);

    req.adminId = adminId;

    next();
  } catch (error) {
    res.status(403).json({
      status: 403,
      message: error.message
    });
  };
};

export {
  SECRET,
  checkToken
}