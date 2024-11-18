# Task Management App  

Developed with 🖤 by [Osama Karam](https://github.com/osama20200071)  
**Live App**: [Task Management App](https://task-managment-ecru.vercel.app)  

---

## Features  

- **Create Task**:  
  - Includes robust form validation using `yup` combined with `react-hook-form`.  

- **Edit Task**:  
  - Reuses the same form with all validations.  
  - Allows updates only if data has changed.  
  - Task edits are restricted to the owner.  

- **Delete Task**:  
  - Only the owner of the task is authorized to delete it.  

- **View Tasks**:  
  - Authenticated users can view all tasks.  

- **Change Task State**:  
  - Task state can be updated by authenticated users.  

---

## Bonus Features  

- **Robust Authentication System**:  
  - Secure access to data through an authentication system.  
  - Login and Register functionality with validation and user-friendly feedback.  

- **Personalized Task Management**:  
  - Each user has their own tasks, as tasks are linked to the creator's user ID.  

---

## Tools and Technologies  

- **React Hook Form**: Simplifies form management.  
- **Yup**: Provides robust form validation.  
- **Redux**: Manages the application state efficiently.  
- **Appwrite**: Backend services for:  
  - Task images storage  
  - Database management  
  - Authentication - Authorization 
- **React Router**: Handles client-side routing.  
- **Vercel**: Used for deployment.  


