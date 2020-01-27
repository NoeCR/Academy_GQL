import _ from 'lodash';
import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const mutation: IResolvers = {
    Mutation: {
        addCourse(__: void, { course } ): any {
            const itemCourse = {
                id: String(database.courses.length + 1),
                title: course.title,
                description: course.description,
                classes: course.classes,
                time: course.time,
                logo: course.logo,
                level: course.level,
                path: course.path,
                teacher: course.teacher,
                reviews: []
            };
            if( database.courses.filter( i  => i.title === itemCourse.title ).length === 0 ) {
                database.courses.push(itemCourse);
                return itemCourse;
            }
            return  {
                id: -1,
                title: "This title already exists",
                description: "",
                classes: 0,
                time: 0,
                logo: "",
                level: "ALL",
                path: "",
                teacher: "",
                reviews: []
            }
        },
        updateCourse(__: void, { course } ): any {
            const index = _.findIndex(database.courses, (c) => {
                return c.id === course.id;
            });
            
            if (index !== -1) {
                course.reviews = database.courses[index] ? database.courses[index].reviews : [];
                database.courses[index] =  course;
                return course;
            }
                
            return {
                id: -1,
                title: "Course not found",
                description: "",
                classes: 0,
                time: 0,
                logo: "",
                level: "ALL",
                path: "",
                teacher: "",
                reviews: []
            }
        },
        deleteCourse(__: void, { id } ): any {
            const removed = _.remove(database.courses, (c) => {
                return c.id === id;
            });

            if (removed[0] === undefined) {
                return {
                    id: -1,
                    title: "Course not found for remove",
                    description: "",
                    classes: 0,
                    time: 0,
                    logo: "",
                    level: "ALL",
                    path: "",
                    teacher: "",
                    reviews: []
                }
            }
                
            return removed[0];
        }
    }
}

export default mutation;