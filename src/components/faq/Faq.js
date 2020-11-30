import React from "react";

import classes from "./faq.module.scss";
import Question from "./question/Question";

const Faq = (props) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>The most common questions</h1>
      <Question question="Is page free to use?" answer="All page features are completly free to use, and it won't change in the future." />
      <Question
        question="Do I need to create and account?"
        answer="Yes, you need to create an account in order to be able to save data you sent to page."
      />
      <Question
        question="Is amount of data that I can send to page limited?"
        answer="No, there is no data trasfer limit. You can send as much data as you need."
      />
      <Question
        question="How to send data to page?"
        answer="To send data to page data base you need to add scan of test result in high quality in adding test result section. When process of reading data is over, results will be displayed on the screen for you to accept if evertyhing was analyzed correctly. If evertyhing is OK you can accept the result and it will be automaticly send to databse."
      />
      <Question
        question="Do i have an access to old scans that I have passed to page?"
        answer="Yes, you can see data both on charts and table, but also you have access to scans in patient/scan results section."
      />
      <p className={classes.footer}>For more answer contact us in contact section.</p>
    </div>
  );
};

export default Faq;
