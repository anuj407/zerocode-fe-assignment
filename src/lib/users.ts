const users: {
    [x: string]: unknown; email: string; password: string 
}[] = [];

export const addUser = (email: string, password: string) => {
  users.push({ email, password });
};

export const findUser = (email: string) =>
  users.find((user) => user.email === email);

