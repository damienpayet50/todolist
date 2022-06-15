import { gql } from "@apollo/client";

export default gql`
  mutation SwitchTask($task: SwitchTaskInput!) {
    switchTask(task: $task) {
        success
    }
  }
`;
