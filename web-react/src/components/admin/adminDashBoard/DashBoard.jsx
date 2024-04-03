const DashBoard = () => {
  return (
    <article className="dashboard">
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card">
          <h3>Users</h3>
          <p>10</p>
        </div>
        <div className="card">
          <h3>Posts</h3>
          <p>20</p>
        </div>
        <div className="card">
          <h3>Comments</h3>
          <p>30</p>
        </div>
        <div className="card">
          <h3>Discussions</h3>
          <p>40</p>
        </div>
      </div>
    </article>
  )
}

export default DashBoard;