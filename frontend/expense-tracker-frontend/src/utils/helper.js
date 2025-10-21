export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validating password

export const validatePassword = (password) => {
  const minLenghth = 8;
  if (!(password.length >= minLenghth)) {
    return "password must be morethan 8 characters";
  }
  return true;
};

export const validateName = (fullName) => {
  const trimmed = fullName.trim();
  const nameRegex = /^[A-Za-z\s]+$/;
  const minLength = 4;
  if (!trimmed) {
    return "Name cannot be empty.";
  }

  if (!nameRegex.test(trimmed)) {
    return "Name must only contain letters";
  }
  if (!(fullName.length >= minLength)) {
    return "The name is too short! use atleast 4 characters";
  }

  return true;
};
