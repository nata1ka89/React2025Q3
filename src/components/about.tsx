import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <p>
        This application was created to demonstrate working with React, React
        Router, React Hooks, and APIs as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React course
        </a>
        . The author of the application is{' '}
        <a
          href="https://github.com/nata1ka89/React2025Q3/pulls"
          target="_blank"
          rel="noreferrer"
        >
          Natallia Katsuba
        </a>{' '}
        . Here, you can search for сharacters within the Star Wars universe and
        view detailed information about them.
      </p>
    </div>
  );
};

export default About;
