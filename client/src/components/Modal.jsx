import { useState } from "react";
import { useCookies } from "react-cookie";
export default function Modal({ mode, setShowModal, task, getData, progress }) {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const editMode = mode === "edit" ? true : false;
    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email,
        title: editMode ? task.title : "",
        progress: editMode ? task.progress : 0,
        date: editMode ? task.date : new Date(),
    });

    console.log(cookies.AuthToken);
    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.AuthToken}`,
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                console.log("Lagt till en todo");
                setShowModal(false);
                getData();
            } else {
            }
        } catch (err) {
            console.log(err);
        }
    };

    const editData = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8000/todos/${task.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookies.AuthToken}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.status === 200) {
                setShowModal(false);
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((data) => ({
            ...data,
            [name]: name === "progress" ? Number(value) : value,
        }));
    };
    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>
                <form>
                    <input
                        type="text"
                        required
                        maxLength={30}
                        placeholder="your task goes here"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                    <br />
                    {/* <label htmlFor="range">
                        Drag to select current progress
                    </label>
                    <input
                        id="range"
                        required
                        type="range"
                        min={0}
                        max={100}
                        name="progress"
                        value={Number(data.progress)}
                        onChange={handleChange}
                    /> */}
                    <input
                        className={mode}
                        type="submit"
                        onClick={editMode ? editData : postData}
                    />
                </form>
            </div>
        </div>
    );
}
