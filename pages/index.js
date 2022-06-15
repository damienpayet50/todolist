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

    return (
        <>
            <div className="container">
                <h1>Ma todo liste</h1>
                <AddTask afterAddHandle={refreshHandle}></AddTask>
                <div class='tasks-list'>
                    {tasks.map(task => {
                        return (
                            <Task data={task} afterRemoveHandle={refreshHandle}></Task>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
