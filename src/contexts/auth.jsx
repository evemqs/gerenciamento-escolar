import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_db");

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.cpf === JSON.parse(userToken).cpf
        );

        if (hasUser) setUser(hasUser[0]);
        }
    },[]);

    const loginUsuario = (cpf, senha) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
        const hasUser = usersStorage?.filter((user) => user.cpf === cpf);

        if (hasUser?.length) {
            if (hasUser[0].cpf === cpf && hasUser[0].senha === senha) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({ cpf, token }));
                setUser ({ cpf, senha });
                return;
            } else {
                return "CPF ou senha incorretos!";
            }
        }
        else {
            return "Usuário não cadastrado!";
        }
    };

    const cadastroUsuario = (cpf, senha) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
        const hasUser = usersStorage?.filter((user) => user.cpf === cpf);

        if (hasUser?.length) {
            return "Já possui uma conta com esse CPF!"
        }

        let novoUsuario;

        if (usersStorage) {
            novoUsuario = [...usersStorage, { cpf, senha }];
        } else {
            novoUsuario = [{ cpf, senha }];
        }

        localStorage.setItem("users_bd", JSON.stringify(novoUsuario));

        return;
    };

    return (
        <AuthContext.Provider value={{ user, signed: !!user, loginUsuario, cadastroUsuario }}
        >{children}</AuthContext.Provider>
    );
};