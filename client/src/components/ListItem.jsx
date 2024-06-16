import { useState } from "react";
import { useCookies } from "react-cookie";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
export default function ListItem({ task, getData }) {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState({
        id: task.id,
        user_email: task.user_email,
        title: task.title,
        progress: task.progress,
        date: task.date,
    });

    const handleProgressChange = async (newProgress, id) => {
        // Uppdatera progress-objektet
        const updatedProgress = { ...progress, progress: newProgress, id: id };
        setProgress(updatedProgress);

        // Anropa editData efter att progress har uppdaterats
        await editData(updatedProgress);
    };

    const editData = async (updatedProgress) => {
        try {
            const response = await fetch(
                `http://localhost:8000/todos/${updatedProgress.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookies.AuthToken}`,
                    },
                    body: JSON.stringify(updatedProgress),
                }
            );
            if (response.status === 200) {
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteItem = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/todos/${task.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookies.AuthToken}`,
                    },
                }
            );
            if (response.status === 200) {
                getData();
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <li
            className="list-item"
            style={{
                backgroundColor:
                    task.progress > 95 ? "rgba(76, 175, 80, 1)" : "",
            }}
        >
            <div className="info-container">
                <TickIcon progress={task.progress} />
                <p className="task-title">{task.title}</p>
                {task.progress < 100 && (
                    <ProgressBar
                        task={task}
                        onProgressChange={handleProgressChange}
                    />
                )}
            </div>

            <div className="button-container">
                {task.progress < 95 ? (
                    <button className="edit" onClick={() => setShowModal(true)}>
                        EDIT
                    </button>
                ) : (
                    ""
                )}
                <button className="delete" onClick={deleteItem}>
                    DELETE
                </button>
            </div>
            {showModal && (
                <Modal
                    mode={"edit"}
                    setShowModal={setShowModal}
                    task={task}
                    getData={getData}
                    progress={progress}
                />
            )}
        </li>
    );
}
