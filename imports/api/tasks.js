import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');
 
Meteor.methods({
  'tasks.insert' (text,title) {
    check(text, String);
	check(title, String);
 
    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
	  title,
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'tasks.remove' (taskId) {
    check(taskId, String);
 if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(taskId);
  },
  'tasks.setChecked' (taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
   if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(taskId, {
      $set: {
        checked: setChecked
      }
    });
  },
  'tasks.update' (taskId, task,title) {
   console.log("TaskID: "+taskId+ " Task :"+ task + " Taskt Title : "+ title);
   check(taskId, String);
    check(task, String);
    check(title, String);
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
	Tasks.update(taskId, {
      $set: {        
		title: title,
		text: task
      }
    });
  },
});