const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware/auth');
const TrustedContact = require('./models/TrustedContact');

dotenv.config({ path: './.env' });

const app = express();

const PORT = 5000;

app.use(express.json());

/**---------------------------------------------------------------------------- */

//Route
app.get('/api/health', (req, res) => {
  res.send('SafeCircle Application......');
});

//Registration Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      status: 'Success',
      data: userObj,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

//Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Email not Found.',
      });
    }

    if (!(await user.checkPassword(req.body.password))) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Wrong Password',
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '90d',
    });

    res.status(201).json({
      status: 'Success',
      message: 'Login SuccessFully.',
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

//Get user Route
app.get('/api/users/me', middleware.protectedRoutes, async (req, res) => {
  try {
    const user = await User.findById(req._id);
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({
      status: 'success',
      data: userObj,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

//Update user route

app.patch('/api/users/me', middleware.protectedRoutes, async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(
      req._id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
      },
    );

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      status: 'success',
      data: userObj,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

// <-------------------TRUSTED CONTACTS ROUTE------------------------------------>

//Create trusted Contact route
app.post(
  '/api/trusted-contacts',
  middleware.protectedRoutes,
  async (req, res) => {
    try {
      const trustedContact = await TrustedContact.create({
        userId: req._id,
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        relation: req.body.relation,
        priority: req.body.priority,
        address: req.body.address,
      });

      res.status(201).json({
        status: 'success',
        data: trustedContact,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  },
);

//Get All trusted contact route.

app.get(
  '/api/trusted-contacts',
  middleware.protectedRoutes,
  async (req, res) => {
    try {
      const trustedContact = await TrustedContact.find({ userId: req._id });
      res.status(200).json({
        status: 'success',
        data: trustedContact,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  },
);

//Get the specific trusted Contact.

app.get(
  '/api/trusted-contacts/:id',
  middleware.protectedRoutes,
  async (req, res) => {
    try {
      const trustedContact = await TrustedContact.findOne({
        userId: req._id,
        _id: req.params.id,
      });
      res.status(200).json({
        status: 'success',
        data: trustedContact,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  },
);

//Update a trusted Route.

app.patch(
  '/api/trusted-contacts/:id',
  middleware.protectedRoutes,
  async (req, res) => {
    try {
      const trustedContact = await TrustedContact.findByIdAndUpdate(
        {
          userId: req._id,
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
        },
      );
      res.status(200).json({
        status: 'success',
        data: trustedContact,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  },
);

//Delete a trusted contact route.

app.delete(
  '/api/trusted-contacts/:id',
  middleware.protectedRoutes,
  async (req, res) => {
    try {
      await TrustedContact.findByIdAndDelete({
        userId: req._id,
        _id: req.params.id,
      });
      res.status(200).json({
        status: 'success',
        message: 'deleted SucessfullY',
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  },
);

/*---------------------------------------------------------------------------*/

//Database connection.
const DB = process.env.DATABASE_CONNECTION_STR.replace(
  '<PASSWORD>',
  process.env.PASSWORD,
);
mongoose
  .connect(DB)
  .then(() => {
    console.log('Database connection is Successful....');
  })
  .catch((err) => {
    console.log(`Database connection Failed \n Error: ${err.message}`);
  });

//my server
app.listen(PORT, () => {
  console.log(`SafeCircle running on port ${PORT}.`);
});
