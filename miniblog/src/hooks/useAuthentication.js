import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup -> para nao ter problema de lique de memória,vazamento de memoria
    //basicamente é um useState que vai cancelar as ações futura do componente
    const [cancelled, setCancelled] = useState(false)

    //autenticado que vem do firebase, com ele consigo usar funções de autenticação
    const auth = getAuth();

    //função pra checar o state cancelled
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    //Register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }


    }

    //Logout
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    //login

    const login = async (data) =>{
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {

            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
               systemErrorMessage = "Usuário não encontrado"
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha Incorreta"
            }else{
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };
}