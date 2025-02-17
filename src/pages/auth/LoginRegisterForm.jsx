import React, { useState } from 'react';
import Components from '../../theme-ui/master-file'

const LoginRegisterForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: ''
  });

  const [registerErrors, setRegisterErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle tab change
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle login form change
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    });

    // Clear error when user types
    setLoginErrors({
      ...loginErrors,
      [name]: ''
    });
  };

  // Handle register form change
  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });

    // Clear error when user types
    setRegisterErrors({
      ...registerErrors,
      [name]: ''
    });
  };

  // Validate login form
  const validateLoginForm = () => {
    let isValid = true;
    const errors = {
      email: '',
      password: ''
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(loginData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!loginData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  // Validate register form
  const validateRegisterForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!registerData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!registerData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(registerData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!registerData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!registerData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setRegisterErrors(errors);
    return isValid;
  };

  // Handle login form submit
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (validateLoginForm()) {
      // In a real app, you would make an API call here
      console.log('Login submitted:', loginData);

      // Show success message
      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success'
      });

      // Clear form
      setLoginData({
        email: '',
        password: ''
      });
    }
  };

  // Handle register form submit
  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    if (validateRegisterForm()) {
      // In a real app, you would make an API call here
      console.log('Registration submitted:', registerData);

      // Show success message
      setSnackbar({
        open: true,
        message: 'Registration successful!',
        severity: 'success'
      });

      // Clear form
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Switch to login tab
      setTabValue(0);
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Components.Card className="w-full max-w-md shadow-lg">
        <Components.CardHeader
          title={
            <Components.Typography variant="h4" className="text-start text-black-700 font-bold">
              Welcome
            </Components.Typography>
          }
          subheader={
            <Components.Typography variant="body2" className="text-center text-gray-500">
              Please login or create an account to continue
            </Components.Typography>
          }
          className="pb-0"
        />

        <Components.Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          className="mt-4"
        >
          <Components.Tab
            label="Login"
            className={`${tabValue === 0 ? 'text-blue-700 font-medium' : 'text-gray-500'}`}
          />
          <Components.Tab
            label="Register"
            className={`${tabValue === 1 ? 'text-blue-700 font-medium' : 'text-gray-500'}`}
          />
        </Components.Tabs>

        <Components.CardContent className="px-6 pt-6 pb-8">
          {/* Login Form */}
          {tabValue === 0 && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <Components.TextField
                fullWidth
                size='small'
                variant="outlined"
                label="Email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                error={!!loginErrors.email}
                helperText={loginErrors.email}
                InputProps={{
                  startAdornment: (
                    <Components.InputAdornment position="start">
                      <Components.Icons.Mail className="text-gray-400" />
                    </Components.InputAdornment>
                  ),
                }}
                className="mb-6"
              />

              <Components.TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={handleLoginChange}
                error={!!loginErrors.password}
                helperText={loginErrors.password}
                InputProps={{
                  startAdornment: (
                    <Components.InputAdornment position="start">
                      <Components.Icons.LockKeyhole className="text-gray-400" />
                    </Components.InputAdornment>
                  ),
                  endAdornment: (
                    <Components.InputAdornment position="end">
                      <Components.IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Components.Icons.EyeClosed /> : <Components.Icons.Eye />}
                      </Components.IconButton>
                    </Components.InputAdornment>
                  ),
                }}
                className="mb-2"
              />

              <div className="flex justify-end mb-6">
                <Components.Button color="primary" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot Password?
                </Components.Button>
              </div>

              <Components.Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="bg-blue-600 hover:bg-blue-700 py-3 text-white font-medium"
              >
                Login
              </Components.Button>
            </form>
          )}

          {/* Register Form */}
          {tabValue === 1 && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <Components.TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Full Name"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                error={!!registerErrors.name}
                helperText={registerErrors.name}
                InputProps={{
                  startAdornment: (
                    <Components.InputAdornment position="start">
                      <Components.Icons.CircleUserRound className="text-gray-400" />
                    </Components.InputAdornment>
                  ),
                }}
                className="mb-6"
              />

              <Components.TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                error={!!registerErrors.email}
                helperText={registerErrors.email}
                InputProps={{
                  startAdornment: (
                    <Components.InputAdornment position="start">
                      <Components.Icons.Mail className="text-gray-400" />
                    </Components.InputAdornment>
                  ),
                }}
                className="mb-6"
              />

              <Components.TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={registerData.password}
                onChange={handleRegisterChange}
                error={!!registerErrors.password}
                helperText={registerErrors.password}
                InputProps={{
                  startAdornment: (
                    <Components.InputAdornment position="start">
                      <Components.Icons.LockKeyhole className="text-gray-400" />
                    </Components.InputAdornment>
                  ),
                  endAdornment: (
                    <Components.InputAdornment position="end">
                      <Components.IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Components.Icons.EyeClosed /> : <Components.Icons.Eye />}
                      </Components.IconButton>
                    </Components.InputAdornment>
                  ),
                }}
                className="mb-6"
              />

              <Components.TextField
                size='small'
                fullWidth
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                error={!!registerErrors.confirmPassword}
                helperText={registerErrors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <Components.InputAdornment position="start">
                      <Components.Icons.KeyRound className="text-gray-400" />
                    </Components.InputAdornment>
                  ),
                }}
                className="mb-6"
              />

              <Components.Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="bg-blue-600 hover:bg-blue-700 py-3 text-white font-medium"
              >
                Create Account
              </Components.Button>
            </form>
          )}

          <Components.Box className="mt-6 text-center">
            <Components.Typography variant="body2" className="text-gray-600">
              {tabValue === 0 ? "Don't have an account? " : "Already have an account? "}
              <Components.Button
                color="primary"
                onClick={() => setTabValue(tabValue === 0 ? 1 : 0)}
                className="p-0 min-w-min text-blue-600 hover:text-blue-800 font-medium"
              >
                {tabValue === 0 ? "Sign up" : "Login"}
              </Components.Button>
            </Components.Typography>
          </Components.Box>
        </Components.CardContent>
      </Components.Card>


      <Components.Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Components.Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Components.Alert>
      </Components.Snackbar>
    </div>
  );
};

export default LoginRegisterForm;