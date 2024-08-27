// const { Chess } = require("chess.js");

const { convertISTToUTC } = require("../utility/util.func");

// const pgn =
//   '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2024.08.05"]\n[Round "-"]\n[White "xany_fris"]\n[Black "aniketk47"]\n[Result "0-1"]\n[CurrentPosition "5rk1/3p1ppp/4p1q1/1p6/3P4/Q4N2/B1P2PPP/R5K1 w - -"]\n[Timezone "UTC"]\n[ECO "C00"]\n[ECOUrl "https://www.chess.com/openings/French-Defense-Steinitz-Attack"]\n[UTCDate "2024.08.05"]\n[UTCTime "06:55:04"]\n[WhiteElo "557"]\n[BlackElo "581"]\n[TimeControl "60+1"]\n[Termination "aniketk47 won on time"]\n[StartTime "06:55:04"]\n[EndDate "2024.08.05"]\n[EndTime "06:57:46"]\n[Link "https://www.chess.com/game/live/116579981393"]\n\n1. e4 {[%clk 0:01:01]} 1... e6 {[%clk 0:01:00.3]} 2. e5 {[%clk 0:01:00.8]} 2... Nf6 {[%clk 0:01:01.2]} 3. exf6 {[%clk 0:01:00.7]} 3... Qxf6 {[%clk 0:01:02.1]} 4. Nf3 {[%clk 0:01:00.7]} 4... Be7 {[%clk 0:01:03]} 5. Bb5 {[%clk 0:00:59.8]} 5... O-O {[%clk 0:01:03.9]} 6. d3 {[%clk 0:00:58.7]} 6... c6 {[%clk 0:01:04.2]} 7. Ba4 {[%clk 0:00:58.4]} 7... b5 {[%clk 0:01:04.6]} 8. Bb3 {[%clk 0:00:58.5]} 8... a5 {[%clk 0:01:05]} 9. a3 {[%clk 0:00:58.4]} 9... a4 {[%clk 0:01:05.3]} 10. Ba2 {[%clk 0:00:58.5]} 10... Na6 {[%clk 0:01:03.9]} 11. O-O {[%clk 0:00:58.3]} 11... Nc5 {[%clk 0:01:01.6]} 12. Nc3 {[%clk 0:00:57.6]} 12... Ba6 {[%clk 0:00:56.9]} 13. d4 {[%clk 0:00:57.4]} 13... Nb7 {[%clk 0:00:55]} 14. Ne4 {[%clk 0:00:57.3]} 14... Qg6 {[%clk 0:00:51.9]} 15. Bg5 {[%clk 0:00:51.4]} 15... Bxg5 {[%clk 0:00:49.6]} 16. Nexg5 {[%clk 0:00:49.4]} 16... b4 {[%clk 0:00:48]} 17. axb4 {[%clk 0:00:48.1]} 17... Bxf1 {[%clk 0:00:47.7]} 18. Qxf1 {[%clk 0:00:47.3]} 18... a3 {[%clk 0:00:45.2]} 19. bxa3 {[%clk 0:00:46.8]} 19... Rxa3 {[%clk 0:00:45.3]} 20. Qc4 {[%clk 0:00:45.4]} 20... Nd6 {[%clk 0:00:42.4]} 21. Qc5 {[%clk 0:00:44]} 21... Nf5 {[%clk 0:00:37.9]} 22. b5 {[%clk 0:00:43]} 22... cxb5 {[%clk 0:00:35.9]} 23. Qxa3 {[%clk 0:00:42.5]} 23... Nh4 {[%clk 0:00:29]} 24. Nxh4 {[%clk 0:00:34.7]} 24... Qxg5 {[%clk 0:00:28.5]} 25. Nf3 {[%clk 0:00:34.2]} 25... Qg6 {[%clk 0:00:21]} 0-1\n';
// const chess = new Chess();
// chess.loadPgn(pgn);

// const board = chess.board();
// const pieceCount = {};

// board.forEach((row) => {
//   row.forEach((piece) => {
//     if (piece) {
//       const key = piece.color + piece.type.toUpperCase();
//       if (!pieceCount[key]) {
//         pieceCount[key] = 0;
//       }
//       pieceCount[key]++;
//     }
//   });
// });

// console.log("Pieces left on the board:", pieceCount);

// const curr = new Date()
// console.log(curr.getFullYear())
// const curr = new Date();

// // Set times in IST
// const startTimeUTC = new Date(curr);
// startTimeUTC.setHours(4, 0, 0, 0); // 9 AM IST
// const endTimeUTC = new Date(curr);
// endTimeUTC.setHours(7, 0, 0, 0); 

// console.log("Start Time (UTC):", startTimeUTC);
// console.log("End Time (UTC):", endTimeUTC);

const sdate = convertISTToUTC(9,0,0,0)
const edate = convertISTToUTC(13,0,0,0)
console.log(sdate , edate)