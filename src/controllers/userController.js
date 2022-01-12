export const join = (req, res) => res.send('join');
export const login = (req, res) => res.send('login');
export const edit = (req, res) => res.send('Edit user');
export const remove = (req, res) => res.send('Remove');
export const logout = (req, res) => res.send('logout');
export const see = (req, res) => res.send(`see profile ${req.params.id}`);
