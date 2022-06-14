import { gql } from "@apollo/client";

export default gql`
  mutation RemoveTask($task: RemoveTaskInput!) {
    removeTask(task: $task) {
        success
    }
  }
`;
