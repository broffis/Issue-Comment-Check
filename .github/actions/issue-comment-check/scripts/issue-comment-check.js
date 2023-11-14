module.exports = ({ context }) => {
  const {
    payload: { comment, issue, repository },
  } = context;

  console.log({ comment, issue, repository });

  // comment.body for issue text
  // issue.number for issue_number
  //
};
