// To handle real-time data updates in a React application, you can use MongoDB Change Streams along with a WebSocket library like Socket.IO. This allows your frontend to receive updates as soon as changes occur in your MongoDB database. Here’s a basic example of how you can set this up:

// Set up a Change Stream in your Node.js backend:

// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// // Define a schema and model
// const mySchema = new Schema({
//   field1: String,
//   field2: String
// });
// const MyModel = mongoose.model('MyModel', mySchema);
// // Watch for changes in the collection
// const changeStream = MyModel.watch();
// changeStream.on('change', (change) => {
//   console.log('Change detected:', change);
//   // Emit the change to all connected clients
//   io.emit('dataChange', change);
// });
// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// Set up the React frontend to listen for updates:

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// const socket = io('http://localhost:3000');
// const App = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     // Listen for data changes from the server
//     socket.on('dataChange', (change) => {
//       console.log('Data change received:', change);
//       // Update the state with the new data
//       setData((prevData) => [...prevData, change.fullDocument]);
//     });
//     // Clean up the effect
//     return () => {
//       socket.off('dataChange');
//     };
//   }, []);
//   return (
//     <div>
//       <h1>Real-Time Data Updates</h1>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>{JSON.stringify(item)}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default App;
//!=============================================
// If you need to handle multiple extra fields when saving a document in a Mongoose schema, you can iterate over the extra fields and process them accordingly. Here's an example of how you can achieve this using a pre hook:

// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const mySchema = new Schema({
//   field1: String,
//   field2: String
// });
// mySchema.pre('save', function(next) {
//   // Assuming `extraFields` is an object containing extra fields not defined in the schema
//   const extraFields = this.extraFields;
//   if (extraFields) {
//     // Iterate over the extra fields and handle them
//     for (const [key, value] of Object.entries(extraFields)) {
//       console.log(`Extra field received: ${key} = ${value}`);
//       // You can also add this data to a specific field if needed
//       // For example, you could store extra fields in a separate object field
//       this[key] = value; // Example of assigning extra data to a defined field
//     }
//   }
//   next();
// });
// const MyModel = mongoose.model('MyModel', mySchema);
// // Example usage
// const doc = new MyModel({ field1: 'value1', field2: 'value2', extraFields: { extraField1: 'extraValue1', extraField2: 'extraValue2' } });
// doc.save();
//!==========================================
// Yes, you can call a function in a Mongoose schema when two boolean fields are updated from false to true. You can achieve this by using Mongoose middleware (pre or post hooks) to detect changes in the document and then execute your function accordingly.

// Here's an example using a pre hook to check if two boolean fields (field1 and field2) are updated from false to true:

// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const mySchema = new Schema({
//   field1: { type: Boolean, default: false },
//   field2: { type: Boolean, default: false }
// });
// mySchema.pre('save', function(next) {
//   if (this.isModified('field1') && this.isModified('field2')) {
//     if (this.field1 === true && this.field2 === true) {
//       // Call your function here
//       myFunction();
//     }
//   }
//   next();
// });
// function myFunction() {
//   console.log('Both field1 and field2 were updated from false to true');
// }
// const MyModel = mongoose.model('MyModel', mySchema);