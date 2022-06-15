import {useMutation} from "@apollo/client";
import {useState} from "react";
import CreateTask from "../queries/CreateTask";

const AddTask = ({afterAddHandle}) => {

    const [taskName, setTaskName] = useState('');

    const [createTask] = useMutation(CreateTask, {
        variables: {
            task: {
                title: taskName
            }
        }
    });

    const addTaskHandle = async (e) => {
        e.preventDefault();
        if (taskName.toString().trim() !== '') {
            await createTask();
            setTaskName('');
            afterAddHandle();
        }
    }

    const taskFieldHandle = (e) => {
        const value = e.target.value;

        if (value.toString().trim() !== '') {
            setTaskName(e.target.value);
        } else {
            setTaskName('');
        }
    }

    return (
        <form>
            <input value={taskName} onChange={taskFieldHandle}/>
            <button disabled={taskName.toString().trim() === ''} onClick={addTaskHandle}>Ajouter</button>
        </form>
    )
}

export default AddTask;
