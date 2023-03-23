// This is just an example,
// so you can safely delete all default props below

export default {
  nameLanguage: 'EN',
  layout:{
    aplicationName: 'OPENGAR',
    userMenu: {
      editProfile: 'Edit profile',
      logout: 'Logout'
    }
  },
  loginPage: {
    labels: {
      user: 'Name',
      password: 'Password',
      login: 'Login',
      registerUser: 'Register'
    },
    messages: {
      userEmpty: 'The user can not be empty',
      passwordEmpty: 'The password can not be empty',
      failLogin: 'Invalid user or invalid password',
      failUserConfirmLink: 'Please, confirm your email'
    }
  },
  registerUserPage: {
    labels: {
      name: 'Name',
      lastName: 'Last name',
      userName: 'User name',
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Confirm password',
      register: 'Register',
    },
    messages: {
      emptyVuelueError: {
        name: 'The name field can not be empty',
        lastName: 'The last name field can not be empty',
        userName: 'The user name field can not be empty',
        email: 'The email field can not be empty',
        password: 'The password field can not be empty',
        passwordConfirm: 'The confirm password field can not be empty',
        register: 'Register',
      },
      registerError: {
        confirmPassword: 'The confirm password is not equal to password',
        imageProfile: 'Could not save user profile picture',
        userName: 'The user name already exist',
        email: 'The email already exist',
        _: 'User registration failed'
      }
    }
  },
  indexPage: {
    menu : {
      login : 'Login'
    }
  },
  emailConfirmation: {
    labels: {
      title: 'Email Confirmation page',
      subtitle: 'Check email confirmation link',
      resend: 'Resend confirmation link',
      userEmail: 'User email'
    },
    messages: {
      error: 'The link has expired, please, request a new link again',
      resendError: 'It was not possible to generate a new confirmation link',
      emailEmpty: 'The email field can not be empty'
    }
  },
  sentedEmailConfirmation: {
    labels: {
      title: 'Sented Confirmation Link',
      subtitle: 'Please, check the email and finish the account verification'
    }
  },
  editProfile: {
    labels: {
      title: 'Edit profile',
      save: 'Update profile'
    },
    messages: {
      success: 'Edit profile successful',
      error: 'Update user profile failed'
    }
  },
  closeButton: 'Close',
  saveButton: 'Save',
  failed: 'Action failed',
  success: 'Action was successful'
}
