MERN App Under Docker: Smth like Kanban board

Stack Mongo Express React(with Mobx)

Open your terminal and navigate to the directory where your MERN application is located.

To start your MERN app, run the following command in the terminal:

    bash

        docker-compose up

This command will build the images and start the containers for your client, server, and MongoDB.

Access the Client

        http://127.0.0.1:3000

Stopping the Application

To stop the application, press Ctrl + C in the terminal where you ran docker-compose up, or you can run:

    bash

        docker-compose down
