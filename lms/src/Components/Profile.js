import React from 'react'

export default function Profile(props) {
  return (
    <div className="shadow-lg w-25 p-3 mb-5 col mx-2">
        <h4>Profile</h4>
        <p><b>Username :</b> {props.logged} <button type="button" class="btn btn-outline-info mx-5">Edit</button></p>
    </div>
  )
}
