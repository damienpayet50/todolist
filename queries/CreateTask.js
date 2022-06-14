import { gql } from "@apollo/client";

export default gql`
  mutation CreateTask($task: CreateTaskInput!) {
    createTask(task: $task) {
      id
      title
    }
  }
`;
