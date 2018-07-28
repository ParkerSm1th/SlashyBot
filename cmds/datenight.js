var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  const pickuplines = [
    'I’m no electrician, but I can light up your day.',
    'Your mom must be chicken cause you look eggcellent!',
    'Are you a time traveler? Cause I see you in my future!',
    'Roses are red, violets are blue, it would be a shame if I couldn’t date you!',
    'Are you a 45 degree angle? Because you’re acute-y!',
    'Do you drink Pepsi? Because you’re so-da-licious!',
    'My love for you is like dividing by zero. It’s undefinable.',
    'Do you like star wars? Because yoda only one for me!',
    'Do you have an inhaler? Because you took my breath away!',
    'You know what’s on the menu? ME-N-U',
    'Is your name dunkin? Because i donut want to spend another day without you',
    'Are you a keyboard? Because you’re just my type',
    'Are you the sun? Because you’re so beautiful it’s blinding me.',
    'Is your face Mcdonalds? Cause im lovin it!',
    'Are you French because Eiffel for you.',
    'Is that a mirror in your pocket? Cause I can see myself in your pants!',
    'Hey, tie your shoes! I don’t want you falling for anyone else.',
    'You must be Jamaican, because Jamaican me crazy.',
    'Somebody call the cops, because it’s got to be illegal to look that good!',
    'I must be a snowflake, because I have fallen for you.',
    'I know you are busy today, but can you add me to your to-do list?',
    'If you were a steak you would be well done.',
    'Hello, I am a thief, and I am here to steal your heart.',
    'Are you cake? Cause I want a piece of that.',
    'My love for you is like diarrhoea, I just can not hold it in.',
    'Are you lost madam? Because heaven is a long way from here.',
    'There is something wrong with my cell phone. It does not have your number in it.',
    'If you were a library book, I would check you out.',
    'If nothing lasts forever, will you be my nothing?',
    'I am new in town. Could you give me directions to your apartment?',
    'I must be in a museum, because you truly are a work of art.',
    'You spend so much time in my mind, I should charge you rent.',
    'My lips are like skittles. Wanna taste the rainbow?',
    'Life without you is like a broken pencil... pointless.',
    'Even if there wasn not gravity on earth, I would still fall for you.',
    'Roses are red, violets are blue, how would you like it if I came home with you?',
    'I wish I were cross-eyed so I can see you twice',
    'We are not socks. But I think we would make a great pair.',
    'Your lips look so lonely…Would they like to meet mine?',
    'Thank god I am wearing gloves because you are too hot to handle.',
    'Do your legs hurt from running through my dreams all night?'
  ];
  if(message.author.username == "Grace") {
    helpers.sendEmbed(message.channel, "Date Night", [
      {
        name: "-------",
        value: "You are an exception from trying to get some tips ;)"
      }
    ]);
  } else {
    var itemssss = pickuplines[Math.floor(Math.random()*pickuplines.length)];
    helpers.sendEmbed(message.channel, "Date Night", [
      {
        name: "-------",
        value: itemssss
      }
    ]);
  }
}

module.exports.help = {
  name:"datenight",
  others:["pickuplines"]
}
