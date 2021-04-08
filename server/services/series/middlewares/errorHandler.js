const errorHandler = (err, req, res, next) => {
  if(err.name === 'test'){
    console.log('ini error test')
  } else {
    res.status(500).json({ message: 'error', err})
  }
}

module.exports = errorHandler