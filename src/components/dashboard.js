import React, { useState, useEffect } from "react";
import User from "./user";

export default function UserDashboard(props) {
  const [users, setUsers] = useState([]); //passing initial state as array inside useState

  useEffect(() => {
    fetch("https://a75dbb8d-4729-4442-a5cb-ff25686db151.mock.pstmn.io")
      .then((res) => res.json())
      .then((userArr) => setUsers(userArr.members))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("logging users", users);
  }, [users]);

  return (
    <div className="user_dashboard">
      <h1 className="header">User Dashboard</h1>
      {users && users.length ? (
        users.map((user) => <User key={user.id} user={user} />)
      ) : (
        <h1>No users found</h1>
      )}
    </div>
  );
}
