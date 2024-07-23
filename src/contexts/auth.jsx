import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));

        if (userToken && usersStorage) {
            const storedUser = usersStorage.find(user => user.cpf === JSON.parse(userToken).cpf);
            if (storedUser) setUser(storedUser);
        }
    }, []);

    const login = (cpf, senha) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db")) || [];
        const storedUser = usersStorage.find(user => user.cpf === cpf);

        if (!storedUser) return "Usuário não cadastrado!";
        if (storedUser.senha !== senha) return "CPF ou senha incorretos!";

        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ cpf, token }));
        setUser({ cpf, senha });
    };

    const cadastro = (cpf, senha) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db")) || [];
        if (usersStorage.find(user => user.cpf === cpf)) {
            return "Já possui uma conta com esse CPF!";
        }

        const newUser = [...usersStorage, { cpf, senha }];
        localStorage.setItem("users_db", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider value={{ user, signed: !!user, login, cadastro, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
