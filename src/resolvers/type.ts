import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';
import _ from 'lodash';

const type: IResolvers = {
    Student: {
        courses: parent => {
            const coursesList: Array<any> = [];
            parent.courses.map( (c: string) => {
                coursesList.push( _.filter(database.courses, [ 'id', c])[0]);
            });
            return coursesList;
        }
    },
    Course: {
        students: parent => {
            const studentsList: Array<any> = [];
            const courseId = parent.id;
            // database.students.map( (s: any) => {
            //     if ( s.courses.filter( (id: any) => id === courseId) > 0 ) {
            //         studentsList.push(s); 
            //     }
            // });
            database.students.map( (s: any) => {
                if ( s.courses.includes( courseId ) )
                    studentsList.push(s); 
                
            });
            return studentsList;
        },
        path: parent => `http://www.udemy.com${parent.path}`
    }
}


export default type;