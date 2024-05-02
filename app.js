//Used ShortId for generating random short id
const shortId = require("shortid");

const URL = require("./models/url");

//Creating Express App
const express = require("express");
const app = express();

//Setting Up Mongoose(ODM)
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/discordBot").then(() => {
  console.log("MongoDB connected");
});

// Creating Discord client
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// client.on("messageCreate", (message) => {
//   if (message.author.bot) return;
//   console.log(message.content);
//   message.reply({
//     content: "Hello from Bot",
//   });
// });

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create ")[1];
    const shortUrlId = shortId(url);
    URL.create({
      shortId: shortUrlId,
      originalUrl: url,
    });

    return message.reply({
      content: "Shortened Url: http://localhost:3000/" + shortUrlId,
    });
  }
});

//Handling Redirecting URLs
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId: shortId });
  res.redirect(entry.originalUrl);
});

//Setting Discord client login and token
client.login(
  "MTIzNDg0Mjg4MzAzOTk1NzA5NA.GsArjZ.-LE51caU8SNUhnms8PIaMUKy9Z6vjYMSoy5xl8"
);

//Starting express server
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
