import './App.css'
import {useEffect} from "react";


import Form from "./components/Form.tsx";
import {useToDoContext} from "./components/store/ToDoListStore.tsx";
import TimersList from "./components/TimerList/TimersList.tsx";

function App() {
    const {timers, startTimer, stopTimer, addUpdateTimers} = useToDoContext()

    useEffect(() => {
        const running: boolean = timers.some((item) => item.start && item.duration >= 0)

        if (!running) return;

        const list = setInterval(() => {
              const startTimers = timers.map((item) => {
                 if(item.start && item.timeLeft > 0) {
                     return {...item, timeLeft: item.timeLeft - 1};
                 }

                 if(item.start && item.timeLeft <=0) {
                     return {...item, timeLeft: 0, start: false, stop: false}
                 }

                 return {...item}
            });

            const hasTimer: boolean = startTimers.some((item) => item.start && item.duration > 0)
            addUpdateTimers(startTimers)

            if(!hasTimer) {
                clearInterval(list)
            }
        }, 1000)

        return () => clearInterval(list);
    }, [timers, addUpdateTimers, startTimer, stopTimer]);


    return (
        <div className="container">
            <span className="title"><h1>TO DO LIST</h1></span>
            <Form/>
            <div className="contentList">
                <TimersList timers={timers} />
            </div>
        </div>
    )
}

export default App
