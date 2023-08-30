#########    Todo Website Documentation   ##########

******Table of Contents*****
@Introduction
@Features
@Technologies Used
@Setup
----Frontend Setup
----Backend Setup
----Database Setup
@Usage
@Signing Up
@Logging In
@Adding a Task
@Editing a Task
@Changing Task Status
@Deleting a Task
@Conclusion


______  Introduction  _____
The Todo website is a task management application that allows users to organize their tasks effectively. It provides a user-friendly interface for adding, editing, categorizing, and managing tasks. Users can also sign up and log in to their accounts to access their tasks securely. The website is built using HTML, CSS, and JavaScript for the frontend, and Node.js for the backend.

_______  Features   _______
---Sign Up and Log In: Users can create accounts, log in, and log out securely.

---Add New Task: Users can add new tasks by providing a title and description.

---Edit Task: Users can edit the title and description of existing tasks.

---Change Task Status: Tasks can be moved between "To-Do," "Doing," and "Done" columns using drag and drop functionality.

---Delete Task: Users can delete tasks they no longer need.


_______  Technologies Used  _______
---Frontend: HTML, CSS, JavaScript
---Backend: Node.js
---Backend Framework: Express.js
---Database: (You can specify a database if used, e.g., MongoDB)
---Authentication: JWT (JSON Web Tokens)
---Drag and Drop: HTML5 Drag and Drop API


_______  Setup  ______

---Frontend Setup
Clone the repository or download the source code of the frontend.
Open the index.html file in a web browser to use the Todo website.

---Backend Setup
Clone the repository or download the source code of the backend.
Navigate to the backend directory using the terminal.
Run npm install to install the required dependencies.
Configure the database connection and authentication settings.
Run node app.js to start the backend server.

---Database Setup
Set up a database MongoDB and create necessary collections  Users and Tasks.
Update the database configuration in the backend to connect to your database.


_______  Usage  ______

---Signing Up
On the Todo website's homepage, find the "Sign Up" link and click on it.
Fill out the registration form with a username and password.
Click the "Sign Up" button to create your account.
You will be redirected to the login page after successful registration.

---Logging In
Access the Todo website's homepage and click on the "Log In" link.
Provide your registered username and password.
Click the "Log In" button to access your account.

---Adding a Task
After logging in, you'll find an "Add Task" button. Click on it.
A form will appear with fields for the task's title and description.
Fill in the details and click the "Add" button.
The new task will now appear in the "To-Do" column.

---Editing a Task
Locate the task you want to edit.
Click on the task to open its details.
Update the title and description as needed.
Click the "Save" button to confirm the changes.

---Changing Task Status
Each task has a drag handle (usually three horizontal lines) at the corner.
Click and hold this handle to drag the task.
Drag the task to the appropriate column ("To-Do," "Doing," or "Done").
Release the mouse button to drop the task into the new column.

---Deleting a Task
Locate the task you want to delete.
Click on the task to open its details.
Click on the "Delete" button.
Confirm the deletion in the prompt that appears.

---Conclusion
The Todo website provides a comprehensive task management solution with user authentication, enabling users to securely access and manage their tasks. By utilizing HTML, CSS, JavaScript, Node.js, and JWT authentication, the application offers a seamless and secure experience for task organization. This documentation serves as a guide for users to effectively utilize the website's features and manage their tasks efficiently.




