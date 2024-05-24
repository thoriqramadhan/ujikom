export const formatRupiah = (number) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  });

  // Periksa apakah angka memiliki tempat desimal
  const memilikiDesimal = (number % 1) !== 0;

  if (memilikiDesimal) {
    // Gunakan pemformatan default untuk number dengan desimal
    return formatter.format(number);
  } else {
    // Hapus ".00" di belakang untuk bilangan bulat (tanpa desimal)
    const numberDiformat = formatter.format(number);
    return numberDiformat.slice(0, -3); // Hapus 3 karakter terakhir (".00")
  }
}