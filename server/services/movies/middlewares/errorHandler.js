const errorHandler = (err, req, res, next) => {
  if(err.name === 'FailDelete'){
    res.status(500).json({ message: 'Fail to delete data, ID not found'})
  } else {
    res.status(500).json(err)
  }
}

module.exports = errorHandler;