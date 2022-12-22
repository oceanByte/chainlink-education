import { ObjectId } from 'mongodb';

import { Course, CourseModel } from '../shared/course/Course';
import { CourseTitleType, GROUPS } from '../shared/course/CourseType';

interface ICourses {
  courses: Course[],
	userId: ObjectId
}

export const createGroups = async ({ courses, userId }: ICourses) => {

	const addSubjectToCourse = async (course: Course) => {
		const { title, _id } = course;

		for (const { subject, courses } of GROUPS) {
			const findCourse = courses.includes(title as CourseTitleType);

			if (findCourse) {
				await CourseModel.updateOne(
					{ _id },
					{ $set: { subject } }
				).exec();

				return;
			}
		}
	}

	for (const course of courses) {
		if (!course.subject) {
			await addSubjectToCourse(course)
		}
	}

	const coursesWithSubject = await CourseModel.find({ userId }).lean();

  return coursesWithSubject;
}