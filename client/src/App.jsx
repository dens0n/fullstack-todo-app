import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import Spline from "@splinetool/react-spline";
function App() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;
    const [tasks, setTasks] = useState(null);

    const getData = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/todos/${userEmail}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
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

    const sortedTasks = tasks?.sort((a, b) => {
        if (a.progress > 95 && b.progress <= 95) {
            return 1; // a ska komma efter b om a har progress > 95 och b har progress <= 95
        } else if (a.progress <= 95 && b.progress > 95) {
            return -1; // a ska komma före b om a har progress <= 95 och b har progress > 95
        } else {
            // Båda har progress <= 95 eller båda har progress > 95, sortera efter datum
            return new Date(a.date) - new Date(b.date);
        }
    });

    /*  const sortedTasks = tasks?.sort((a, b) => a.progress - b.progress); */

    return (
        <>
            {/*  <Spline
                className="spline"
                scene="https://prod.spline.design/HPjiUiAv8Ufbl4xq/scene.splinecode" 
            /> */}
            <div
                className="app"
                style={{
                    backgroundColor: !authToken
                        ? "transparent"
                        : "rgba(132, 132, 132, 0.5)",
                }}
            >
                {!authToken && <Auth />}
                {authToken && (
                    <>
                        <ListHeader
                            listName={`${userEmail}'s ToDo App`}
                            getData={getData}
                        />
                        {sortedTasks?.map((task) => (
                            <ListItem
                                key={task.id}
                                task={task}
                                getData={getData}
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}

export default App;
