(function() {
  const ACCOUNTS_KEY = 'gwyn_accounts';
  const SESSION_KEY = 'gwyn_current_user';

  function getAccounts() {
    const data = localStorage.getItem(ACCOUNTS_KEY);
    return data ? JSON.parse(data) : {};
  }

  function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  window.currentUser = null;

  window.authRegister = function(username, email, password) {
    if (!username || !email || !password) {
      return { success: false, message: 'All fields are required.' };
    }
    const cleanUsername = username.toLowerCase();
    const accounts = getAccounts();

    if (accounts[cleanUsername]) {
      return { success: false, message: 'Username is already taken.' };
    }

    accounts[cleanUsername] = {
      username: username,
      email: email,
      password: password,
      saveData: null
    };
    saveAccounts(accounts);
    return { success: true, message: 'Account registered successfully!' };
  };

  window.authLogin = function(username, password) {
    if (!username || !password) {
      return { success: false, message: 'Username and password are required.' };
    }
    const cleanUsername = username.toLowerCase();
    const accounts = getAccounts();

    const acc = accounts[cleanUsername];
    if (!acc || acc.password !== password) {
      return { success: false, message: 'Invalid username or password.' };
    }

    window.currentUser = acc.username;
    localStorage.setItem(SESSION_KEY, acc.username);
    return { success: true, message: 'Logged in successfully.' };
  };

  window.authCheckSession = function() {
    const user = localStorage.getItem(SESSION_KEY);
    if (user) {
      window.currentUser = user;
      return true;
    }
    return false;
  };

  window.authLogout = function() {
    window.currentUser = null;
    localStorage.removeItem(SESSION_KEY);
    location.reload();
  };

  window.authSaveGameData = function(data) {
    if (!window.currentUser) return;
    const cleanUsername = window.currentUser.toLowerCase();
    const accounts = getAccounts();

    if (accounts[cleanUsername]) {
      accounts[cleanUsername].saveData = data;
      saveAccounts(accounts);
      // Fallback local save for compatibility
      localStorage.setItem('gwyn_save_data', JSON.stringify(data));
    }
  };

  window.authLoadGameData = function() {
    if (!window.currentUser) return null;
    const cleanUsername = window.currentUser.toLowerCase();
    const accounts = getAccounts();

    return accounts[cleanUsername] ? accounts[cleanUsername].saveData : null;
  };

  window.authRecoverPassword = function(username, email) {
    if (!username || !email) {
      return { success: false, message: 'Please enter both username and email.' };
    }
    const cleanUsername = username.toLowerCase();
    const accounts = getAccounts();

    const acc = accounts[cleanUsername];
    if (acc && acc.email.toLowerCase() === email.toLowerCase()) {
      return { success: true, message: `Your password is: ${acc.password}` };
    }
    return { success: false, message: 'Account not found or email does not match.' };
  };
})();
