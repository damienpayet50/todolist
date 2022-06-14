import {useMutation} from "@apollo/client";
import RemoveTask from "../queries/RemoveTask";

const Task = ({ data }) => {

    const [removeTask] = useMutation(RemoveTask, {
        variables: {
            task: {
                id: data.id
            }
        }
    });

    return (
        <div>
            <p>{data.title} <span onClick={removeTask}>Supprimer</span></p>
        </div>
    )
}

export default Task;
