import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import Button from "../../Components/Common/Button";
import Input from "../../Components/Common/Input";
import Label from "../../Components/Common/Label";
import Guest from "../../Layouts/Guest";

declare function route(name: string): string;

interface PropType {
    status: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: PropType) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(
            event.target.name as "email" | "password" | "remember",
            event.target.value
        );
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="mb-4 text-xl">Wolf Den Login</div>

            <form onSubmit={submit}>
                <div>
                    <Label
                        className=""
                        children=""
                        forInput="email"
                        value="Email"
                    />

                    <Input
                        required={true}
                        type="text"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label
                        className=""
                        children=""
                        forInput="password"
                        value="Password"
                    />

                    <Input
                        required={true}
                        type="password"
                        isFocused={false}
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button className="ml-4" disabled={processing}>
                        Log in
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
