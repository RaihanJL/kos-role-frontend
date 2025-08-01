import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // Tambahkan state notifikasi sukses
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    setMsg("");
    setSuccessMsg("");
    try {
      const data = {
        name,
        email,
        password,
        confPassword,
        role,
        phone,
        address,
        roomType: role === "admin" ? "-" : roomType,
        roomPrice: role === "admin" ? 0 : roomPrice,
      };
      await axios.post("https://kos-role-production.up.railway.app/users", data);
      setSuccessMsg(
        `Berhasil menambah ${role === "admin" ? "admin" : "user"} baru!`
      );
      setTimeout(() => {
        navigate("/users");
      }, 1200); // Redirect setelah 1.2 detik
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data.message);
      } else {
        setMsg("An error occurred while saving the product.");
      }
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveUser}>
              <p className="has-text-centered" style={{ color: "red" }}>
                {msg}
              </p>
              {successMsg && (
                <div className="notification is-success has-text-centered">
                  {successMsg}
                </div>
              )}
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nomor HP</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Alamat lengkap"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*****"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="*****"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tipe Kamar</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role === "admin" ? "-" : roomType}
                      onChange={(e) => {
                        setRoomType(e.target.value);
                        if (e.target.value === "kecil") setRoomPrice(1600000);
                        else if (e.target.value === "sedang")
                          setRoomPrice(1800000);
                        else if (e.target.value === "besar")
                          setRoomPrice(1900000);
                        else setRoomPrice(0);
                      }}
                      disabled={role === "admin"}
                    >
                      <option value="">Pilih Tipe Kamar</option>
                      <option value="kecil">Kecil</option>
                      <option value="sedang">Sedang</option>
                      <option value="besar">Besar</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Kamar</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={
                      role === "admin" ? "-" : roomPrice ? `Rp${roomPrice}` : ""
                    }
                    readOnly
                    disabled={role === "admin"}
                    placeholder="Harga kamar"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
