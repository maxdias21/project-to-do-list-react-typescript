import type {ToDoProps} from "../store/ToDoListStore.tsx";

type HeaderProps = {
    item: ToDoProps
}

export default function Header({item}: HeaderProps) {
    return (
        <div className="header">
            <div><span>Task:</span> {item.name}</div>
            <div><span>Duration:</span> {item.duration}s</div>
        </div>
    )
}