const axios = require("axios");
const { responseHandler } = require("../utility/err");
const {
  getMonthlyArchives,
  getGamesFromArchive,
  filterByTime,
  convertDateToTimestamp,
  pngToPoints,
} = require("../utility/util.func");

exports.getUserInfo = async (req, res, next) => {
  const { username } = req.query;
  if (!username) {
    return responseHandler(
      res,
      400,
      null,
      "Username query parameter is required"
    );
  }

  try {
    const response = await axios.get(
      `https://api.chess.com/pub/player/${username}`
    );
    return responseHandler(
      res,
      200,
      response.data,
      "User Profile Data Fetched Successfully"
    );
  } catch (error) {
    console.error("Error fetching player profile:", error);

    if (error.response) {
      return responseHandler(
        res,
        error.response.status,
        null,
        `Failed to fetch user profile: ${error.response.data.message}`
      );
    } else if (error.request) {
      return responseHandler(
        res,
        500,
        null,
        "Failed to fetch user profile: No response received from server"
      );
    } else {
      return responseHandler(
        res,
        500,
        null,
        `Failed to fetch user profile: ${error.message}`
      );
    }
  }
};
exports.getUserStats = async (req, res, next) => {
  const { username } = req.query;
  if (!username) {
    return responseHandler(
      res,
      400,
      null,
      "Username query parameter is required"
    );
  }

  try {
    const response = await axios.get(
      `https://api.chess.com/pub/player/${username}/stats`
    );
    return responseHandler(
      res,
      200,
      response.data,
      "User Profile stats Fetched Successfully"
    );
  } catch (error) {
    console.error("Error fetching player stats:", error);

    if (error.response) {
      return responseHandler(
        res,
        error.response.status,
        null,
        `Failed to fetch user stats: ${error.response.data.message}`
      );
    } else if (error.request) {
      return responseHandler(
        res,
        500,
        null,
        "Failed to fetch user stats: No response received from server"
      );
    } else {
      return responseHandler(
        res,
        500,
        null,
        `Failed to fetch user profile: ${error.message}`
      );
    }
  }
};
// exports.getUsergames = async (req, res, next) => {
//   const {
//     username,
//     startTime = new Date(),
//     endTime = new Date(new Date().setHours(new Date().getHours() + 3)),
//     type,
//   } = req.query;

//   try {
//     const curr = new Date();
//     const month = String(curr.getMonth() + 1).padStart(2, "0");

//     let games = await getGamesFromArchive(
//       `https://api.chess.com/pub/player/${username}/games/${curr.getFullYear()}/${month}`
//     );

//     if (!games || games.length === 0) {
//       return responseHandler(
//         res,
//         404,
//         null,
//         "No games found for the specified period"
//       );
//     }

//     games = games.filter((game) => game.time_class === type);
//     const gamesInTimeRange = filterByTime(games, startTime, endTime);

//     let points = 0;

//     gamesInTimeRange.forEach((game) => {
//       points += pngToPoints(game.pgn);
//       if (game.white.username === username) {
//         if (game.white.result === "win") {
//           points += 20;
//           console.log(`${username} played as White and won. Points: ${points}`);
//         } else if (game.white.result === "lost") {
//           console.log(
//             `${username} played as White and lost. Points: ${points}`
//           );
//         }
//       } else if (game.black.username === username) {
//         if (game.black.result === "win") {
//           points += 20;
//           console.log(`${username} played as Black and won. Points: ${points}`);
//         } else if (game.black.result === "lost") {
//           console.log(
//             `${username} played as Black and lost. Points: ${points}`
//           );
//         }
//       }
//     });

//     return responseHandler(
//       res,
//       200,
//       { games: gamesInTimeRange, points },
//       "Filtered games fetched successfully"
//     );
//   } catch (error) {
//     console.error("Error fetching filtered games:", error);
//     return responseHandler(
//       res,
//       error.response ? error.response.status : 500,
//       null,
//       "Error fetching filtered games"
//     );
//   }
// };
exports.getUsergames = async (req, res, next) => {
  const {
    username,
    startTime = new Date(),
    endTime = new Date(new Date().setHours(new Date().getHours() + 3)),
    type,
  } = req.query;

  try {
    const curr = new Date();
    const month = String(curr.getMonth() + 1).padStart(2, "0");

    let games = await getGamesFromArchive(
      `https://api.chess.com/pub/player/${username}/games/${curr.getFullYear()}/${month}`
    );

    if (!games || games.length === 0) {
      return responseHandler(
        res,
        404,
        null,
        "No games found for the specified period"
      );
    }

    games = games.filter((game) => game.time_class === type);
    const gamesInTimeRange = filterByTime(games, startTime, endTime);

    let points = 0;
    const uniqueOpponents = new Set();
    const filteredGames = [];

    gamesInTimeRange.forEach((game) => {
      const opponent =
        game.white.username === username
          ? game.black.username
          : game.white.username;
      console.log(opponent);

      if (!uniqueOpponents.has(opponent)) {
        uniqueOpponents.add(opponent);
        filteredGames.push(game);

        points += pngToPoints(game.pgn);
        if (game.white.username === username) {
          if (game.white.result === "win") {
            points += 20;
            console.log(
              `${username} played as White and won. Points: ${points}`
            );
          } else if (game.white.result === "lost") {
            console.log(
              `${username} played as White and lost. Points: ${points}`
            );
          }
        } else if (game.black.username === username) {
          if (game.black.result === "win") {
            points += 20;
            console.log(
              `${username} played as Black and won. Points: ${points}`
            );
          } else if (game.black.result === "lost") {
            console.log(
              `${username} played as Black and lost. Points: ${points}`
            );
          }
        }
      }
    });

    return responseHandler(
      res,
      200,
      { games: filteredGames, points },
      "Filtered games fetched successfully"
    );
  } catch (error) {
    console.error("Error fetching filtered games:", error);

    return responseHandler(
      res,
      error.response ? error.response.status : 500,
      null,
      "Error fetching filtered games"
    );
  }
};
