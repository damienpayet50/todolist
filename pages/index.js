import client from "../services/apollo-client";
import AddTask from "../components/AddTask";
import Task from "../components/Task";
import GetTasks from "../queries/GetTasks";
import {useRouter} from "next/router";

export async function getServerSideProps() {
    await client.cache.reset();
    const { data } = await client.query({
        query: GetTasks,
    });

    return {
        props: {
            tasks: data.tasks,
        },
    };
}

export default function Home({tasks}) {
    const router = useRouter();

    const refreshHandle = async (id) => {
        await router.replace(router.asPath);
    }

    const countNotValidatedTask = tasks.filter(task => !task.validated).length;

    return (
        <>
            <div className="page-content page-container" id="page-content">
                <div className="row container d-flex justify-content-center">
                    <div className="col-md-12">
                        <div className="card px-3">
                            <div className="card-body">
                                <h4 className="card-title">
                                    Ma Todo Liste
                                </h4>
                                <div className="add-items d-flex">
                                    <AddTask afterAddHandle={refreshHandle}></AddTask>
                                </div>
                                {
                                    countNotValidatedTask > 0 ?
                                    <p  className={'text-primary'}>Il vous reste {countNotValidatedTask} tâches à terminer</p>
                                    : ''
                                }
                                <div className="list-wrapper">
                                    <div className={'d-flex flex-column'}>
                                        {tasks.map(task => {
                                            return (
                                                <Task key={task.id} data={task} afterEditHandle={refreshHandle}></Task>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
