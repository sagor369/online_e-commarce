import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: any; // Adjust the type accordingly based on your authentication logic
  }
}