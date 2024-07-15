const { PrismaClient } = require('@prisma/client')
const http = require('http')
const randomDate = require('random-date-generator');



const server = http.createServer()
const prisma = new PrismaClient()


const ScreenNames = [
    'Scheduler',
    'Check In',
    'Lab',
    'Check Out',
    'Visit Note',
    'Charge Posting',
    'Claim',
    'Payment Posting',
    'System Parameters',
    'User Parameters',
    'Patient Master',
    'Insurance Master',
    'Auth/Ref Tracking',
    'Opthomology',
    'Embryology',
    'Immunotherapy',
    'Office Master'
]



const UserNames = [
    'Yash Patel',
    'Cristiano Ronaldo',
    'Lionel Messi',
    'Robert Dowy Junior',
    'Roronoa Zoro',
    'Monkey Luffy',
    'Marcus Rashford',
    'Bruno Fernandez',
    'Manager Patel',
    'Lead Gondaliya'
]

async function generateRandomEntry() {
    const screen = ScreenNames[Math.floor(Math.random() * ScreenNames.length)];
    const user = UserNames[Math.floor(Math.random() * UserNames.length)]

    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - 730);

    const startingDateTime = randomDate.getRandomDateInRange(past, now)
    const duration = Math.floor(600000 + Math.random() * 3000000)
    const endingDateTime = new Date(startingDateTime.getTime() + duration)

    try {
        await prisma.screenActivity.create({
            data: {
                username: user,
                screenName: screen,
                startingDatetime: startingDateTime,
                endingDatetime: endingDateTime
            }
        })
        console.log(`Inserted activity for ${user} on screen ${screen} from ${startingDateTime.toISOString()} to ${endingDateTime.toISOString()}`);

    } catch (e) {
        console.log(e, "error from prisma db")
    }
}

//schedule the task to run every minute
//setInterval(generateRandomEntry, 60000)

const generator = async () => {

    for (var i = 0; i < 20000; i++) {
        await generateRandomEntry()
    }
}


generator()

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down...');
    await prisma.$disconnect();
    process.exit();
});

process.on('SIGTERM', async () => {
    console.log('Shutting down...');
    await prisma.$disconnect();
    process.exit();
});

server.listen(8000, () => {
    console.log("Server of Data worker is running on the port 8000")
})