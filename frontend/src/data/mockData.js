// src/data/mockData.js

// Mock data for events
export const MOCK_EVENTS = [
    { id: 'e1', title: 'Annual Tech Summit 2025', date: '2025-10-20', capacity: 200, registered: 155, status: 'Open' },
    { id: 'e2', title: 'Data Science Workshop', date: '2025-11-05', capacity: 50, registered: 48, status: 'Filling' },
    { id: 'e3', title: 'Startup Pitch Competition', date: '2025-12-15', capacity: 100, registered: 100, status: 'Closed' },
];

// Mock data for the current user (student)
export const MOCK_USER_ID = 'Q12345678';
export const MOCK_USER = {
    id: MOCK_USER_ID,
    name: 'Jane Doe (Student)',
    email: 'jane.doe@qu.edu',
    registeredEvents: ['e1'], // Student is registered for Tech Summit
};