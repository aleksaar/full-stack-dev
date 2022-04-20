const Notification = ({ message, isError }) => {
    const normalStyle = {
        color: 'green'
    }

    const errorStyle = {
        color: 'red'
    }

    if (message === null) {
      return null
    }
  
    if (!isError) {
        return (
            <div className="notification" style={normalStyle}>
              {message}
            </div>
          )
    }

    else if (isError) {
        return (
            <div className="notification" style={errorStyle}>
              {message}
            </div>
          )
    }
    
  }

  export default Notification