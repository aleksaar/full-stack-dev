import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            type="text"
            name="Username"
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                password
          <input
            type="password"
            name="Password"
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id='submitLogin'>login</button>
      </form>

    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm