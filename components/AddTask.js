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
        <form className={'row w-100'}>
            <div className={'col-md-10'}>
                <input
                    className={'form-control'}
                    value={taskName}
                    onChange={taskFieldHandle}
                    placeholder={'Ajouter une nouvelle tâche...'}
                />
            </div>
            <div className={'col-md-2'}>
                <button
                    className={'btn btn-primary font-weight-bold'}
                    disabled={taskName.toString().trim() === ''}
                    onClick={addTaskHandle}
                >Ajouter</button>
            </div>
        </form>
    )
}

export default AddTask;
