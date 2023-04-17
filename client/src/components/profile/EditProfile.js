import React,{useState, useEffect} from 'react'

const EditProfile = ({user, setOnEdit}) => {

    const initialState ={
        fullName: '', mobile: '', address:'', website:'',story:'',gender:''
    }

    const [userData, setUerData] = useState(initialState)
    const {fullName, mobile, address, website,story,gender} = userData

    const [avatar, setAvatar] = useState('')
  return (
    <div className='edit-profile'>
        <button className='btn btn-danger btn_close' onClick={setOnEdit(false)} >Close</button>
    </div>
  )
}

export default EditProfile