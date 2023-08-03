# Group Alliance Travel Tickets Platform - React.js Project

![Group Alliance Logo](https://example.com/path-to-logo.png)

Welcome to the Group Alliance Travel Tickets Platform project! This repository contains a React.js web application designed for commercial usage, serving as a platform for booking tickets for traveling abroad.

## Project Description

The Group Alliance Travel Tickets Platform addresses the client's challenge of managing seat reservations on their six buses. With people fighting for seats due to vague phone reservations, the platform aims to ensure passengers occupy pre-purchased seats without any conflicts. The main objective is to allow the client to manage routes, book and cancel reservations, update passenger profiles, and handle refund requests conveniently from their mobile phone.

## Functionality for Administrators

### Adding and Managing Routes

- Add new routes with details such as route name, driver name, and phone number.
- Define departure locations, including country, city, gathering point, time, and date.
- Add intermediate stops with relevant information like country, city, gathering point, time, date, and ticket prices for adults and children.
- Specify arrival details, including country, city, gathering point, time, date, and ticket prices for adults and children.
- After arrival, routes become inactive but can be edited and reactivated to avoid repetitive data entry. Two options are provided for changes in routes:
  - Modify the route while keeping existing reservations active (to alert passengers of changes).
  - Change the date and time, clearing all existing reservations to start anew.

### Route Management

- View a list of created routes and select a route to manage.
- Display a bus seat layout with seat numbers (e.g., 1, 2, 3), highlighting taken seats in red and available seats in white.
- Two buttons, "Book" and "Cancel Reservation," appear below the seat layout to allow administrators to reserve or cancel seats as needed.
- Reservation: Click on an available seat to book it, and the passenger details will show "Admin" instead of passenger information.
- Cancel Reservation: Click on a reserved seat to remove the reservation, making the seat available for booking again.
- Display a list of passengers who have booked tickets for a specific route, showing their names, surnames, phone numbers, and ticket numbers.

### Client Management

- Access a list of clients and edit their information as required.

### Refund Ticket List

- View a list of ticket refund requests, including the reserved ticket information and passenger data.

## Passenger Functionality

### Client Registration and Login

- Clients can register themselves using their email and log in to their accounts.

### Ticket Booking

- Clients can browse and book tickets.
- If booking multiple seats, they must provide the names and surnames of passengers for each seat.
- During booking, clients can opt to create an account, which automatically generates a username (email) and password (phone number).
- Clients receive an email confirmation with their booked trip details and access to their account.

### My Reservations

- Clients can view their booked tickets under "My Reservations" in their account.
- Two buttons, "Contact the Driver" and "Cancel Reservation," appear below each reservation.
- "Contact the Driver" initiates a call to the driver with the phone number +380.
- "Cancel Reservation" allows clients to cancel their reservations, removing the seats from the route.
- After completion of the route, reservations are marked as "Completed" and no longer allow contact or cancellations.
- If a client cancels a reservation, the status displays as "Canceled."

## Search Functionality

- If the departure location is selected as Ukraine, only Italy or France will be offered as destination options, and vice versa.

## Additional Details

For further project specifications and a more detailed description, please refer to the [Figma Design](https://www.figma.com/file/LhxhTOJEiW7KIYU8AbR3xe/%D0%A4%D0%98%D0%9D%D0%98%D0%A8?type=design&node-id=0%3A1&mode=design&t=j0vK3dP8QXIjon04-1) provided by the client.

## Contact

For any inquiries or further information, please contact us at kindratvictor07@gmail.com.

Thank you for your interest in the Group Alliance Travel Tickets Platform. Happy traveling! 🌍✈️
