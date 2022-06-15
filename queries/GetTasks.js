import { gql } from "@apollo/client";

export default gql`
    query Tasks {
      tasks {
        id,
        title,
        validated
      }
    }`
