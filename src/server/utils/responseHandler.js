/**
 *
 * @param {Object} payload
 * @returns Object
 */
const success = (payload) => {
  return {
    success: true,
    payload,
  }
}

/**
 *
 * @param {Object} error
 * @returns Object
 */
const error = (error) => {
  return {
    success: false,
    error: {
      ...error,
      message: error.message || '',
    },
  }
}

module.exports.ResponseHandler = {
  success,
  error,
}
