const saveBody = (req, res, next) => {
  req.new = req.body;
  next();
};
export default saveBody;
