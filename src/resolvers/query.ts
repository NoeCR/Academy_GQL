import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
    Query: {
        students(): any {
            return database.students
        },
        student(__: void, { id } ): any {
            const res = database.students.filter ( s => s.id === id )[0];
            return res || { id: '-1', name: 'Student not found', email: '', courses: [] };
        },
        courses(): any {
            return database.courses
        },
        course(__: void, { id } ): any {
            const res = database.courses.filter ( c => c.id === id )[0];
            return res || { 
                id: '-1',
                title: 'Course not found',
                description: '',
                classes: -1,
                time: 0.0,
                logo: '',
                level: 'ALL',
                path: '',
                teacher: '',
                reviews: []
            };
        }
    }
}


export default query;