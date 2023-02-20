import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

function Home() {

    const [error, setError] = useState()
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("authToken")
        navigate('/login')
    }

    const getuser = async () => {
        if (localStorage.getItem("authToken")) {
            try {
                let body = JSON.stringify({ authToken: localStorage.getItem("authToken") })

                let req = await fetch('http://localhost:8181/api/auth/getUser',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: body
                    })
                let data = await req.json()

                if (data) {
                    setUser(data)
                }

                if (data.error) {
                    setError(data.error)
                } else {
                    setError("")
                }
            } catch (error) {
                setError("Api server not working");
            }

        } else {
            navigate("/login")
        }
    }
    useEffect(() => {
        getuser()
    }, [])

    return (
        <div>
            {error && <p>{error}</p>}
            <p className='text-4xl p-5'>
                hi,{user?.name}
            </p>
            <button onClick={logout} className='bg-blue-500 text-white px-4 py-2 rounded mx-3'>Logout</button>
        </div>
    )
}

export default Home