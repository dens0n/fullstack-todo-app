import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

function App() {
    const userEmail = "test@test.se";
    const [tasks, setTasks] = useState(null);

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:8000/todos/${userEmail}`);
            const json = await res.json();
            setTasks(json);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => getData, []);

    console.log(tasks);

    const sortedTasks = tasks?.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return (
        <div className="app">
            <ListHeader listName={"Todo App"} />
            {sortedTasks?.map((task) => (
                <ListItem key={task.id} task={task} />
            ))}
        </div>
    );
}

export default App;
