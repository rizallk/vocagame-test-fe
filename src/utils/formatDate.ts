// Format date ISO menjadi "mm dd, yyyy • hh:mm"
export const formatISODate = (isoString: string): string => {
  const date = new Date(isoString);

  // Validasi jika string yang dimasukkan bukan tanggal yang valid
  if (isNaN(date.getTime())) {
    return '-';
  }

  // Format tanggal: "Oct 26, 2023"
  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'short', // 'Oct'
    day: 'numeric', // '26'
    year: 'numeric', // '2023'
  }).format(date);

  // Format waktu: "14:22"
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timePart = `${hours}:${minutes}`;

  return `${datePart} • ${timePart}`;
};
