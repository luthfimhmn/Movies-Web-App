const errorHandler = (err, req, res, next) => {
  if(err.name === 'test') {
    console.log('ini test error');
  } else {
    res.status(500).json({ message: 'Error', err})
  }
}

module.exports = errorHandler