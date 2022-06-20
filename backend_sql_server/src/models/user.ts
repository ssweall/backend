// import { IBasicUser } from '../interfaces/IUser';

// export const create = (user: IBasicUser) => {
//   const queryString =
//     'INTER INTO User (name, email, role, password, address) VALUES (@name, @email, @role, @password, @address)';
//   db.query(
//     queryString,
//     user,
//     //Todo update types
//     (err: any, result: { insertId: any }, fields: any) => {
//       if (err) {
//         console.log(err);
//       }
//       const insertId = result.insertId;
//       console.log(insertId);
//     }
//   );
// };
