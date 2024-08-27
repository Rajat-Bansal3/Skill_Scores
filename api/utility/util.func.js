const { default: axios } = require("axios");
const { Chess } = require("chess.js");

function getTimeDifference(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1 * 1000);
  const date2 = new Date(timestamp2 * 1000);

  const difference = Math.abs(date2 - date1);

  const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  const days = Math.floor(
    (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

const filterByTime = (games, startTime, endTime) => {
  const st = convertDateToTimestamp(startTime);
  const et = convertDateToTimestamp(endTime);
  return games.filter((game) => game.end_time >= st && game.end_time <= et);
};

const getMonthlyArchives = async (username) => {
  try {
    const response = await axios.get(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    return response.data.archives;
  } catch (error) {
    console.error("Error fetching monthly archives:", error);
    return [];
  }
};

const getGamesFromArchive = async (archiveUrl) => {
  try {
    const response = await axios.get(archiveUrl);
    return response.data.games;
  } catch (error) {
    console.error("Error fetching games from archive:", error);
    return [];
  }
};

const convertUTCToIST = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  const istOffset = 5.5 * 60; // IST is UTC + 5:30
  const localTime = new Date(utcDate.getTime() + istOffset * 60 * 1000);
  return localTime;
};

const convertDateToTimestamp = (dateString) => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};

function convertTimestampToDate(ts) {
  return new Date(ts * 1000);
}

const convertISTToUTC = (hours, minutes = 0, seconds = 0, milliseconds = 0) => {
  // Create a Date object for the current date
  const curr = new Date();

  // Set the time to the provided IST time
  const istDate = new Date(curr);
  istDate.setHours(hours, minutes, seconds, milliseconds);

  // Convert the IST time to UTC
  const utcDate = new Date(istDate.getTime() - (5 * 60 + 30) * 60 * 1000);

  return utcDate;
};

//main func

const pointsFNC = (pieces, color) => {
  const values = {
    wP: 1, // White Pawn
    bP: 1, // Black Pawn
    wN: 3, // White Knight
    bN: 3, // Black Knight
    wB: 3, // White Bishop
    bB: 3, // Black Bishop
    wR: 5, // White Rook
    bR: 5, // Black Rook
    wQ: 9, // White Queen
    bQ: 9, // Black Queen
    wK: 0, // White King
    bK: 0, // Black King
  };

  let totalPoints = 0;
  for (const piece in pieces) {
    // Check if the piece belongs to the specified color
    if (piece.startsWith(color)) {
      totalPoints += pieces[piece] * values[piece];
    }
  }

  return totalPoints;
};

const pngToPoints = (pgn, username) => {
  const chess = new Chess();
  const currColor = chess.header().White === username ? "w" : "b";
  chess.loadPgn(pgn);

  const board = chess.board();
  const pieceCount = {};

  board.forEach((row) => {
    row.forEach((piece) => {
      if (piece) {
        const key = piece.color + piece.type.toUpperCase();
        pieceCount[key] = (pieceCount[key] || 0) + 1;
      }
    });
  });
  const finalPoints = pointsFNC(pieceCount, currColor);
  return finalPoints;
};

module.exports = {
  getTimeDifference,
  filterByTime,
  getMonthlyArchives,
  getGamesFromArchive,
  convertUTCToIST,
  convertDateToTimestamp,
  convertTimestampToDate,
  convertISTToUTC,
  pngToPoints,
};
