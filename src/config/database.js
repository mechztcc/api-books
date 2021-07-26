module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "api-books",
  define: {
    timestamps: true,
    underscored: true,
  },
};
