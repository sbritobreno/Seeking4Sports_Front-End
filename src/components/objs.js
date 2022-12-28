const sportsOptions = ["Football", "VoleyBall", "Basketball"];
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday",
];

const username = [
  {
    id: "1",
    name: "Breno",
    phone: "+123 123 123",
    email: "breno.sport@hotmail.com",
    username: "sbritobreno",
    password: "123",
    image:
      "https://i.stack.imgur.com/l60Hf.png",
  },
  {
    id: "2",
    name: "Jeff",
    phone: "+123 123 124",
    email: "jeff.sport@hotmail.com",
    username: "jefflima",
    password: "123",
    image:
      "https://i.stack.imgur.com/l60Hf.png",
  },
];

const sports = [
  {
    id: "1",
    host: "jefflima",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    sport: "Voleyball",
    date: "Thrusday",
    time: "19:00",
    location: "Dublin 7",
    members: [{ user: "sbritobreno" }, { user: "jefflima" }],
    total_players: 10,
    description: "That's is a short description about this activity",
  },
  {
    id: "2",
    host: "jefflima",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    sport: "Voleyball",
    date: "Thrusday",
    time: "19:00",
    location: "Dublin 7",
    members: [{ user: "sbritobreno" }, { user: "jefflima" }],
    total_players: 10,
    description: "That's is a short description about this activity",
  },
  {
    id: "3",
    host: "sbritobreno",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    sport: "Voleyball",
    date: "Thrusday",
    time: "19:00",
    location: "Dublin 7",
    members: [{ user: "sbritobreno" }, { user: "jefflima" }],
    total_players: 10,
    description: "That's is a short description about this activity",
  },
  {
    id: "4",
    host: "sbritobreno",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    sport: "Football",
    date: "Thrusday",
    time: "19:00",
    location: "Dublin 7",
    members: [{ user: "sbritobreno" }, { user: "jefflima" }],
    total_players: 10,
    description: "That's is a short description about this activity",
  },
  {
    id: "5",
    host: "sbritobreno",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    sport: "Football",
    date: "Thrusday",
    time: "19:00",
    location: "Dublin 7",
    members: [{ user: "sbritobreno" }, { user: "jefflima" }],
    total_players: 10,
    description: "That's is a short description about this activity",
  },
  {
    id: "6",
    host: "sbritobreno",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    sport: "Football",
    date: "Thrusday",
    time: "19:00",
    location: "Dublin 7",
    members: [{ user: "sbritobreno" }, { user: "jefflima" }],
    total_players: 10,
    description: "That's is a short description about this activity",
  },
];

export { sports, username, sportsOptions, weekdays };
