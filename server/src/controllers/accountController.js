const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accountModel = require("../models/accountModel");

const JWT_SECRET = "fastfoodqazplmwsxoknijbuhvtgcrfedy";

const accountController = {
  selectAccount: (req, res) => {
    accountModel.select((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  updateAccount: async (req, res) => {
    const { id, fullname, username, email, password, phone, role } = req.body;
    const data = { id, fullname, username, email, password, phone, role };
    const saltRounds = 10;

    try {
      accountModel.findById(id, async (err, existingAccount) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (password !== existingAccount.password) {
          data.password = await bcrypt.hash(password, saltRounds);
        } else {
          data.password = existingAccount.password;
        }

        accountModel.edit(data, (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(results);
        });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const { fullname, username, email, phone, password, role } = req.body;
      const data = { fullname, username, email, phone, password, role };
      // Hash the password
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);

      const result = await accountModel.register(data);
      return res
        .status(201)
        .json({ message: "Account created successfully", data: result });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({
        message: "An error occurred during registration",
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const account = await accountModel.login({ username });

      if (!account) {
        return res.status(400).json({ message: "Account not found" });
      }

      const isPassword = await bcrypt.compare(password, account.password);
      if (!isPassword) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      const token = jwt.sign(
        {
          id: account.id,
          username: account.username,
          role: account.role,
          fullname: account.fullname,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        message: "An error occurred during login",
        error: error.message,
      });
    }
  },
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.account = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  },
  getInfo: async (req, res) => {
    try {
      const username = req.account.username; // Use the username from the decoded token
      const account = await accountModel.getInfo(username);
      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }
      return res.status(200).json(account);
    } catch (error) {
      console.error("Error during get info:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  },
  deleteAccount: (req, res) => {
    const id = req.query.id;

    accountModel.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
};

module.exports = accountController;
