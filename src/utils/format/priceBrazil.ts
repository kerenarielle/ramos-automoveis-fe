const format = (value: number | string) => {
  let val = value;
  if (typeof value === 'string') {
    val = parseInt(value)
  }

  return val.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

export default format;