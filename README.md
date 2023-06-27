# Digital Cow Hut Backend Assignment

# [cow-hut-admin-with-auth](https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-masudwebdeveloper)

# [live-link]()

#

# Admin

create admin

- api/v1/admins/create_admin (POST)

#

# Admin Auth

- api/v1/admin/login (POST)
- api/v1/admin/refesh_token (POST)

#

# User Auth

- api/v1/auth/login (POST)
- api/v1/auth/signup (POST) -> can create account buyer and seller
- api/v1/auth/refesh_token (POST)

#

# User

- api/v1/users (GET) → Can only be accessed by admin
- api/v1/users/:id (Single GET) → Can only be accessed by admin
- api/v1/users/:id (PATCH) → Can only be accessed by admin
- api/v1/users/:id (DELETE) → Can only be accessed by admin

#

# Cows

- api/v1/cows (POST) → Can only be accessed by seller
- api/v1/cows (GET) → Can only be accessed by buyer,seller & admin
- api/v1/cows/:id (Single GET) → Can only be accessed by buyer,seller & admin
- api/v1/cows/:id (PATCH) → Can only be accessed by the seller of the cow
- api/v1/cows/:id (DELETE) → Can only be accessed by the seller of the cow

#

# Orders

- api/v1/orders (POST) → Can only be accessed by the buyer
- api/v1/orders (GET) → Can be accessed only by the admin, by the specific buyer of this order & by the specific seller of this order
- api/v1/orders/:id (GET) → Can be accessed only by the admin, by the specific buyer of this order & by the specific seller of this order

#

# Profile

- api/v1/my_profile (GET) -> can accessed by the admin, seller and buyer
- api/v1/my_profile (PATCH) -> can only accessed by the seller and buyer
