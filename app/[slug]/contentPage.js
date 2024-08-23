import React from 'react';

const ContentPage = ({ units }) => {
    return (
        <div>
            <h1>Table of Contents</h1>
            {units.map((unit, index) => (
                <div key={index}>
                    <h2>{unit.Unit_name}</h2>
                    <ul>
                        {unit.Lesson.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} >
                                <a href={`#lesson-${lesson.id}`}>{lesson.Lesson_name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ContentPage;
