import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Signup() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const navigate = useNavigate()

    const onHandleFormSubmit = async (e) => {
        try {
            console.log("working");
            e.preventDefault()
            let body = JSON.stringify(
                {   
                    name:`${firstName} ${lastName}`,
                    email: email,
                    password: password
                }
            )
            let req = await fetch('http://localhost:8181/api/auth',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body
                })
            let data = await req.json()

            if (data.authToken) {
                localStorage.setItem("authToken", data.authToken)
                navigate("/")
            }
            
            if (data.error) {
                setError(data.error)
            } else {
                setError("")

            }
            console.log(req.status);
        } catch (error) {
            setError("Api server not working")
        }

    }
    return (
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">

                    <div className="md:w-1/2 lg:w-5/12 bg-gray-100 border border-gray-200 hover:shadow-md lg:ml-20 p-10 rounded">
                        <h1 className='text-center text-2xl pb-7'>Sign Up</h1>
                        {error && <p className='text-center mb-3'>{error}</p>}
                        <form onSubmit={onHandleFormSubmit}>
                            <div className="mb-6 flex flex-row gap-5">

                                <input
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    type="text"
                                    value={firstName}
                                    required
                                    className=" form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                />
                                <input
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    type="text"
                                    value={lastName}
                                    required
                                    className=" form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email"
                                    value={email}
                                    required
                                    className="focus:invalid:border-red-500 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    value={password}
                                    type="password"
                                    minLength={5}
                                    required
                                    className="focus:invalid:border-red-500 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Sign Up
                            </button>


                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>
                            <Link to={"/Login"}
                                type="submit"
                                className="text-center inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Login
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup
