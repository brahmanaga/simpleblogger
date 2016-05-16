import angular from 'angular';
import angularMeteor from 'angular-meteor';
 import { Tasks } from '../../api/tasks.js';
import template from './todosList.html';
import { Meteor } from 'meteor/meteor';

 class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
 
    this.helpers({
      tasks() {
        return Tasks.find({},{
			sort: {
            createdAt: -1
          }
			
		});
      }
    })
  }
  
  addTask(newTask,title) {
    // Insert a task into the collection
	console.log("Task: "+newTask);
	console.log("Title is: "+title);
    Meteor.call('tasks.insert', newTask,title);

    // Clear form
    this.newTask = '';
  }
  currentUser() {
        return Meteor.user();
      }
  setChecked(task) {
    // Set the checked property to the opposite of its current value
     Meteor.call('tasks.setChecked', task._id, !task.checked);
  }
 updateTask(task,Task,title) {
	 console.log("TaskID: "+task._id+ " Task :"+ Task + " Taskt Title : "+ title);
	
    // Set the checked property to the opposite of its current value
     Meteor.call('tasks.update', task._id, Task, title);
  }
 
 
  removeTask(task) {
     Meteor.call('tasks.remove', task._id);
  }
}
 
export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });