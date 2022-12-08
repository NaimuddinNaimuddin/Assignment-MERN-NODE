import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from '../constants'
import './Users.css'
import User from "./User"
import { useNavigate } from "react-router-dom"

function Users() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [filter,setFilter] = useState('')
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        axios.get(`${BASE_URL}/api/get-users`)
            .then((res) => {
                console.log(res, "9")
                setData(res.data.data)
            })
            .catch(err => {
                console.log("ERR", err)
            })
    }, [deleted])

    const handleLink = () => {
        navigate('/add-user')
    }

    const handleDelete = (_id) => {
        console.log(_id, "28")
        axios.delete(`${BASE_URL}/api/delete-user/${_id}`)
            .then((res) => {
                console.log(res.data, "31")
                if (res.data.code == 200) {
                    setDeleted(!deleted)
                }
            })
    }
    const handleEdit = (_id) => {
        navigate(`/edit-user/${_id}`)
    }

    return (
        <>
            <div className="header">
                <div>
                    <h1> USERS LIST </h1>
                </div>
                <div>
                    <input 
                    type="number"
                    value={filter} 
                    placeholder="Search Mobile ..."
                    className="filter-input"
                    onChange={(e)=> setFilter(e.target.value)}/>
                    <button
                        onClick={handleLink}
                        className="add-btn">
                        ADD USER
                    </button>
                </div>
            </div>
            <div className="user-container">
                {
                    data &&
                    data.length > 0 &&
                    data.filter(i=>i.mobile.toString().includes(filter))
                    .map((user) => {
                        return (
                            <User key={user._id}
                                user={user}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Users
