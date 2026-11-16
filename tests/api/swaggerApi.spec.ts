
import { test, expect } from '@playwright/test';

const baseUrl = 'https://petstore3.swagger.io/api/v3';

test('Login, create user, and validate user', async ({ request }) => {
  // Step 1: Login
  const loginResponse = await request.get(`${baseUrl}/user/login`, {
    params: {
      username: 'Asif',
      password: 'Asif123'
    }
  });

  expect(loginResponse.status()).toBe(200);

  const loginText = await loginResponse.text();
  console.log('Login response:', loginText);

  // Step 2: Extract session ID
  const sessionId = loginText
    .replace('Logged in user session: ', '')
    .trim();

  expect(sessionId).not.toBe('');
  console.log('Session ID:', sessionId);

  // Step 3: Create a user
  const username = `asif_${Date.now()}`;

  const userData = {
    id: Date.now(),
    username,
    firstName: 'Asif',
    lastName: 'Test',
    email: `${username}@example.com`,
    password: 'TestPass123',
    phone: '1234567890',
    userStatus: 1
  };

  const createResponse = await request.post(`${baseUrl}/user`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    data: userData
  });

  console.log('Create status:', createResponse.status());
  console.log('Create response:', await createResponse.text());

  expect(createResponse.status()).toBe(200);

  // Step 4: Retrieve the created user
  const getResponse = await request.get(
    `${baseUrl}/user/${encodeURIComponent(username)}`
  );

  console.log('Get user status:', getResponse.status());

  expect(getResponse.status()).toBe(200);

  const userResponse = await getResponse.json();
  expect(userResponse.username).toBe(username);
  expect(userResponse.email).toBe(userData.email);
});
