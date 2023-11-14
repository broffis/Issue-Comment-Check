module.exports = ({ context }) => {
  const {
    payload: { comment, issue },
  } = context;

  console.log({ comment, issue });
};
