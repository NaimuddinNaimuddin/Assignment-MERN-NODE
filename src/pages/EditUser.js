import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BASE_URL } from "../constants"
import './AddUser.css'

function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [image, setImage] = useState(null)
    const [mobile, setMobile] = useState(null)

    useEffect(() => {
        axios.get(`${BASE_URL}/api/get-user/${id}`)
            .then(res => {
                console.log(res, "17")
                if (res.data.code == 200) {
                    setName(res.data.data.name)
                    setMobile(res.data.data.mobile)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

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

        axios.put(`${BASE_URL}/api/edit-user/${id}`, formData)
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
            <h1 className="center"> EDIT USER </h1>
            <form className="form-card" onSubmit={handleSubmit}>
                <p> NAME   </p>
                <input required className="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <p> MOBILE  </p>
                <input required minLength={10} className="mobile" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                <p> IMAGE  </p>
                <input className="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit" className="submit"> SUBMIT </button>
            </form>
        </>
    )
}

export default EditUser