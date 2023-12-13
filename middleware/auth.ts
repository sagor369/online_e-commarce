import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const secretKey: string = 'your-secret-key';

const authenticateToken = (handler: (req: NextApiRequest, res: NextResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextResponse) => {
    const token = req.headers.authorization;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, {status: 401});
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return NextResponse.json({ error: 'Invalid token' }, {status: 403});
      }

      req.user = user;
      return handler(req, res);
    });
  };
};

export { authenticateToken };
