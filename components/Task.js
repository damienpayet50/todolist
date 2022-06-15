import {useMutation} from "@apollo/client";
import RemoveTask from "../queries/RemoveTask";
import SwitchTask from "../queries/SwitchTask";

const Task = ({ data, afterEditHandle }) => {

    const [removeTask] = useMutation(RemoveTask, {
        variables: {
            task: {
                id: data.id
            }
        }
    });

    const [switchTask] = useMutation(SwitchTask, {
        variables: {
            task: {
                id: data.id,
                validated: !data.validated
            }
        }
    });

    const removeHandle = async (e) => {
        e.preventDefault();
        await removeTask();
        afterEditHandle();
    }

    const switchHandler = async (e) => {
        e.preventDefault();
        await switchTask();
        afterEditHandle();
    }

    return (
        <div className={`task-line mt-1 mb-1 ${data.validated ? "checked" : ""}`}>
            <p className={'m-0'} onClick={switchHandler}>
                {data.title}
            </p>
            <span className={'remove-task d-inline-flex'} onClick={removeHandle}>
                <i className={'fa fa-close'}></i>
            </span>
        </div>
    )
}

export default Task;
