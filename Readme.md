<h1>Joe Banks Assignment</h1>
<p>This is the repository for the 6130COMP Assignment, included are the steps to run the current version of cloud application and the requirements of NotFLIX Ltd that have been met.</p>

<h2>Starting the Solution:</h2>

To start the solution, once the folder exists on the VM being used to test, use the command:

<b>cd 613COMP-Assignment</b>

This will change the  directory into the solution folder. From here the solution can be started with the following command:

<b>sudo docker-compose up</b>

Give the soution time to boot up, afterwards use "Ctrl+Z" to  enter the terminal again. From here the  running containers can be seen by running the command:

<b>sudo docker container ls</b>

<h2>MongoDB:</h2>
A connection string is used to connect to the NotFLIX MongoDB, after a connetion has been established tests can be ran to query the database. <i>(Initally the interactions could be ran from a script, however there is a hostname error and this is another suitable option)</i>

<br>From the terminal, which is a continuation from the previous steps as solution needs to be running, run the command:

<b>docker exec -it mongoContainer mongo</b>  <i>- where mongoContainer is the localmongo1 containerID</i>

This will change the terminal into the MongoDB container where the neccassary commands can be ran to save and access data from the database. The first command is to use the correct database and is acoomplished by running:

<b>use notFlixDB;</b>

To check this has been succesful run:

<b>db</b>

This should display NotFLixDB within the terminal, which indicates the correct database is being used. To insert neccasary data the command to be run is:

<b>db.interaction.insertMany([
  { 'AccountID': 1, 'Username': 'JBanks00', 'TitleID': 001, 'UserAction': 'Play', 'DateTime': '2021-22-05', 'PointofInteraction': '00:25:30', 'TypeofInteraction': 'Play' },
]);</b>

To check the table "interaction" has been created run:

<b>show tables</b>

"Interaction" should be displayed in the terminal, then to view the records run:

<b>db.interaction.find()</b>

This should fetch the data that resides within this table, finally as part of the test steps this test data should be removed by running the command:

<b>db.interaction.drop();</b>

To exit from this container terminal use <b>Ctrl+C</b>, which will take you back to the main solution terminal.

<h2>Leader Election:</h2>

<h2>Stopping the Solution:</h2>
