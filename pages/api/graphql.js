import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import database from "../../services/database";
import DataLoader from "dataloader";

const typeDefs = gql`
  type Query {
    tasks: [Task!]!
  }
  type Task {
    id: ID!
    title: String!
  }
  type Success {
    success: Boolean!
  }
  type Mutation {
    createTask(task: CreateTaskInput!): Task,
    removeTask(task: RemoveTaskInput!): Success,
  }
  input CreateTaskInput {
    title: String!
  }
  input RemoveTaskInput {
    id: ID!
  }
`;

const resolvers = {
    Query: {
        tasks: (_parent, args, _context) => {
            return database
                .select("*")
                .from("tasks")
                .orderBy("id", "desc");
        }
    },
    Mutation : {
        createTask: async (_parent, args, _context) => {
            const returnId = await database.table('tasks').insert({
                title: args.task.title
            }).then(function (id) {
                return id;
            });

            return {
                id: returnId[0],
                title: args.task.title
            }
        },
        removeTask: async (_parent, args, _context) => {
            await database.table('tasks')
                .delete()
                .where({
                    id: args.task.id
                });

            return {
                success: true
            }
        }
    }
};

const loader = {
    task: new DataLoader(id => {
        database
            .select("*")
            .from("tasks")
    })
};

const cors = Cors({
    allowMethods: ["GET", "POST", "OPTIONS"]
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return { loader };
    }
});

const startServer = server.start();

export const config = {
    api: {
        bodyParser: false
    }
};

export default cors(async (req, res) => {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }

    await startServer;
    await server.createHandler({ path: "/api/graphql" })(req, res);
});
