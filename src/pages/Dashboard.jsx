import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router'
function Dashboard() {
  const navigate = useNavigate()
  const editHandler = (id) => {
    navigate('/editUser', { state: { id: id } })
    console.log(id);

  }


  const [user, setUser] = useState([])
  const [search, setSearch] = useState('')
  const [pending, setPending] = useState(true);
  const [filterduser, setFilterdUser] = useState([]);

  const getUsers = () => {
    axios.get('http://localhost:4000/admin-dashboard').then((data) => {
      setUser(data.data);
      setFilterdUser(data.data);
    })
  }

  const deleteHandler = (userId) => {
    confirmAlert({
      title: 'Delete confirm',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios({
              method: 'post',
              url: 'http://localhost:4000/delete-user',
              data: {
                id: userId
              }
            }).then((data) => {
              console.log(data.data);
              getUsers()
              alert(`user ${data.data.docs.email} has been deleted`)
            })
          }
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  }

  const columns = [
    {
      name: 'User name',
      selector: (row) => row.email
    },
    {
      name: 'User Profile ',
      selector: (row) => <img width={80} height={80} style={{ borderRadius: '50px' }} src={`http://localhost:4000/userProfiles/${row.profile}`} />
    },
    {
      name: 'Edit',
      cell: row => <button onClick={() => editHandler(row._id)} >Edit</button>
    },
    {
      name: 'Delete',
      cell: row => <button onClick={() => deleteHandler(row._id)} >Delete</button>
    }
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      getUsers()
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [])

  useEffect(() => {
    const result = user.filter(user => {
      return user.name.toLowerCase().match(search.to)
    })
  }, [search])

  const createHandler = () => {
    navigate('/createUser')
  }

  return (

    <div>
      <h2>Users List</h2>
      <button onClick={createHandler} >Create</button>
      <DataTable className={'table'}
        columns={columns} data={user} rogressPending={pending} pagination fixedHeader
        subHeader
        subHeaderComponent={
          <input type="text" placeholder='search here'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }} />
        }
      />
    </div>


  )
}

export default Dashboard