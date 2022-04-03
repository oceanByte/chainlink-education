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

const Course = mongoose.model('Course', courseSchema)

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
    for (course of COURSES) {
      const payload = {
        title: course.title,
        description: course.description,
        difficulty: course.difficulty,
        progress: user.progress ? user.progress : [],
        chapterTimes: user.progress ? new Array(user.progress.length).fill({ chapter: course.title, time: -1 }) : [],
        status: user.progress.length < 7 ? 'IN PROGRESS' : 'COMPLETED',
        userId: mongoose.mongo.ObjectId(user._id)
      }

      const newCourse = new Course(payload)
      console.log(user._id)
      // 3 store entries
      await newCourse.save()

    }
  }
}

main()
