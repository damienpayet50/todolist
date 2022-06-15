import {useMutation} from "@apollo/client";
import RemoveTask from "../queries/RemoveTask";

const Task = ({ data, afterRemoveHandle }) => {

    const [removeTask] = useMutation(RemoveTask, {
        variables: {
            task: {
                id: data.id
            }
        }
    });

    const removeHandle = async () => {
        await removeTask();
        afterRemoveHandle();
    }

    return (
        <div>
            <p>{data.title} <span onClick={removeHandle}>Supprimer</span></p>
        </div>
    )
}

export default Task;
