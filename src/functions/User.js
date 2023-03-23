function GetUser() {
  return localStorage.getItem("%Bnas");
}

function SetUser(value) {
  localStorage.setItem("%Bnas", value);
}

export { GetUser, SetUser };
