const MOCK_USER = {
  id: "user-1",
  email: "sophie.bielmeier1405@gmail.com",
  first_name: "Sophie",
  last_name: "Bielmeier",
};

let currentUser = MOCK_USER;

export function getUser() {
  return currentUser;
}

export function login(email) {
  // absichtlich simpel
  currentUser = { ...MOCK_USER, email };
  return currentUser;
}

export function logout() {
  currentUser = null;
}
