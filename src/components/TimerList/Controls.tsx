import {type ToDoProps, useToDoContext} from "../store/ToDoListStore.tsx";
import {ActionsFuncionType} from "./utils/types.ts";
import Button from "../UI/Button.tsx";

type Controls = {
    item: ToDoProps
}

type HandleStartStopType = typeof ActionsFuncionType[keyof typeof ActionsFuncionType];

type HandleStartStopProps = {
    id: string;
    type: HandleStartStopType;
}

export default function Controls({item}: Controls) {
    const {startTimer, stopTimer} = useToDoContext()

    function handleStartStop({id, type}: HandleStartStopProps): void {
        if (type === ActionsFuncionType.Start) {
            startTimer(id)
        } else if (type === ActionsFuncionType.Stop) {
            stopTimer(id)
        }
    }

    return (
        <div className="controls">
            <Button disabled={item.start} className={`start ${item.start && 'disabled'}`}
                    onClick={() => handleStartStop({id: item.id, type: 1})}>Start
            </Button>
            <Button onClick={() => handleStartStop({id: item.id, type: 0})}
                    disabled={(!item.start && !item.stop) || item.stop}
                    className={`pause ${(!item.start && !item.stop || item.stop) && 'disabled'}`}>Pause
            </Button>
        </div>
    )
}