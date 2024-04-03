import Table from 'react-bootstrap/Table';


function TableUsers() {

  const users =
    [
      {
        id: 1,
        email: "admin@localhost",
        role: "Admin",
        active: true,
      },
      {
        id: 2,
        email: "user@localhost",
        role: "User",
        active: true,
      },
      {
        id: 3,
        email: "user2@localhost",
        role: "User",
        active: false,
      }
    ]

  return (
    <Table striped bordered responsive hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Role</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.active ? "Yes" : "No"}</td>
            <td>
              <button>Edit</button>
              {/* <button onClick={() => props.editRow(user)}>Edit</button> */}
              {/* <button onClick={() => props.deleteUser(user.id)}>Delete</button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default TableUsers