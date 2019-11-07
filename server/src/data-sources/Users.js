const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");

const { jwtSecret } = require("../../config");

const User = require("../models/user");
const ArtWork = require("../models/artWork");

class Users extends DataSource {
  constructor() {
    super();
  }

  // initialize context
  initialize(config) {
    this.context = config.context;
  }

  async registerUser(args) {
    try {
      let existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new UserInputError("This user already exists, try logging in.");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        ...args.userInput,
        password: hashedPassword
      });

      const response = await user.save();

      return { ...response._doc, password: null }; // don't return password in response
    } catch (err) {
      throw err;
    }
  }

  async loginUser(email, password) {
    try {
      // check if user exists
      const user = await User.findOne({ email: email }).populate(
        "createdArtWorks"
      );
      if (!user) {
        throw new Error("Invalid Login");
      }
      // check if passwrod matches users password
      const passwordCorrect = await bcrypt.compare(password, user.password);

      // if not throw error
      if (!passwordCorrect) {
        throw new Error("Invalid Login");
      }
      //
      const token = jwt.sign(
        {
          ...user._doc,
          password: null
          // _id: user._id,
          // email: user.email,
          // firstName: user.firstName,
          // lastName: user.lastName,
          // createdArtWorks: user.createdArtWorks
        },
        jwtSecret,
        {
          expiresIn: "30d"
        }
      );

      const response = {
        token,
        user: { ...user._doc, password: null }
      };

      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers() {
    return User.find({})
      .populate("createdArtWorks")
      .then(users => {
        return users.map(user => {
          return { ...user._doc };
        });
      })
      .catch(err => {
        throw err;
      });
  }

  async currentUser() {
    const userId = this.context.user._id;
    return User.findById(userId)
      .populate("createdArtWorks")
      .then(user => {
        return { ...user._doc };
      })
      .catch(err => {
        throw err;
      });
  }

  async getUser(id) {
    try {
      const user = await User.findById(id)
        .populate("createdArtWorks")
        .exec();
      return { ...user._doc };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Users;
