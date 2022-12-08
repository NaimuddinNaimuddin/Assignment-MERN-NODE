import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../constants"
import './AddUser.css'

function AddUser() {
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [mobile, setMobile] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (mobile.toString().length < 10) {
            alert('Mobile Number Invalid.')
            return
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)
        formData.append('mobile', mobile)

        axios.post(`${BASE_URL}/api/add-user`, formData)
            .then((res) => {
                console.log(res, "res")
                if (res.data.code == 200) {
                    navigate('/users')
                }
            })
            .catch((err) => {
                console.log(err, "err")
            })

    }

    return (
        <>
            <h1 className="center"> ADD USER </h1>
            <form className="form-card" onSubmit={handleSubmit}>
                <p> NAME   </p>
                <input required className="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <p> MOBILE  </p>
                <input required className="mobile" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                <p> IMAGE  </p>
                <input required className="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit" className="submit"> SUBMIT </button>
            </form>
        </>
    )
}

export default AddUser