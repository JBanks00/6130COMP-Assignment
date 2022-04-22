This is the repository for the 6130COMP Assignment, included are the steps to run the current version of cloud application and the requirements of NotFLIX Ltd that have been met.

<b>Starting the Solution:</b>

To start the solution, once the folder exists on the VM being used to test, use the command:

<b>cd 613COMP-Assignment</b>

This will change the  directory into the solution folder. From here the solution can be started with the following command:

<b>sudo docker-compose up</b>

Give the soution time to boot up, afterwards use "Ctrl+Z" to  enter the terminal again. From here the  ruunning containers can be seen by running the command:

<b>sudo docker container ls</b>

MongoDB:
A connection string is used to connect to the NotFLIX MongoDB, after a connetion has been established tests can be ran to query the database.

from the terminal, from previous steps as solution needs to be running, run the command:

docker exec -it mongoContainer mongo  - where mongoContainer is the localmongo1 containerID </b>

Then:

<b>use notFlixDB;</b>

To Check:

<b>db</b>

Run:

<b>db.interaction.insertMany([
  { 'AccountID': 1, 'Username': 'JBanks00', 'TitleID': 001, 'UserAction': 'Play', 'DateTime': '2021-22-05', 'PointofInteraction': '00:25:30', 'TypeofInteraction': 'Play' },
]);</b>

Check:

<b>show tables</b>

Then:

<b>db.interaction.find()</b>

Finally:

<b>db.interaction.drop();</b>

<b>Ctrl+C</b>

Stopping the Solution:
