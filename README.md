Machine Test Round Completion - Project README
Overview
This project was developed as part of the machine test round. It consists of a full-stack application with a backend built using Node.js, Express, and MongoDB, and a frontend built using React.js, Tailwind CSS, and Shadcn UI. All APIs have been thoroughly tested, and a Postman collection is provided for reference. The backend is deployed on a VPS hosting provided by HostingRaja, while the frontend is deployed on shared hosting. The deployed application is accessible at https://aayan.samadhaangroups.co.in.
Technologies Used

Backend:
Node.js
Express
MongoDB


Frontend:
React.js
Tailwind CSS
Shadcn UI


Testing:
All APIs have been tested using Postman, and the collection is included in the repository.


Deployment:
Backend: Deployed on VPS hosting (HostingRaja)
Frontend: Deployed on shared hosting


Git Repository: The source code is available at https://github.com/shivam-yadav2/BuisnesPageAayanInfotech.git

Repository Structure
The repository contains three main folders:

admin: Contains the admin panel frontend code (React.js).
server: Contains the backend code (Node.js, Express, MongoDB).
client: Contains the main frontend code (React.js).

Prerequisites
To run the project locally, ensure you have the following installed:

Node.js (v16 or higher)
npm (v8 or higher)
MongoDB (local or cloud instance, e.g., MongoDB Atlas)
Git (for cloning the repository)

How to Run the Project Manually
Follow these steps to set up and run the project locally:

Clone the Repository:
git clone https://github.com/shivam-yadav2/BuisnesPageAayanInfotech.git
cd BuisnesPageAayanInfotech


Install Dependencies:The repository has three folders: admin, server, and client. You need to install Node modules for each folder.

Navigate to the admin folder:
cd admin
npm install


Navigate to the server folder:
cd ../server
npm install


Navigate to the client folder:
cd ../client
npm install




Set Up Environment Variables:

For the server folder, create a .env file and configure the necessary environment variables (e.g., MongoDB connection string, port, etc.). Example:PORT=4000
MONGO_URI=<your-mongodb-connection-string>




Run the Applications:

In the admin folder:npm run dev


In the server folder:npm run dev


In the client folder:npm run dev



Each command will start the respective application. The backend runs on http://localhost:4000, while the frontend (admin and client) runs on http://localhost:3000 or similar, depending on the configuration.

Access the Application:

Open your browser and navigate to the URLs provided in the terminal (e.g., http://localhost:3000 for the frontend, http://localhost:4000 for the backend).
Use the Postman collection included in the repository to test the APIs.



API Testing

All APIs have been tested using Postman.
The Postman collection is included in the repository (e.g., api-collection.json) for easy testing.
Import the collection into Postman to test the endpoints.

Deployment

Backend: Deployed on a VPS hosted by HostingRaja, accessible at https://aayan.samadhaangroups.co.in.
Frontend: Deployed on shared hosting, accessible at https://aayan.samadhaangroups.co.in.
Git Repository: https://github.com/shivam-yadav2/BuisnesPageAayanInfotech.git

Notes

Ensure MongoDB is running or properly configured (e.g., via MongoDB Atlas) before starting the backend.
Check the .env file for any additional configuration specific to your environment.
If you encounter issues, verify that all dependencies are installed correctly and that the correct ports are open.

Thank you for reviewing my machine test submission!