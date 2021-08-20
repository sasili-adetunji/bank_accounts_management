## Bank Account Management API
This is a bank accounts management REST API that allows management of users bank accounts and transactions.

- A customer signs up with their name, email, and password, a unique 10-digit account number is provisioned and tied to their account upon successful registration.
- A single customer can decide to open additional bank accounts but can only have a maximum of 4 accounts and a minimum of 1 bank account at any time.
- Search for other account holders using only their 10-digit account number.
- Ability to send and receive funds to and from other users.
Retrieving of transaction history.

### Prerequisite

- Nodejs
- MongoDB

### Set Up

Clone the app with 

```
git clone https://github.com/sasili-adetunji/bank_accounts_management.git
```

Change into the directory with 
```
cd bank_accounts_management
```

Change the contents of `sample.env` into `.env`

```
cp sample.env > .env
```
Install the dependecies with

```
npm install
```

Ensure your mongodb server is running

Start the server with 

```
npm start
```

### Testing

```
npm run test
```


### API

The API is available at https://bank-account-management.herokuapp.com/

The documentation can be found at https://documenter.getpostman.com/view/1864669/TzzBrG5C