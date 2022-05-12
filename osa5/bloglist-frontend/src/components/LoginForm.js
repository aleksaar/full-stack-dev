const LoginForm = ({handleLogin, 
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
                value={username}
                onChange={handleUsernameChange}
                />
            </div>
            <div>
                password
                <input
                type="password"
                name="Password"
                value={password}
                onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">login</button>
            </form>    

        </div>  
  )
}
    

export default LoginForm