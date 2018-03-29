import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { id:1, title:'Clean house', completed: false},
      { id:2, title:'Eat lunch', completed: false},
      { id:3, title:'Sleep', completed: false}
    ];
    return {todos};
  }
}
