import React from 'react'

const dateConverter = (dateOriginal) => {
  return new Date(parseInt(dateOriginal)).toLocaleString();
}

export default dateConverter