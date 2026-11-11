import Button from "./UI/Button.tsx";
import FormField from "./UI/FormField.tsx";

import {type SubmitEvent, useState} from "react";


import {HandleChangeType} from "./TimerList/utils/types.ts";
import {useToDoContext} from "./store/ToDoListStore.tsx";

type HandleChangeTypeProp = typeof HandleChangeType[keyof typeof HandleChangeType]
type HandleChangeFormProps = {
    value: string;
    type: HandleChangeTypeProp
}

const FIELDS_INITIAL = {
    name: "",
    duration: 0,
}

type FieldsState = {
    name: string;
    duration: number;
}

export default function Form() {
    const {addTimer} = useToDoContext();
    const [fields, setFields] = useState<FieldsState>(FIELDS_INITIAL)

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = fields.name;
        const duration = fields.duration;

        if (!name || !duration) {
            return;
        }

        if (typeof name !== "string" || name.length <= 0 || !Number.isFinite(duration) || duration <= 0) {
            return null;
        }

        const id = String(Date.now());

        addTimer({id: id, name, duration, stop: false, start: false, timeLeft: duration})
    }

    function handleChange({value, type}: HandleChangeFormProps): void {
        if (type === HandleChangeType.Name && typeof value === 'string') {
            setFields((prev) => ({...prev, name: value}))
        } else if (type === HandleChangeType.Duration && Number(value)) {
            setFields((prev) => ({...prev, duration: Number(value)}))
        }
    }

    const isSubmit = fields && fields.name !== "" && fields.duration <= 0;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="formFields">
                <FormField
                    labelValue={"Name"}
                    onChange={(event) => handleChange({
                        value: event.target.value,
                        type: HandleChangeType.Name
                    })}
                    name="name"
                    id="name"/>
            </div>
            <div className="formFields">
                <FormField labelValue="Duration"
                           type="number"
                           onChange={(event) => handleChange({
                           value: event.target.value, type: HandleChangeType.Duration
                       })}
                           name="duration"
                           id="duration"/>
            </div>

            <Button disabled={isSubmit} className={"buttonSubmit"}>Adicionar tarefa</Button>
        </form>
    )
}
