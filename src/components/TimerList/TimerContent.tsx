import Header from "./Header.tsx";
import type {ToDoProps} from "../store/ToDoListStore.tsx";
import Controls from "./Controls.tsx";

type TimerContentProps = {
    item: ToDoProps
}


export default function TimerContent({item}: TimerContentProps) {
    return (
        <div className="contentItem" key={item.id}>
            <Header item={item}/>
            {item.timeLeft > 0 &&
                <div className="timeLeft">
                    <Controls item={item}/>
                </div>}
            {item.timeLeft > 0 ?
                <div className="timeLeft">
                    Time left: {item.timeLeft}s
                </div>
                :
                <div className="timeLeft">
                    It's over!
                </div>}
        </div>
    )
}