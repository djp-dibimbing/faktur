import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Cookies from 'js-cookie' // Tambahkan import ini

export default function Login() {
  const [formData, setFormData] = useState({
    npwp: '',
    password: '',
  })
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData, // Tambahkan ini untuk mempertahankan nilai formData yang ada
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.info(process.env.NEXT_PUBLIC_LOGIN_URL)
    const response = await fetch(process.env.NEXT_PUBLIC_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await response.json();

    if (response.ok) {
      Cookies.set('token', data.access_token) // Simpan token ke cookies
      router.push('/dashboard')
    } else {
      setFormData({
        ...formData,
        error: data.message
      });
      console.error(data.message)
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Halaman login" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-indigo-900">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex items-center justify-center mb-3">
            <Image src="/Logo_djp.png" alt="DJP Logo" width={50} height={50} className="mr-3" />
          </div>
          <div className="flex items-center justify-center mb-3">
            <h2 className="text-2xl font-semibold text-center text-yellow-400">Login</h2>
          </div>
          <div className="flex items-center justify-center mb-3">
            {formData.error && <div className="text-red-600 mb-3">{formData.error}</div>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">NPWP</label>
              <input
                type='text'
                name='npwp'
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 text-gray-700 rounded-md"
                placeholder="Masukkan NPWP"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type='password'
                name='password'
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 text-gray-700 rounded-md"
                placeholder="Masukkan Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <div className="flex items-center text-center  w-full  text-gray-800 rounded-md transition mt-2">
            <span className=''>Silahkan daftar <a href="/register"
              className="text-blue-600"
            >
              disini
            </a> jika belum memiliki akun &nbsp;
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
