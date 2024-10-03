# Planpal - Collaborative Travel Planning Application

**Technologies:** Angular | Node.js | Express | PostgreSQL | Socket.IO | Google Maps API | Stripe | Google OAuth 2.0

Planpal is a full-stack collaborative travel planning application designed to simplify group travel coordination. Users can create and manage trips, view events on an interactive map, and collaborate in real-time with other travelers. The app includes premium features, such as smart recommendations and payment management, using third-party integrations like Google Maps API and Stripe.

## Features

- **Google OAuth 2.0 Authentication:** Users can log in with their Google accounts to securely access the platform.
- **Google Maps Integration:** Create and manage trips with events displayed on Google Maps using the Google Maps API.
- **Real-time Collaboration:** Built using Socket.IO, Planpal allows multiple users (over 50 simultaneously) to view and edit a shared calendar in real-time.
- **Premium Features with Stripe:** Integrated Stripe webhooks for premium feature payments, such as smart recommendations based on trip location using the Google Places API.
- **Interactive Calendar:** Collaborators can edit and view trip events in real-time on a shared calendar.

## Demo

Check out a live demo of Planpal [here](#).

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/planpal.git
    ```

2. **Install dependencies for both the backend and frontend:**

    ```bash
    # Navigate to backend and install dependencies
    cd backend
    npm install

    # Navigate to frontend and install dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in both the `backend` and `frontend` directories with the following variables:

### Backend (`/backend/.env`)

    ```bash
    PORT=3000
    DB_HOST=your-db-host
    DB_USER=your-db-user
    DB_PASSWORD=your-db-password
    DB_NAME=your-db-name
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    STRIPE_SECRET_KEY=your-stripe-secret-key
    STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
    ```

### Frontend (`/frontend/.env`)

    ```bash
    REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
    REACT_APP_API_URL=http://localhost:3000
    ```

4. **Run the application:**

    Start both the frontend and backend servers.

    ```bash
    # Run the backend
    cd backend
    npm start

    # Run the frontend
    cd frontend
    npm start
    ```

5. **Navigate to the app:**

    Open your browser and go to `http://localhost:3000` to start using Planpal.

## API Endpoints

- **POST /api/trips:** Create a new trip.
- **GET /api/trips:** Get a list of all trips.
- **POST /api/trips/:id/events:** Add events to a trip.
- **GET /api/trips/:id/events:** Retrieve events for a specific trip.
- **POST /api/stripe/webhook:** Stripe webhook endpoint for handling payments.

## Tech Stack

- **Frontend:** Angular, Google Maps API
- **Backend:** Node.js, Express, Socket.IO
- **Database:** PostgreSQL
- **Authentication:** Google OAuth 2.0
- **Payments:** Stripe (with webhooks)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions

Feel free to submit a pull request or open an issue for suggestions, bugs, or improvements.
