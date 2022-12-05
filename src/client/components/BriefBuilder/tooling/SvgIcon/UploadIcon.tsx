export default function ({ classList = "" }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={classList}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path>
    </svg>
  );
}
