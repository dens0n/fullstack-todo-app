import { useState } from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
export default function ListItem({ task, getData }) {
    const [showModal, setShowModal] = useState(false);

    const deleteItem = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`,
                {
                    method: "DELETE",
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
                    task.progress === 100 ? "rgba(120, 181, 45,0.2)" : "",
            }}
        >
            <div className="info-container">
                <TickIcon progress={task.progress} />
                <p className="task-title">{task.title}</p>
                <ProgressBar progress={task.progress} />
            </div>

            <div className="button-container">
                <button className="edit" onClick={() => setShowModal(true)}>
                    EDIT
                </button>
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
                />
            )}
        </li>
    );
}
