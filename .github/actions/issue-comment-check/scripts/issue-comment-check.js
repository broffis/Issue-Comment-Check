module.exports = async ({ context, github }) => {
  const {
    payload: { comment, issue, repository },
  } = context;

  //   console.log({ comment, issue, repository });

  // comment.body for issue text
  // issue.number for issue_number
  // repository.name for repo
  // repository.owner.login for owner

  const {
    name,
    owner: { login },
  } = context.payload.repository;

  const { data: comments } = await github.rest.issues.listComments({
    owner: login,
    repo: name,
    issue_number: issue.number,
  });

  console.log({ comments });
};
