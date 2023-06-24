# Digital Cow Hut Backend Assignment

# [cow-hut-admin-with-auth](https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-masudwebdeveloper)

# [live-link](https://online-cow-selling-backend-for-eid-ul-adha.vercel.app/)

#
# User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/:id (Single GET) Include an id that is saved in your database
- api/v1/users/:id (PATCH)
- api/v1/users/:id (DELETE) Include an id that is saved in your database

#

# Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/:id (Single GET) Include an id that is saved in your database
- api/v1/cows/:id (PATCH)
- api/v1/cows/:id (DELETE) Include an id that is saved in your database

#

# Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?searchTerm=Cha

#

# Orders

- api/v1/orders (POST)
- api/v1/orders (GET)

#

# User Model

- <h3>Create a New User</h3>
  <p>Router: /api/v1/auth/signup (POST)</p>
- <h3>Get All Users</h3>
  <p>Router: /api/v1/users (GET)</p>
- <h3>Get Single User</h3>
  <p>Router: /api/v1/users/:id (GET)</p>
- <h3>Update Single User</h3>
  <p>Router: /api/v1/users/:id (PATCH)</p>
- <h3>Delete User</h3>
  <p>Router: /api/v1/users/:id (DELETE)</p>

#

# Cow Model

- <h3>Create a New Cow</h3>
  <p>Router: /api/v1/cows  (POST)</p>
- <h3>Get All Cows</h3>
  <p>Route: /api/v1/cows (GET)</p>
- <h3>Get a Single Cow</h3>
  <p>Route: /api/v1/cows/:id (GET)</p>
- <h3>Update a Single Cow</h3>
  <p>Route: /api/v1/cows/:id (PATCH)</p>
- <h3>Delete a Cow</h3>
  <p>Route: /api/v1/cows/:id (DELETE)</p>

#

# Orders Model

- <h3>Implement orders</h3>
  <p>Route: /api/v1/orders (POST)</p>
- <h3>Get All Orders</h3>
  <p>Route: /api/v1/orders (GET)</p>
