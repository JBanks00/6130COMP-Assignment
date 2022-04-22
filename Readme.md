This is the repository for the 6130COMP Assignment, included are the steps to run the current version of cloud application and the requirements of NotFLIX Ltd that have been met.

<b>Starting the Solution:</b>
To start the solution, once the folder exists on the VM being used to test, use the command:

cd 613COMP-Assignment

To change directory into the solution folder. From here the solution can be started with the following command:

sudo docker-compose up

Give the soution time to boot up, afterwards use "Ctrl+Z" to  enter the terminal again. To view the ruunning containers run the command:

sudo docker container ls

MongoDB:
A connection string is used to connect to the NotFLIX MongoDB, after a connetion has been established tests can be ran to query the database.

from the terminal, from previous steps as solution needs to be running, run the command:

docker exec -it mongoContainer mongo  - where mongoContainer is the localmongo1 containerID

Then:

use notFlixDB;

To Check:

db

Run:

db.interaction.insertMany([
  { 'AccountID': 1, 'Username': 'JBanks00', 'TitleID': 001, 'UserAction': 'Play', 'DateTime': '2021-22-05', 'PointofInteraction': '00:25:30', 'TypeofInteraction': 'Play' },
]);

Check:

show tables

Then:

db.interaction.find()

Finally:

db.interaction.drop();

Ctrl+C

Stopping the Solution:
