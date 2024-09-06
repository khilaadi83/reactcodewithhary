import React from 'react'

const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        This is a primary alert—check it out! {props.message}
      </div>

    </div>
  )
}

export default Alert
