const cron = require("node-cron");
const pLimit = require("p-limit");
const limit = pLimit(5);
const Event = require("./modals/event.model");
const {
  EASY_BULLET_CREDS,
  MEDIUM_BULLET_CREDS,
  HARD_BULLET_CREDS,
  EASY_RAPID_CREDS,
  MEDIUM_RAPID_CREDS,
  HARD_RAPID_CREDS,
  EASY_BLITZ_CREDS,
  MEDIUM_BLITZ_CREDS,
  HARD_BLITZ_CREDS,
} = require("./utility/constants");

const START_TIME = 240;
const END_TIME = 5520;

async function createRooms(cred) {
  try {
    let currentSlot = START_TIME;
    const batchSize = 100;
    let batch = [];

    while (currentSlot < END_TIME) {
      const events = await Event.find({
        title: `${cred.title}${currentSlot}`,
        startTime: currentSlot,
      });

      if (events.length === 0) {
        const event = {
          title: `${cred.title}${currentSlot}`,
          difficult: cred.difficult,
          duration: cred.duration,
          entryFee: cred.entryFee,
          firstPrize: cred.firstPrize,
          maxBounty: cred.maxBounty,
          maxMembers: cred.maxMembers,
          minMembers: cred.minMembers,
          participationDuration: cred.participationDuration,
          startTime: currentSlot,
          state: "upcoming",
          type: cred.type,
        };

        batch.push(event);

        if (batch.length >= batchSize) {
          await Event.insertMany(batch);
          console.log(`Inserted ${batch.length} rooms for ${cred.title}`);
          batch = [];
        }
      }

      currentSlot += Math.round(cred.duration);
    }

    if (batch.length > 0) {
      await Event.insertMany(batch);
      console.log(`Inserted ${batch.length} remaining rooms for ${cred.title}`);
    }

    console.log(`Completed creating ${cred.title} rooms.`);
  } catch (error) {
    console.log(`Error creating ${cred.title} rooms:`, error.message);
    throw new Error(`Error creating ${cred.title} rooms`);
  }
}

async function createAllRooms() {
  const roomConfig = [
    EASY_BULLET_CREDS,
    MEDIUM_BULLET_CREDS,
    HARD_BULLET_CREDS,
    EASY_BLITZ_CREDS,
    MEDIUM_BLITZ_CREDS,
    HARD_BLITZ_CREDS,
    EASY_RAPID_CREDS,
    MEDIUM_RAPID_CREDS,
    HARD_RAPID_CREDS,
  ];
  const promises = roomConfig.map((x) => limit(() => createRooms(x)));
  try {
    await Promise.all(promises);
    console.log("Completed creating all rooms.");
  } catch (error) {
    console.log("Error creating rooms:", error.message);
  }
}

cron.schedule("0 0 0 * * *", async () => {
  try {
    await createAllRooms();
    console.log("Successfully ran createAllRooms");
  } catch (error) {
    console.error("Error running createAllRooms:", error.message);
  }
});
