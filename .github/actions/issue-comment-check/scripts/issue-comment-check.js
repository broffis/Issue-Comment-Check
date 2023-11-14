const QA_APPROVED_TEXT = "[QA Approved]";
const QA_APPROVED_LABEL = "qa-approved";

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

  const isApproved = hasQaComment(comments);

  console.log({ isApproved });

  if (isApproved) {
    github.rest.issues.addLabels({
      owner: login,
      repo: name,
      issue_number: issue.number,
      labels: [QA_APPROVED_LABEL],
    });
  } else {
    github.rest.issues.removeLabel({
      owner: login,
      repo: name,
      issue_number: issue.number,
      name: QA_APPROVED_LABEL,
    });
  }
};

const hasQaComment = (comments) => {
  return comments.some((comment) => comment.body.includes(QA_APPROVED_TEXT));
};
