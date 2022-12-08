import { BASE_URL } from '../constants'
import './Users.css'

function User(props) {
    const { user:
        { name, mobile, image, _id },
        handleEdit,
        handleDelete } = props
    return (
        <div className="user-card">
            <img width="100%" src={`${BASE_URL}/${image}`} />
            <p className="user-name">{name}</p>
            <p className="user-mobile">{mobile}</p>
            <div className='btn-card'>
                <button className='edit-btn' onClick={() => handleEdit(_id)}> EDIT </button> 
                <button className='del-btn' onClick={() => handleDelete(_id)}>  DELETE </button>
            </div>
        </div>
    )
}

export default User