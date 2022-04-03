const mongoose = require('mongoose');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_URL);

const User = mongoose.model('User', {
  username: String,
  name: String,
  email: String,
  hashedPassword: String,
  progress: Array,
  createdAt: Date,
  updatedAt: Date,
  courses: Array
})

const courseSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    progress: Array,
    chapterTimes: Array,
    status: String,
    difficulty: Number,
    userId: mongoose.Types.ObjectId
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema )

const COURSES = [
  {
    title: 'Chainlink 101',
    description: `Chainlink decentralized oracle networks provide tamper-proof inputs, outputs, and computations.`,
    difficulty: 2,
    status: 'NEW',
    progress: [],
  },
  {
    title: 'Solidity Introduction',
    description: `Solidity is an object-oriented, high-level language for implementing smart contracts. Learn about the basics here.`,
    difficulty: 3,
    status: 'New',
    progress: [],
  },
  {
    title: 'VRF v2 Introduction',
    description: `Study how VRF can be used to bring Verfiable Randomness to blockchain.`,
    difficulty: 3,
    status: 'New',
    progress: [],
  },
]

async function main() {
  // 1 get all users
  const users = await User.find({});
  // 2 create one new entry per course for each user (there is only chainlink101 atm)
  for (user of users) {
    if (!user?.progress || user?.progress?.length === 0) {
      continue
    }

    const payload = {
      title: COURSES[0].title,
      description: COURSES[0].description,
      difficulty: 2,
      progress: user.progress,
      chapterTimes: new Array(user.progress.length).fill(-1),
      status: user.progress.length < 7 ? 'IN PROGRESS' : 'COMPLETED',
      userId: mongoose.mongo.ObjectId(user._id)
    }

    console.log(payload)

    const course = new Course(payload)
    // 3 store entries
    await course.save()
  }
}

main()
