const Benchmark = require('benchmark');
const { getUsergames } = require("../controllers/chess.controller");

// Mocking dependencies if needed
// You might want to use libraries like `nock` to mock API calls or manually mock data

// Define the Benchmark Suite
const suite = new Benchmark.Suite;

// Define your mock data and functions
const mockRequest = {
  query: {
    username: "testuser",
    startTime: new Date().toISOString(),
    endTime: new Date(new Date().setHours(new Date().getHours() + 3)).toISOString(),
    type: "blitz"
  }
};

// Define the benchmarking tests
suite
  .add('Benchmark getUsergames', {
    defer: true,
    fn: async (deferred) => {
      await getUsergames(mockRequest, null, null);
      deferred.resolve();
    }
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });
