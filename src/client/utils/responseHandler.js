// @flow
const success = (payload: Object): Object => {
  return {
    success: true,
    payload,
  }
}

const error = (error: Object): Object => {
  return {
    success: false,
    error: {
      ...error,
      message: error.message || '',
      code: error.code || '',
    },
  }
}

const ResponseHandler = {
  success,
  error,
}

export default ResponseHandler
