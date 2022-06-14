import Head from 'next/head'
import client from "../services/apollo-client";
import AddTask from "../components/AddTask";
import Task from "../components/Task";
import GetTasks from "../queries/GetTasks";

export async function getServerSideProps() {
    const { data } = await client.query({
        query: GetTasks,
    });

    return {
        props: {
            tasks: data.tasks.slice(0, 4),
        },
    };
}



export default function Home({tasks}) {
    return (
        <>
            <div className="container">
                <h1>Ma todo liste</h1>
                <AddTask></AddTask>
                <div class='tasks-list'>
                    {tasks.map(task => {
                        return (
                            <Task data={task}></Task>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
