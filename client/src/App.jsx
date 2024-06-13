import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
function App() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;
    const [tasks, setTasks] = useState(null);

    const getData = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/todos/${userEmail}`
            );
            const json = await res.json();
            setTasks(json);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (authToken) {
            getData();
        }
    }, []);

    console.log(tasks);

    const sortedTasks = tasks?.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return (
        <div className="app">
            {!authToken && <Auth />}
            {authToken && (
                <>
                    <ListHeader
                        listName={`${userEmail}'s ToDo App`}
                        getData={getData}
                    />
                    {sortedTasks?.map((task) => (
                        <ListItem key={task.id} task={task} getData={getData} />
                    ))}
                </>
            )}
        </div>
    );
}

export default App;
