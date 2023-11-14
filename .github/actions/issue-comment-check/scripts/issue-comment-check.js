const QA_APPROVED_TEXT = "[QA Approved]";
const QA_APPROVED_LABEL = "qa-approved";
const QA_REACTS = ["eyes", "hooray", "heart"];

module.exports = async ({ context, github }) => {
  const {
    payload: { issue, repository },
  } = context;

  const {
    name,
    owner: { login },
  } = repository;

  const { data: comments } = await github.rest.issues.listComments({
    owner: login,
    repo: name,
    issue_number: issue.number,
  });

  const { isApproved, comment_id } = hasQaComment(comments);

  console.log({ isApproved, comment_id });

  if (isApproved) {
    github.rest.issues.addLabels({
      owner: login,
      repo: name,
      issue_number: issue.number,
      labels: [QA_APPROVED_LABEL],
    });

    QA_REACTS.forEach((emoji) => {
      github.rest.reactions.createForIssueComment({
        owner: login,
        repo: name,
        comment_id,
        content: emoji,
      });
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
  const [commentApproved] = comments.filter((comment) =>
    comment.body.includes(QA_APPROVED_TEXT)
  );

  console.log({ commentApproved });

  return {
    isApproved: comments.some((comment) =>
      comment.body.includes(QA_APPROVED_TEXT)
    ),
    comment_id: commentApproved?.id,
  };
};
