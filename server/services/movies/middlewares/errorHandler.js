const errorHandler = (err, req, res, next) => {
  if(err.name === 'test'){
    console.log('ini salah test')
  } else {
    res.status(500).json(err)
  }
}

module.exports = errorHandler;