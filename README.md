Introduction This is an E-commerce platform designed to provide a seamless shopping experience for users. The application includes functionalities such as product browsing, filtering by categories and attributes, adding products to a cart, and processing orders.
Features:
User Authentication and Authorization Product Listing and Search Filtering by Audiences, Companies, Categories, Subcategories, Price range, Sizes, and Colors 
Shopping Cart Management Order Processing 
Responsive Design for Desktop and Mobile Devices Technologies Used

Frontend: 
React TypeScript Material-UI,
Tailwind CSS,
React-Router-DOM,
React-Responsive-Carousel,
react-select

.env example:

ENVIRONMENT = "development" or "production"

PORT = 4000

MONGODB_CONNECTION_STRING = "mongodb://127.0.0.1:27017/brands-store" 

JWT_SECRET_KEY = <Choose your JWT_SECRET_KEY>
PASSWORD_SALT = "<Choose your password salt>"

BASE_CLOTH_IMAGE_URL = "http://localhost:4000/api/brands/images/cloth-images/"
BASE_SHOE_IMAGE_URL = "http://localhost:4000/api/brands/images/shoe-images/"
BASE_ACCESSORY_IMAGE_URL = "http://localhost:4000/api/brands/images/accessory-images/"
BASE_CATEGORY_IMAGE_URL = "http://localhost:4000/api/brands/images/category-images/"
BASE_COMPANY_IMAGE_URL = "http://localhost:4000/api/brands/images/company-images/"


Backend:
Node.js,
Express,
MongoDB with Mongoose

State Management: Redux



