import {type ToDoPropsList} from "../store/ToDoListStore.tsx";

import TimerContent from "./TimerContent.tsx";

type TimersListProps = {
    timers: ToDoPropsList
}


export default function TimersList({timers}: TimersListProps) {
    if (!timers) return null;

    return (
        timers.length > 0 && timers?.map((item) => {
            return (
                <TimerContent key={item.id} item={item}/>
            );
        })
    )
}