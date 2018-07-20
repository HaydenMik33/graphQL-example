const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");
//hardcoded data
// const customers = [
//   { id: 0, name: "Hayden", email: "anhayzzing33@gmail.com", age: 21 },
//   { id: 1, name: "JAde", email: "anhayzzing33@gmail.com", age: 21 },
//   { id: 2, name: "Hoon", email: "anhayzzing33@gmail.com", age: 21 }
// ];
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id == args.id) {
        //     return customers[i];
        //   }
        // } for hardcoded data
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/customers")
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:3000/customers", {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data);
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    editCustomer:{
        type:CustomerType,
        args:{
            id:{type: new GraphQLNonNull(GraphQLString)},
            name: {type: GraphQLString},
            email: {type: GraphQLString},
            age: {type: GraphQLInt}
        },
        resolve(parentValue, args){
            return axios.patch('http://localhost:3000/customers/'+args.id, args)
            .then(res => res.data);
        }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
