import * as randomstring from 'randomstring'
import {Certificate, CertificateModel} from '../shared/certificate/Certificate';

import { Course, CourseModel } from '../shared/course/Course';
import { COURSES, CourseStatusType, CourseTitleType } from '../shared/course/CourseType';
import { User } from '../shared/user/User'

interface IGetCourses {
  user: User
}

export const getCourses = async ({ user }: IGetCourses) => {
  let courses = await CourseModel.find({ userId: user._id }).lean();

  if (!courses.length) {
		for (const course of COURSES) {
			await CourseModel.create<Course>({
				userId: user._id,
				title: course.title,
				description: course.description,
				difficulty: course.difficulty,
				status: course.status
			} as Course)
		}

    const findUserCourse = await CourseModel.findOne({
			_id: user._id,
      title: CourseTitleType.CHAINLINK_101,
    }).lean();

    const completedCourse = await CourseModel.findOne({
      title: CourseTitleType.CHAINLINK_101,
      status: CourseStatusType.COMPLETED
    }).lean();

    let progress = 0;

    if (completedCourse) {
      progress = completedCourse.progress.length
    }

    const getStatus = (userProgress: number) => {

      if (completedCourse && userProgress === progress) {
        return CourseStatusType.COMPLETED
      } else if (userProgress > 0) {
        return CourseStatusType.IN_PROGRESS
      }

      return CourseStatusType.NEW
    }

    const userProgress = user && user.progress && user.progress.length || 0
		const status = getStatus(userProgress)

    if (status === CourseStatusType.COMPLETED) {

			const code = randomstring.generate({length: 62, charset: 'hex'});
	
			await CertificateModel.create<Certificate>({
				coursePath: "chainlinkIntroduction",
				username: user.username,
				userId: user._id,
				courseId: findUserCourse?._id || '',
				code: `0x${code}`
			})
		}

		await CourseModel.updateOne(
			{ userId: user._id, title: CourseTitleType.CHAINLINK_101 },
			{ $set: {
				progress: user.progress,
				status
			}
			})
			.exec();

		courses = await CourseModel.find({ userId: user._id }).lean();
	}

  return courses;
}