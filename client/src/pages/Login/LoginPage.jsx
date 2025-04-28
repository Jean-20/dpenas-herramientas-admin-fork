import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContextAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: loginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) navigate("/Admin");
    }, [isAuthenticated]);

    return (
        <div className="relative bg-[url('https://i.pinimg.com/originals/f3/50/af/f350af1cddf89a6c98583c7620c2278f.jpg')] h-screen bg-cover bg-center overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>

            <div className="relative bg-transparent lg:w-5/12 md:6/12 w-10/12 shadow-3xl border-4 border-black rounded-lg">
                <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                    </svg>
                </div>

                <form onSubmit={onSubmit} className="p-12 md:p-24">
                    {loginErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                            {error}
                        </div>
                    ))}

                    <h1 className="text-2xl text-center text-white font-bold mb-1">Inicia Sesión</h1>

                    <div className="flex items-center text-lg mb-6 md:mb-8">
                        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                        </svg>
                        <input
                            type="text"
                            {...register("Codigo", { required: true })}
                            className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                            placeholder="Código"
                        />
                    </div>

                    {errors.Codigo && <p className="text-red-500">Código es requerido</p>}

                    <div className="flex items-center text-lg mb-6 md:mb-8">
                        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                        </svg>
                        <input
                            type="password"
                            {...register("Contrasena", { required: true })}
                            className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                            placeholder="Contraseña"
                        />
                    </div>

                    {errors.Contrasena && <p className="text-red-500">Contraseña es requerida</p>}

                    <button
                        type="submit"
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
