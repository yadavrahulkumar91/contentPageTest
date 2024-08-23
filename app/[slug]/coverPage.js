// import React from 'react';
// import GetData from '../../components/GetData';

// const CoverPage = async ({ params }) => {
//     const url = '/api/books/' + params.slug + '?populate=Unit.Lesson.MCQ,Unit.Lesson.Question_answer';
//     const Book = await GetData(url);
//     const { id, attributes } = Book;

//     return (
//         <div>
//             <h1>{attributes.book_name}</h1>
//             {/* Other book information can be displayed here */}
//             {/* You can also include the book content if needed */}
//         </div>
//     );
// };

// export default CoverPage;
