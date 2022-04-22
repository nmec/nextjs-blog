export default function DateFmt({ dateString }) {
  const d = new Date(dateString);

  const str = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(d);

  return <time dateTime={dateString}>{str}</time>
}
