import {createContext, type ReactNode, useContext, useReducer} from "react";

export type ToDoProps = {
    stop: boolean;
    start: boolean;
    name: string;
    duration: number;
    id: string;
    timeLeft: number;
}

export type ToDoPropsList = ToDoProps[];

type ToDoContextValue = {
    stopTimer: (id: string) => void;
    startTimer: (id: string) => void;
    addTimer: (toDo: ToDoProps) => void;
    timers: ToDoPropsList,
    addUpdateTimers: (newList: ToDoPropsList) => void;
}


// Start Actions timersReducer
type StartTimersAction = {
    type: 'START_TIMER';
    payload: { id: string }
}

type StopTimersAction = {
    type: 'STOP_TIMER';
    payload: { id: string }
}

type AddTimersAction = {
    type: 'ADD_TIMER';
    payload: ToDoProps
}

type AddUpdateListAction = {
    type: 'ADD_UPDATE_LIST',
    payload: {newList: ToDoPropsList}
}

type Action = StartTimersAction | StopTimersAction | AddTimersAction | AddUpdateListAction;
// End Actions timersReducer

export const ToDoListContext = createContext<ToDoContextValue | null>(null);

// Initial toDoListProvider
type toDoListProvider = {
    children: ReactNode
}

const initialState: ToDoPropsList = [];

// End toDoListProvider


function getItem(id: string): ToDoProps | null {
    const storage = localStorage.getItem('timers');

    if (!storage) {
        return null
    }

    const getItems: ToDoPropsList = JSON.parse(storage);
    const getItem: ToDoProps | undefined = getItems.find(item => item.id === id);

    if (!getItem) {
        return null
    }

    return getItem;
}

function timersReducer(state: ToDoPropsList, action: Action): ToDoPropsList {
    if(action.type === 'ADD_UPDATE_LIST') {
        const newList = action.payload.newList;
        localStorage.setItem('timers', JSON.stringify([...newList]))
        return [...newList];
    }

    if (action.type === 'START_TIMER') {
        const toDo = getItem(action.payload.id);

        if (!toDo) return state

        return state.map((item) => {
            if (item.id === toDo.id) {
                return {...item, start: true, stop: false};
            }

            return item;
        });
    }

    if (action.type === 'STOP_TIMER') {
        const toDo = getItem(action.payload.id);

        if (!toDo) return state
        return state.map((item) => {
            if (item.id === toDo.id) {
                return {...item, start: false, stop: true};
            }

            return item;
        });
    }

    if (action.type === 'ADD_TIMER') {
        localStorage.setItem('timers', JSON.stringify([...state, action.payload]))
        return [...state, action.payload]
    }


    return [...state]
}


function init(): ToDoPropsList {
    const lists = localStorage.getItem('timers');
    if (lists) {
        const storage: ToDoPropsList = JSON.parse(lists);
        return storage.map((item) => {
            return {...item, start: false, stop: false};
        });
    }

    return [];
}

export function useToDoContext() {
    const context = useContext(ToDoListContext);

    if (context === null) {
        throw new Error('useToDoContext must be used within the context');
    }

    return context
}

export function ToDoListProvider({children}: toDoListProvider) {
    const [timerState, dispatch] = useReducer(timersReducer, initialState, init);

    const ctx: ToDoContextValue = {
        timers: timerState,
        startTimer: (id: string) => {
            dispatch({type: 'START_TIMER', payload: {id}})
        },

        addUpdateTimers: (newList: ToDoPropsList) => {
            dispatch({type: 'ADD_UPDATE_LIST', payload: {newList}})
        },

        stopTimer: (id: string) => {
            dispatch({type: 'STOP_TIMER', payload: {id}})
        },
        addTimer: (timer: ToDoProps) => {
            dispatch({type: 'ADD_TIMER', payload: timer})
        }
    }

    return (
        <ToDoListContext value={ctx}>
            {children}
        </ToDoListContext>
    )
}