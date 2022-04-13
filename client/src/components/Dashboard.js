import React from "react";

export default function Dashboard({ user }) {
  return (
    <div>
      <p>Hello {user.full_name}</p>
    </div>
  );
}
