// см. ниже
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// см. ниже
import '@testing-library/jest-dom'
// компонент
import { SignInForm } from "../../components/auth";
import {AuthProvider} from "../../context";
import {BrowserRouter} from "react-router";
import userEvent from '@testing-library/user-event'
import React from "react";

describe('Тестирование формы входа', () => {
    test('-> Ничего не введено. Кнопка входа отключена', async () => {

        render(
            <BrowserRouter>
                <AuthProvider>
                    <SignInForm />
                </AuthProvider>
            </BrowserRouter>
        )

        expect(screen.getByRole('button')).toBeDisabled()

    })
    test('-> Введено только имя пользователя. Кнопка входа отключена', async () => {

        render(
            <BrowserRouter>
                <AuthProvider>
                    <SignInForm />
                </AuthProvider>
            </BrowserRouter>
        )

        const usernameInput = screen.getByLabelText("username")
        userEvent.type(usernameInput, 'amomogus@gmail.com');
        await waitFor(() => expect(usernameInput).toHaveValue('amomogus@gmail.com'))

        expect(screen.getByRole('button')).toBeDisabled()

    })
    test('-> Введён только пароль. Кнопка входа отключена', async () => {

        render(
            <BrowserRouter>
                <AuthProvider>
                    <SignInForm />
                </AuthProvider>
            </BrowserRouter>
        )

        const passwordInput = screen.getByLabelText("password")
        userEvent.type(passwordInput, 'String6!');
        await waitFor(() => expect(passwordInput).toHaveValue('String6!'))

        expect(screen.getByRole('button')).toBeDisabled()

    })
    test('-> Введёны имя пользователя и пароль. Кнопка входа включена', async () => {

        const { rerender } = render(
            <BrowserRouter>
                <AuthProvider>
                    <SignInForm />
                </AuthProvider>
            </BrowserRouter>
        )

        const usernameInput = screen.getByLabelText("username")
        userEvent.type(usernameInput, 'amomogus@gmail.com');
        await waitFor(() => expect(usernameInput).toHaveValue('amomogus@gmail.com'))

        const passwordInput = screen.getByLabelText("password")
        userEvent.type(passwordInput, 'String6!');
        await waitFor(() => expect(passwordInput).toHaveValue('String6!'))

        await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

    })
})