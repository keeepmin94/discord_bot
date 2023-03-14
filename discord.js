const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content === "야") {
    await message.channel.send("왜");
  }

  if (message.content === "주사위") {
    dice_list = [
      ":game_die: :one: ",
      ":game_die: :two: ",
      ":game_die: :three: ",
      ":game_die: :four: ",
      ":game_die: :five: ",
      ":game_die: :six: ",
    ];
    random_Num = Math.round(Math.random() * 5);
    await message.channel.send(dice_list[random_Num]);
  }

  if (message.content === "임베드") {
    embed = new Discord.MessageEmbed()
      .setTitle("title")
      .setDescription("description")
      .setColor(0xffff)
      .setThumbnail(message.author.displayAvatarURL())
      .addField("필드제목", "필드내용");
    await message.channel.send(embed);
  }

  if (message.content === "!react") {
    message.react("👊");
  }

  if (message.content === "!react2") {
    react = await message.channel.send("이모지 반응");
    react.react("😀");
    react.react("😎");
    react.react("😍");

    const filter = (reaction, user) => {
      return (
        ["😀", "😎", "😍"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    const collector = react.createReactionCollector(filter, { max: 1 });

    collector.on("collect", (reaction) => {
      message.channel.send("test");
    });
  }

  if (message.content === "가위바위보") {
    embed = new Discord.MessageEmbed().setDescription(
      "안내면 진 거! 가위바위보!"
    );
    rsp = await message.channel.send(embed);
    rsp.react("👊");
    rsp.react("✌");
    rsp.react("✋");

    rsp_list = ["👊", "✌", "✋"];
    random_Num = Math.round(Math.random() * 2);

    const filter = (reaction, user) => {
      return (
        rsp_list.includes(reaction.emoji.name) && user.id === message.author.id
      );
    };

    const collector2 = rsp.createReactionCollector(filter, { max: 1 });

    collector2.on("collect", (reaction) => {
      if (reaction.emoji.name === rsp_list[random_Num]) {
        embed = new Discord.MessageEmbed()
          .setTitle(`나 : ${reaction.emoji.name} DRAW!`)
          .setDescription(`봇 : ${rsp_list[random_Num]}`);
      } else {
        if (reaction.emoji.name === "👊") {
          if (rsp_list[random_Num] === "✌") {
            embed = new Discord.MessageEmbed()
              .setTitle(`나 : ${reaction.emoji.name} You Win!`)
              .setDescription(`봇 : ${rsp_list[random_Num]}`);
          } else if (rsp_list[random_Num] === "✋") {
            embed = new Discord.MessageEmbed()
              .setTitle(`나 : ${reaction.emoji.name} You Lose!`)
              .setDescription(`봇 : ${rsp_list[random_Num]}`);
          }
        } else if (reaction.emoji.name === "✌") {
          if (rsp_list[random_Num] === "✋") {
            embed = new Discord.MessageEmbed()
              .setTitle(`나 : ${reaction.emoji.name} You Win!`)
              .setDescription(`봇 : ${rsp_list[random_Num]}`);
          } else if (rsp_list[random_Num] === "👊") {
            embed = new Discord.MessageEmbed()
              .setTitle(`나 : ${reaction.emoji.name} You Lose!`)
              .setDescription(`봇 : ${rsp_list[random_Num]}`);
          }
        } else if (reaction.emoji.name === "✋") {
          if (rsp_list[random_Num] === "👊") {
            embed = new Discord.MessageEmbed()
              .setTitle(`나 : ${reaction.emoji.name} You Win!`)
              .setDescription(`봇 : ${rsp_list[random_Num]}`);
          } else if (rsp_list[random_Num] === "✌") {
            embed = new Discord.MessageEmbed()
              .setTitle(`나 : ${reaction.emoji.name} You Lose!`)
              .setDescription(`봇 : ${rsp_list[random_Num]}`);
          }
        }
      }
      rsp.edit(embed);
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
