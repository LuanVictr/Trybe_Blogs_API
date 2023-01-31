const loginServices = require('../services/login.services');

const getLogin = async (req, res) => {
  try {
  const bodyInfo = req.body;
  const result = await loginServices.getLogin(bodyInfo);
  console.log(result);
  res.status(200).send(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getLogin,
};