import React, { Component } from 'react';
import faker from 'faker';
import { db } from './firebase';

class App extends Component {

 state = {
   cats: []
 }

 componentDidMount() {
   db.ref('/cats/').push({ name: 'My Buddy' });
   db.ref('/numbers/').set([1, 2, 3]);
   // db.ref('/cats/').remove(); // db.ref('/cats/').set(null);
   // db.ref('/').remove();

   db.ref('/numbers/').once('value', (snapshot) => {
     console.log(snapshot.val());
   });

   db.ref('/cats/').on('value', (snapshot) => {
     const cats = [];
     Object.entries(snapshot.val()).forEach(elem => {
       const cat = {
         id: elem[0],
         ...elem[1]
       }
       cats.push(cat);
     });
     this.setState({ cats });
   });

   const headers = {
     'x-api-key': 'd24b427d-578e-4609-86bd-b36555c3875c'
   }

   fetch('https://api.thecatapi.com/v1/images/search?limit=10')
     .then(response => response.json())
     .then(data => {
       console.log(data);

       data.map(catFromApi => {
         const cat = {
           name: faker.name.findName(),
           url: catFromApi.url
         };
         db.ref('/cats/').push( cat )
       });
     });



 }

 render() {
   const { cats } = this.state;
   return (
     <div className="App">
       <ul>
         {cats.map(cat => (
           <li key={cat.id}>{cat.name} <img src={cat.url}/>  </li>
         ))}
       </ul>
     </div>
   );
 }
}

export default App;